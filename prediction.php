<?php
include "config.php";
?>

<?php
$dataPred = array();
$data = json_decode(($_POST['pred']));
for ($i = 0; $i < count($data); $i++) {
    if (count($data[$i]) !== 1) {
        foreach ($data[$i] as $j) {
            array_push($dataPred, $j);
        }
    } else if (count($data[$i]) === 1) {
        array_push($dataPred, $data[$i][0]);
    }
}

function check_array($arr)
{
    if (count($arr[0]) !== 1 && count($arr[1]) === 1) {
        foreach ($arr[0] as $first) {
            if ($first[0] === $arr[1][0][0]) {
                return true;
            }
        }
    } else if (count($arr[1]) !== 1 && count($arr[0]) === 1) {
        foreach ($arr[1] as $second) {
            if ($second[0] === $arr[0][0][0]) {
                return true;
            }
        }
    } else if (count($arr[1]) === 1 && count($arr[0]) === 1) {
        if ($arr[1][0][0] === $arr[0][0][0]) {
            return true;
        }
    } else if (count($arr[1]) !== 1 && count($arr[0]) !== 1) {
        foreach ($arr[0] as $first) {
            foreach ($arr[1] as $second) {
                if ($first[0] === $second[0]) {
                    return true;
                }
            }
        }
    }
    return false;
}

$bool = check_array($data);

$lastCulture = intval(substr($dataPred[count($dataPred) - 1], 0, 1));

$query = "SELECT idCulture, nameOfCulture, nextCulture FROM nextculture WHERE substring(idCulture,1,1) = $lastCulture";
$result = mysqli_query($connection, $query);
$nextCulture = array();

while ($post = mysqli_fetch_array($result)) {
    $changeArray = $post['nextCulture'];
    $nameCulture = $post['nameOfCulture'];
}

$newObj = explode(';', $changeArray);

$newGetArray = array();
if ($bool) {
    foreach ($newObj as $next) {
        if ($next !== $nameCulture) {
            array_push($newGetArray, $next);
        }
    }
    echo json_encode($newGetArray);
} else {
    $rename = $nameCulture;
    if ($nameCulture === 'Пар') {
        echo json_encode("Можно сажать любую культуру, так как в прошлом году был $rename");
    } else if ($nameCulture === 'Бобовые') {
        echo json_encode("Можно сажать любую культуру, так как в прошлом году было посажено, $rename культуры");
    } else if ($nameCulture === 'Питомник') {
        echo json_encode("Можно использовать любую культуру в качестве, $rename а");
    } else {
        echo json_encode($newObj);
    }
}

exit();