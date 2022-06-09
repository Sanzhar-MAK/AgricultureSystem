<?php
include "config.php";

$totalInfo = $_POST['sentObj'];
$sentId = intval($totalInfo);

$sql = "UPDATE newmapsinfo SET numberOfFields = '', squares = 0, coordinates = '" . 0 . "', uniqueId = ''  WHERE id =  $sentId";

if (mysqli_query($connection, $sql)) {
    echo json_encode("Record updated successfully");
} else {
    echo json_encode("Error updating record: " . mysqli_error($connection));
}

// [[70.59402465820497, 51.5070329672177], [70.60638427734543, 51.51686166793954], [70.58715820312696, 51.530532854581054], [70.58097839355673, 51.52583384712187], [70.57136535644747, 51.52412499689265], [70.56724548340068, 51.521134354674416], [70.56587219238509, 51.51728895465084], [70.58303833008011, 51.50617819737269], [70.59402465820497, 51.5070329672177]]