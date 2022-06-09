<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$connection = mysqli_connect("localhost", "agro", "sanzhar45924", "agro") or die("Ошибка " . mysqli_error($connection));

if (isset($_POST['id'])) {
    $getName = trim($_POST['id']);
    $getName = htmlspecialchars($getName);
    $getName = mysqli_real_escape_string($connection, $getName);
    $query = "SELECT idCulture, nameOfCulture, descriptionRotate, photoOfCulture FROM rotateInfo WHERE idCulture = $getName";
    $result = mysqli_query($connection, $query);
}


while ($row = mysqli_fetch_array($result)) {
    $infoObject = [
        "name" => $row['nameOfCulture'],
        "description" => $row['descriptionRotate'],
        "photo" => $row['photoOfCulture']
    ];
}

echo json_encode($infoObject);

exit();