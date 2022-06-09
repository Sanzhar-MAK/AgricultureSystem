<?php
include "config.php";
$query = "SELECT *FROM localmoment";
$result = mysqli_query($connection, $query);
?>

<?php
$dataLocal = array();

while ($get = mysqli_fetch_array($result)) {
    $nameOfField = $get['nameOfField'];
    $squareOfField = $get['squareOfField'];
    $cadastral = $get['cadastral'];
    $dots = $get['dots'];
    $idFind = $get['idFind'];
}

$info = [
    "nameOfField" => $nameOfField,
    "squareOfField" => $squareOfField,
    "cadastral" => $cadastral,
    "dots" => $dots,
    "idFind" => $idFind
];

array_push($dataLocal, $info);
echo json_encode($dataLocal);

exit();