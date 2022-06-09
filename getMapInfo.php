<?php
include "config.php";
$query = "SELECT *FROM mapsinfo";
$result = mysqli_query($connection, $query);
?>

<?php
$dataMap = array();

while ($post = mysqli_fetch_object($result)) {
    array_push($dataMap, $post);
}

echo json_encode($dataMap);

exit();