<?php
include "config.php";

$dataField = json_decode($_POST['sentObj']);

$numberOfFields = $dataField->{"number"};
$squareOfFields = intval($dataField->{"square"});
$uniqeId = "fieldnumber" . $numberOfFields;
$cadastralNumber = $dataField->{"cadastral"};
$sentId = $dataField->{"id"};

$coord = json_encode($dataField->{"coord"});
$sentCoord = json_encode($coord);


$sql = "UPDATE newmapsinfo SET numberOfFields = '" . $numberOfFields . "', squares = '" . $squareOfFields . "', coordinates = $sentCoord, uniqueId = '" . $uniqeId . "'  WHERE id =  $sentId";

if (mysqli_query($connection, $sql)) {
    echo json_encode("Record updated successfully");
} else {
    echo json_encode("Error updating record: " . mysqli_error($connection));
}