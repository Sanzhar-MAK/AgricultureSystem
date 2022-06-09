<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$connection = mysqli_connect("localhost", "agro", "sanzhar45924", "agro") or die("Ошибка " . mysqli_error($connection));

try {
    if (isset($_POST['field'])) {
        $getName = trim($_POST['field']);
        $getName = htmlspecialchars($getName);
        $getName = mysqli_real_escape_string($connection, $getName);
        $query = "SELECT *FROM `$getName`";
        $result = mysqli_query($connection, $query) or die("Ошибка " . mysqli_error($connection));
        $queryTitle = "SELECT *FROM `$getName` LIMIT 1";
        $resultInfo = mysqli_query($connection, $queryTitle) or die("Ошибка " . mysqli_error($connection));
    }

?>
<?php

    $infoTitle = array();
    if (mysqli_num_rows($resultInfo) == 1) {
        if ($rows = mysqli_fetch_assoc($resultInfo)) {
            $title = $rows['nameOfField'];
            $squareField = $rows['squareOfField'];
            $infoTitle = [
                "title" => $title,
                "squareField" => $squareField
            ];
        }
    }
    $arr = array();
    while ($row = mysqli_fetch_assoc($result)) : ?>
<?php
        $sorts = array();
        $culture = array();
        $squareCulture = array();
        $sortsId = array();
        $notUsedSquare;
        $year;
        $par;
        $parSquare;
        $sort = explode(';', $row['nameOfSortandSquare']);
        $sortId = explode(';', $row['idSorts']);
        $sowns = explode('-', $row['notSownPartSquare']);
        $total = 0;

        if ($row['nameOfSortandSquare']) {
            foreach ($sort as &$elem) {
                $element = explode('-', $elem);
                $total += intval($element[1]);
                if (count($sort) !== 1) {
                    array_push($sorts, $element[0]);
                    array_push($squareCulture, intval($element[1]));
                    $notUsedSquare = [intval($squareField) - $total];
                    if ($notUsedSquare[0] === 0) {
                        $notUsedSquare = '-';
                    }
                } else {
                    if ($element[1]) {
                        array_push($sorts, $element[0]);
                        array_push($squareCulture, intval($element[1]));
                        $notUsedSquare = [intval($squareField) - $total];
                        if ($notUsedSquare[0] === 0) {
                            $notUsedSquare = '-';
                        }
                    } else {
                        array_push($sorts, $element[0]);
                        array_push($squareCulture, intval($squareField));
                        $notUsedSquare = '-';
                    }
                }
            }
        } else {
            array_push($sorts, '-');
            array_push($squareCulture, '-');
            $notUsedSquare = [intval($squareField) - $total];
        }

        if ($row['notSownPartSquare']) {
            $par = [$sowns[0]];
            if ($sowns[1]) {
                $parSquare = [intval($sowns[1])];
            } else {
                $parSquare = [intval($squareField) - $total];
            }
            $notUsedSquare = [intval($squareField) - $total - $parSquare[0]];
            if ($notUsedSquare[0] === 0) {
                $notUsedSquare = '-';
            }
        } else {
            $par = '-';
            $parSquare = '-';
        }

        foreach ($sortId as $id) {
            array_push($sortsId, $id);
        }
        $year = [$row['year']];
        foreach ($sortsId as $id) {
            if ($id) {
                $getCuture = "SELECT idSort,culture FROM `cultureandsort` WHERE idSort = '" . $id . "'";
                $coincidence = mysqli_query($connection, $getCuture);
                while ($getId = mysqli_fetch_assoc($coincidence)) {
                    array_push($culture, $getId['culture']);
                }
            } else {
                array_push($culture, '-');
            }
        }

        $info = [
            "sort" => $sorts,
            "culture" => $culture,
            "year" => $year,
            "squareCulture" => $squareCulture,
            "par" => $par,
            "squarePar" => $parSquare,
            "index" => $sortsId,
            "notUsedGround" => $notUsedSquare
        ];
        array_push($arr, $info);
?>
<?php endwhile; ?>

<?php
    array_push($arr, $infoTitle);
    echo json_encode($arr);
} catch (Exception $e) {
    echo json_encode(($e->getMessage()));
}
?>