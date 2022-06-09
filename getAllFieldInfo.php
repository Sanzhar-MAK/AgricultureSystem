<?php
include "config.php";

$getName = $_POST['sentObj'];
$sentName = "fieldNumber" . $getName;

$query = "SELECT *FROM `$getName`";
$result = mysqli_query($connection, $query);
?>

<?php
while ($post = mysqli_fetch_array($result)) {
    $nameOfField = $post["nameOfField"];
}
echo json_encode($nameOfField);
exit();