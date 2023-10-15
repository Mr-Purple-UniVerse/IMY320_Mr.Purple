<?php
session_start();
$name = $_SESSION['name'];
$surname = $_SESSION['surname'];
$fullName = $name . ' ' . $surname;

echo $fullName;
?>