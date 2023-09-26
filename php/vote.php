<?php
session_start();
$currentUser = $_SESSION['name'] . ' ' . $_SESSION['surname'];

$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData["questionId"]) && isset($requestData["voteType"])) {
    $voteAdded = false;
    $questionId = $requestData["questionId"];
    $voteType = $requestData["voteType"];

    $mysqli = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    // Check if the user has already upvoted or downvoted the question
    $query = "SELECT upvotedUsers, downvotedUsers, upvotes, downvotes FROM Questions WHERE id = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $questionId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        if ($row['upvotedUsers'] !== null) {
            $upvotedUsers = json_decode($row['upvotedUsers']);
        } else {
            $upvotedUsers = [];
        }
        
        if ($row['downvotedUsers'] !== null) {
            $downvotedUsers = json_decode($row['downvotedUsers']);
        } else {
            $downvotedUsers = [];
        }

        $upvotes = (int)$row['upvotes'];
        $downvotes = (int)$row['downvotes'];

        // Remove the user from the opposite vote list if necessary
        if ($voteType === 'upvote') {
            if ($downvotedUsers && in_array($currentUser, $downvotedUsers)) {
                $downvotedUsers = array_diff($downvotedUsers, [$currentUser]);
                $downvotes--;
            }
            
            if (!in_array($currentUser, $upvotedUsers)) {
                $upvotedUsers[] = $currentUser;
                $voteAdded = true;
                $upvotes++;
            }
        } elseif ($voteType === 'downvote') {
            if ($upvotedUsers && in_array($currentUser, $upvotedUsers)) {
                $upvotedUsers = array_diff($upvotedUsers, [$currentUser]);
                $upvotes--;
            }
            
            if (!in_array($currentUser, $downvotedUsers)) {
                $downvotedUsers[] = $currentUser;
                $voteAdded = true;
                $downvotes++;
            }
        }
        else if($voteType === 'removeVote'){
             // Check if the user is in either upvotedUsers or downvotedUsers and remove them
             if (in_array($currentUser, $upvotedUsers)) {
                $upvotedUsers = array_diff($upvotedUsers, [$currentUser]);
                $upvotes--;
            }
            if (in_array($currentUser, $downvotedUsers)) {
                $downvotedUsers = array_diff($downvotedUsers, [$currentUser]);
                $downvotes--;
            }
        }

        $updateQuery = "UPDATE Questions SET upvotedUsers = ?, downvotedUsers = ?, upvotes = ?, downvotes = ? WHERE id = ?";
        $updateStmt = $mysqli->prepare($updateQuery);
        
        // Assign JSON-encoded values to variables
        $upvotedUsersJson = json_encode($upvotedUsers);
        $downvotedUsersJson = json_encode($downvotedUsers);
        
        // Bind the variables to the prepared statement
        $updateStmt->bind_param("ssiis", $upvotedUsersJson, $downvotedUsersJson, $upvotes, $downvotes, $questionId);
        $updateStmt->execute();

        // Return the updated vote counts
        $response = [
            'upvotes' => $upvotes,
            'downvotes' => $downvotes
        ];

        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'Question not found']);
    }

    // Close the database connection
    $stmt->close();
    $mysqli->close();
}
?>
