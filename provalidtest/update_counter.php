<?php

// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "valid_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получение данных из POST-запроса
$title = $_POST['title'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

// SQL-запрос для вставки данных в таблицу лидов
$sql = "INSERT INTO leads (title, name, phone, email) VALUES ('$title', '$name', '$phone', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Данные успешно добавлены в базу данных";
} else {
    echo "Ошибка при добавлении данных: " . $conn->error;
}

// SQL-запрос для получения количества записей в таблице лидов
$sql = "SELECT COUNT(*) AS count FROM leads";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row["count"]; // Возвращаем количество записей
} else {
    echo "0";
}

// Закрытие соединения с базой данных
$conn->close();

?>