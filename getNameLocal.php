<?php
include "config.php";
$query = "SELECT *FROM localmoment";
$result = mysqli_query($connection, $query);
?>

<?php
while ($post = mysqli_fetch_array($result)) {
    $nameOfField = $post["nameOfField"];
}
echo json_encode($nameOfField);
exit();