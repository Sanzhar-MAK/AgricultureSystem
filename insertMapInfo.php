<?php
include "config.php";

$queryLast = "SELECT *FROM newmapsinfo WHERE id=(SELECT max(id) FROM newmapsinfo);";
$result = mysqli_query($connection, $queryLast);
while ($lastRow = mysqli_fetch_assoc($result)) {
    $lastId = $lastRow['id'];
}

$dataField = json_decode($_POST['fieldInfo']);
$newId = $lastId + 1;
$numberOfFields = $dataField->{"number"};
$squareOfFields = intval($dataField->{"square"});
$idFill = "idFill" . strval($newId);
$idOutline = "idOutline" . strval($newId);
$uniqeId = "fieldnumber" . $numberOfFields;
$cadastralNumber = $dataField->{"cadastral"};

$coord = json_encode($dataField->{"coord"});
$sentCoord = json_encode($coord);

$query = "INSERT INTO newmapsinfo VALUES ('" . $newId . "','" . $numberOfFields . "',111,'Пар','" . $squareOfFields . "','#ffffff',0.5,'#555555',2.5,$sentCoord,'" . $idFill . "','" . $idOutline . "','" . $uniqeId . "','" . $cadastralNumber . "')";

if (mysqli_query($connection, $query) && $dataField !== '') {
    echo json_encode("Запись сохранена");
} else {
    echo "Ошибка: " . $query . "<br>" . mysqli_error($connection);
}