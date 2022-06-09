<?php
include "config.php";


$sorts = trim($_POST['sorts']);
$sorts = htmlspecialchars($sorts);
$query = "SELECT * FROM cultureandsort WHERE culture = '$sorts'";
$result = mysqli_query($connection, $query) or die("Ошибка " . mysqli_error($connection));

$sortArray = array();

while ($row = mysqli_fetch_assoc($result)) {
    $sortInfo = [
        "nameSort" => $row['sort'],
        "sortIndex" => $row['idSort']
    ];
    array_push($sortArray, $sortInfo);
}

echo json_encode($sortArray);