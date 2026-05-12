<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$action = $_GET['action'] ?? '';

if ($action == "questions") {

    $stmt = $conn->query("SELECT * FROM questions ORDER BY RAND() LIMIT 10");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // remove resposta correta
    foreach ($data as &$q) {
        unset($q['correct_answer']);
    }

    echo json_encode($data);
}

if ($action == "submit") {

    $input = json_decode(file_get_contents("php://input"), true);
    $answers = $input['answers'];

    $correct = 0;
    $wrong = 0;

    foreach ($answers as $id => $selected) {
        $stmt = $conn->prepare("SELECT correct_answer FROM questions WHERE id=?");
        $stmt->execute([$id]);
        $right = $stmt->fetchColumn();

        if ($right == $selected) {
            $correct++;
        } else {
            $wrong++;
        }
    }

    echo json_encode([
        "correct" => $correct,
        "wrong" => $wrong
    ]);
}