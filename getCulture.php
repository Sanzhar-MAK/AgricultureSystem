<?php
include "config.php";

$query = "SELECT *FROM cultureandsort";
$result = mysqli_query($connection, $query);
$cultureArray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $culture = $row['culture'];
    array_push($cultureArray, $culture);
}

$cultureArray = array_unique($cultureArray);

echo json_encode($cultureArray);