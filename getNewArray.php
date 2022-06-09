<?php
include "config.php";
$query = "SELECT *FROM newmapsinfo";
$result = mysqli_query($connection, $query);
?>

<?php
$dataMap = array();

while ($post = mysqli_fetch_array($result)) {
    $id = $post['id'];
    $lastColor = "UPDATE newmapsinfo SET fillColor = '#ffffff' WHERE id = $id";
    if (mysqli_query($connection, $lastColor)) {
        continue;
    } else {
        echo "ERROR: Could not able to execute $lastColor. " . mysqli_error($connection), '<br>';
    }
}

$query = "SELECT *FROM newmapsinfo";
$result = mysqli_query($connection, $query);
while ($post = mysqli_fetch_object($result)) {
    array_push($dataMap, $post);
}
echo json_encode($dataMap);
exit();