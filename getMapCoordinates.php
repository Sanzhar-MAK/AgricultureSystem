<?php
include "config.php";
$query = "SELECT *FROM dotcoordinates";
$result = mysqli_query($connection, $query);
?>

<?php
$data = array();
while ($post = mysqli_fetch_object($result)) {
    array_push($data, $post);
}
echo json_encode($data);
exit();