<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$connection = mysqli_connect("localhost", "agro", "sanzhar45924", "agro") or die("Ошибка " . mysqli_error($connection));

if (isset($_POST['info'])) {
    $getName = trim($_POST['info']);
    $getName = htmlspecialchars($getName);
    $getName = mysqli_real_escape_string($connection, $getName);
    $query = "SELECT id, numberOfFields, ndvi, culture, squares, cadastralNumber FROM newmapsinfo WHERE id = $getName";
    $result = mysqli_query($connection, $query);
}

?>

<?php
$dataMap = array();
$number;
$ndvi;
$culture;
$squares;
$cadastral;
$id;

while ($post = mysqli_fetch_assoc($result)) {
    $number = $post['numberOfFields'];
    $ndvi = $post['ndvi'];
    $culture = $post['culture'];
    $squares = $post['squares'];
    $cadastral = $post['cadastralNumber'];
    $id = $post['id'];
}

$info = [
    "numberOfFields" => $number,
    "ndvi" => $ndvi,
    "culture" => $culture,
    "squares" => $squares,
    "cadNumber" => $cadastral,
    "id" => $id
];

array_push($dataMap, $info);
echo json_encode($dataMap);

exit();