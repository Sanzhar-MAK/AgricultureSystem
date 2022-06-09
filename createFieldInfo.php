<?php
include "config.php";

$data = $_POST['fieldInfoAbout'];
$fieldName = $data[count($data) - 1]['numberOfField'];
$sentName = 'fieldnumber' . $fieldName;


$sql = "CREATE TABLE $sentName 
    (`id` INT NOT NULL AUTO_INCREMENT , 
    `nameOfField` TEXT NOT NULL, 
    `squareOfField` TEXT NOT NULL, 
    `nameOfSortandSquare` TEXT NOT NULL, 
    `notSownPartSquare` TEXT NOT NULL, 
    `year` TEXT NOT NULL, 
    `idSorts` TEXT NOT NULL, 
    PRIMARY KEY (`id`)) ENGINE = InnoDB";

if (mysqli_query($connection, $sql)) {
    $array = array();
    for ($i = 0; $i < count($data) - 1; $i++) {
        $nameOfField = $data[$i]['nameOfField'];
        $squareOfField = $data[$i]['squareOfField'];
        $nameOfSortandSquare = $data[$i]['nameOfSortandSquare'];
        $notSownPartSquare = $data[$i]['notSownPartSquare'];
        $year = $data[$i]['year'];
        $idSorts = $data[$i]['idSorts'];

        $queryCreate = "INSERT INTO $sentName (`id`, `nameOfField`, `squareOfField`, `nameOfSortandSquare`, `notSownPartSquare`, `year`, `idSorts`) 
        VALUES (NULL,'" . $nameOfField . "', 
        '" . $squareOfField . "',
        '" . $nameOfSortandSquare . "', 
        '" . $notSownPartSquare . "',
        '" . $year . "', 
        '" . $idSorts . "')";
        if (mysqli_query($connection, $queryCreate)) {
            continue;
        } else {
            echo json_encode("Error creating table: " . mysqli_error($connection));
        }
    }
    echo json_encode("Successfully create new table");
} else {
    echo json_encode("Error creating table: " . mysqli_error($connection));
}