<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $comment = $_POST["comment"];
    $questionId = $_POST["questionId"];
    $userName = $_SESSION["name"] . " " . $_SESSION["surname"]; // Concatenate name and surname

    $mysqli = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $query = "INSERT INTO Comments (questionId, description, name) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("iss", $questionId, $comment, $userName);

    $incrementQuery = "UPDATE Questions SET totalComments = totalComments + 1 WHERE id = ?";
    $incrementStmt = $mysqli->prepare($incrementQuery);
    $incrementStmt->bind_param("i", $questionId);
    $incrementStmt->execute();
    
    if ($stmt->execute()) {
        $stmt->close();
        
        $newCommentId = $mysqli->insert_id;
        $selectQuery = "SELECT * FROM Comments WHERE id = ?";
        $selectStmt = $mysqli->prepare($selectQuery);
        $selectStmt->bind_param("i", $newCommentId);
        $selectStmt->execute();
        $result = $selectStmt->get_result();
        $commentData = $result->fetch_assoc();
        $selectStmt->close();
        
        $mysqli->close();
        
        echo json_encode($commentData);
    } else {
        $stmt->close();
        $mysqli->close();

        echo json_encode(["error" => "Failed to insert comment"]);
    }
} else {

    echo json_encode(["error" => "Invalid request"]);
}
?>
