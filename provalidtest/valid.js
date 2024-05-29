document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const ageInput = document.getElementById('age');
    const counterSpan = document.getElementById('counter');

    let submissionCount = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        if (validateFullName(fullNameInput.value) && validatePhone(phoneInput.value) && validateAge(ageInput.value)) {
            submissionCount++;
            counterSpan.textContent = submissionCount;
            // Здесь можно добавить код для отправки данных на сервер
        }
    });

    function validateFullName(name) {
        // Проверка ФИО: Допускаются только буквы и пробелы
        const nameRegex = /^[a-zA-Zа-яА-Я\s]+$/;
        return nameRegex.test(name);
    }

    function validatePhone(phone) {
        // Проверка телефона: Должен быть в формате +7 (XXX) XXX-XX-XX или 8 (XXX) XXX-XX-XX
        const phoneRegex = /^(\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    }

    function validateAge(age) {
        // Проверка возраста: Должен быть числом от 18 до 120
        const ageValue = parseInt(age, 10);
        return !isNaN(ageValue) && ageValue >= 18 && ageValue <= 120;
    }
});

// Данные формы
const formData = {
    title: 'Новый лид', // Заголовок лида
    name: 'Имя пользователя', // Имя пользователя из формы
    phone: '+7 (123) 456-7890', // Номер телефона из формы
    email: 'example@example.com' // Адрес электронной почты из формы
};

// Авторизация и получение токена доступа
fetch('https://b24-ubtplj.bitrix24.by/oauth/token/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        grant_type: 'password',
        client_id: '5570919',
        client_secret: 'YOUR_CLIENT_SECRET',
        username: 'slav27.lebedko@mail.ru',
        password: 'Muhtar1325'
    })
})
.then(response => response.json())
.then(data => {
    const accessToken = data.access_token;

    // Создание лида
    fetch('https://b24-ubtplj.bitrix24.by/rest/crm.lead.add.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer ${accessToken}
        },
        body: JSON.stringify({
            fields: {
                TITLE: formData.title,
                NAME: formData.name,
                PHONE: [{ VALUE: formData.phone, VALUE_TYPE: 'WORK' }],
                EMAIL: [{ VALUE: formData.email, VALUE_TYPE: 'WORK' }]
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Лид успешно создан:', data);
    })
    .catch(error => {
        console.error('Ошибка при создании лида:', error);
    });
})
.catch(error => {
    console.error('Ошибка при авторизации:', error);
});

// Функция для отправки AJAX-запроса на сервер
function updateCounter() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'update_counter.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Обновление значения счетчика на странице
            document.getElementById('counter').innerText = xhr.responseText;
        }
    };

    xhr.send();
}

// Периодический вызов функции updateCounter каждые 5 секунд
setInterval(updateCounter, 5000);