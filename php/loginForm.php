<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT id, name, surname, profilePhoto FROM Users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Return user ID via HTTP POST
        $response = [
            'id' => $row['id'],
            'name' => $row['name'],
            'surname' => $row['surname'],
            'profilePhoto' => $row['profilePhoto']
        ];
        session_start();
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $row['name'];
        $_SESSION['surname'] = $row['surname'];
        $_SESSION['profilePhoto'] = $row['profilePhoto'];

        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Invalid email or password
        header('Content-Type: application/json');
        echo json_encode(['error' => 'invalid']);
    }

    $conn->close();
}
?>
