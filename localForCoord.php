<?php
include "config.php";

$deleteQuery = "DELETE FROM localmoment WHERE id = 1";

if (mysqli_query($connection, $deleteQuery)) {
    $data = json_decode($_POST['sentInfo']);
    $numberOfFields = $data->{"nameField"};
    $squareOfField = intval($data->{"square"});
    $cadastral = $data->{"cadastral"};
    $idFind = $data->{"id"};
    $coord = json_encode($data->{"dots"});
    $sentCoord = json_encode($coord);

    $query = "INSERT INTO `localmoment` (`id`, `nameOfField`, `squareOfField`, `cadastral`, `dots`, `idFind`) 
            VALUES (1, '" . $numberOfFields . "', 
            '" . $squareOfField . "', 
            '" . $cadastral . "', 
            $sentCoord,
            '" . $idFind . "')";

    if (mysqli_query($connection, $query)) {
        echo json_encode("Запись сохранена");
    } else {
        echo json_encode("Ошибка: " . $query . "<br>" . mysqli_error($connection));
    }
} else {
    echo json_encode("Ошибка: " . $deleteQuery . "<br>" . mysqli_error($connection));
}