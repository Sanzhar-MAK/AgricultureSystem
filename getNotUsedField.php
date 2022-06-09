<?php
include "config.php";
$query = "SELECT *FROM newmapsinfo";
$result = mysqli_query($connection, $query);
?>

<?php

while ($post = mysqli_fetch_array($result)) {
    $getValue = $post['uniqueId'];
    $id = $post['id'];
    // $res = mysqli_query($connection,"SELECT table_name FROM information_schema.tables WHERE table_schema = 'agro' AND table_name = '$getValue'");
    $newQuery = "SELECT 1 FROM `$getValue` LIMIT 1";
    $newResult = mysqli_query($connection, $newQuery);
    if ($newResult !== FALSE) {
        $newColor = "UPDATE newmapsinfo SET fillColor = '#44ff00' WHERE id = $id";
        if (mysqli_query($connection, $newColor)) {
            // echo $getValue, $post['fillColor'];
        } else {
            echo "ERROR: Could not able to execute $newColor. " . mysqli_error($connection), '<br>';
        }
    } else {
        $newColor = "UPDATE newmapsinfo SET fillColor = '#ffffff' WHERE id = $id";
        if (mysqli_query($connection, $newColor)) {
            // echo $getValue, $post['fillColor'];
        } else {
            echo "ERROR: Could not able to execute $newColor. " . mysqli_error($connection), '<br>';
        }
    }
}

$dataMap = array();

$queryLast = "SELECT *FROM newmapsinfo";
$resultLast = mysqli_query($connection, $queryLast);

while ($post = mysqli_fetch_object($resultLast)) {
    array_push($dataMap, $post);
}

echo json_encode($dataMap);
exit();