<?php
if (isset($_GET['cardId'])) {
    $cardId = $_GET['cardId'];
    
    $mysqli = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $threadQuery = "SELECT * FROM Questions WHERE id = $cardId";
    $threadResult = $mysqli->query($threadQuery);

    $commentsQuery = "SELECT * FROM Comments WHERE questionId = $cardId";
    $commentsResult = $mysqli->query($commentsQuery);

    $data = array(
        'threadInfo' => array(),
        'comments' => array(),
    );

    if ($threadResult) {
        while ($row = $threadResult->fetch_assoc()) {
            $data['threadInfo'][] = $row;
        }
    }

    if ($commentsResult) {
        while ($row = $commentsResult->fetch_assoc()) {
            $data['comments'][] = $row;
        }
    }

    $mysqli->close();

    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "Card ID not provided.";
}
?>
