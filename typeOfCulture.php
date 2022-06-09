<?php
include "config.php";
$query = "SELECT *FROM fieldnumber053/2";
$queryTitle = "SELECT *FROM fieldnumber9 LIMIT 1";
$result = mysqli_query($connection, $query);
$resultInfo = mysqli_query($connection, $queryTitle);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/icon.png">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="js/modal.js" defer></script>
    <script src="js/changeTitle.js" defer></script>
    <title>Организация угодий и севооборотов</title>
</head>

<body>
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <img src="images/logo.svg" alt="Image:Crop" class="logo-image">
                    <a href="/" class="logo-link">СУИС<span>.</span></a>
                </div>

                <div class="nav">
                    <ul class="nav-items">
                        <li class="nav-item">
                            <a href="aboutSystem.php" class="nav-link">Про систему</a>
                        </li>
                        <li class="nav-item">
                            <a href="grounds.php" class="nav-link">Угодья</a>
                        </li>
                        <li class="nav-item">
                            <a href="rotate.php" class="nav-link">Севооборот</a>
                        </li>
                        <li class="nav-item">
                            <a href="typeOfCulture.php" class="nav-link">Виды культур и сортов</a>
                        </li>
                        <li class="nav-item">
                            <a href="too.php" class="nav-link">ТОО Родина</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Контакты</a>
                        </li>
                    </ul>
                </div>
                <div class="user">
                    <button class="registration-button"><span>Регистрация</span></button>
                    <button class="sign-in-button"><span>Вход</span></button>
                </div>
            </nav>
        </div>
    </header>

    <main class="main">
        <div class="description">
            <div class="container">
                <style>
                table {
                    border: 2px solid black;
                    color: #fff;
                }
                </style>

                <?php
                $sorts = array();
                $culture = array();
                $squareCulture = array();
                $years = array();
                $par = array();
                $parSquare = array();
                $sortsId = array();
                $notUsedSquare = array();

                if (mysqli_num_rows($resultInfo) == 1) {
                    if ($rows = mysqli_fetch_assoc($resultInfo)) {
                        $title = $rows['nameOfField'];
                        $squareField = $rows['squareOfField'];
                    }
                }

                //Get info from table field and parse it to table for correct looks;
                while ($row = mysqli_fetch_assoc($result)) : ?>

                <?php
                    $sort = explode(';', $row['nameOfSortandSquare']);
                    $sortId = explode(';', $row['idSorts']);
                    $sowns = explode('-', $row['notSownPartSquare']);

                    if ($row['nameOfSortandSquare']) {
                        foreach ($sort as &$elem) {
                            $element = explode('-', $elem);
                            if (count($sort) !== 1) {
                                array_push($sorts, $element[0]);
                                array_push($squareCulture, intval($element[1]));
                                if ($row['notSownPartSquare']) {
                                    array_push($par, $sowns[0]);
                                    array_push($parSquare, $sowns[1]);
                                } else {
                                    array_push($par, '-');
                                    array_push($parSquare, '-');
                                }
                            } else {
                                if ($element[1]) {
                                    array_push($sorts, $element[0]);
                                    array_push($squareCulture, intval($element[1]));
                                } else {
                                    array_push($sorts, $element[0]);
                                    array_push($squareCulture, intval($squareField));
                                }

                                if ($row['notSownPartSquare']) {
                                    array_push($par, $sowns[0]);
                                    array_push($parSquare, $sowns[1]);
                                } else {
                                    array_push($par, '-');
                                    array_push($parSquare, '-');
                                }
                            }
                            array_push($years, $row['year']);
                        }
                    } else {
                        array_push($sorts, '-');
                        array_push($squareCulture, '-');
                        if ($row['notSownPartSquare']) {
                            array_push($par, $sowns[0]);
                            array_push($parSquare, $sowns[1]);
                        } else {
                            array_push($par, '-');
                            array_push($parSquare, '-');
                        }
                        array_push($years, $row['year']);
                    }

                    foreach ($sortId as $id) {
                        array_push($sortsId, $id);
                    }
                    ?>
                <?php endwhile; ?>

                <?
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
                ?>

                <? $arr = [
                    "Сорт" => $sorts,
                    "Культура" => $culture,
                    "Площадь культуры" => $squareCulture,
                    "Год" => $years,
                    "Пар" => $par,
                    "Площадь пар" => $parSquare,
                    "Индекс" => $sortsId,
                    "Неиспользованная земля"  => $notUsedSquare,
                ];
                ?>

                <table border="2">
                    <tr>
                        <td colspan="<?= count($arr) ?>">
                            <? echo $title, ' ' ?>
                            <? echo $squareField, "<span>Га</span>" ?>
                        </td>
                    </tr>
                    <tr>
                        <td><?= 'Сорт' ?></td>
                        <td><?= 'Культура' ?></td>
                        <td><?= 'Год' ?></td>
                        <td><?= 'Площадь культуры(Га)' ?></td>
                        <td><?= 'Пар' ?></td>
                        <td><?= 'Площадь пар(Га)' ?></td>
                        <td><?= 'Индекс сорта' ?></td>
                        <td><?= 'Неиспользованная земля(Га)' ?></td>
                    </tr>
                    <?php
                    $count = 1;
                    for ($i = 0; $i < count($arr['Сорт']); $i++) {
                        echo "<tr>";
                        echo "<td>{$arr['Сорт'][$i]}</td>";
                        echo "<td>{$arr['Культура'][$i]}</td>";
                        // if ($arr['Год'][$i] === $arr['Год'][$i + 1]) {
                        //     $count++;
                        //     echo "<td rowspan=$count>{$arr['Год'][$i]}</td>";
                        // } else {
                        //     $count = 1;
                        // }
                        echo "<td>{$arr['Год'][$i]}</td>";
                        echo "<td>{$arr['Площадь культуры'][$i]}</td>";
                        echo "<td>{$arr['Пар'][$i]}</td>";
                        echo "<td>{$arr['Площадь пар'][$i]}</td>";
                        echo "<td>{$arr['Индекс'][$i]}</td>";
                        echo "<td>{$arr['Неиспользованная земля'][$i]}</td>";
                        echo "</tr>";
                    } ?>
                </table>
                </h1>

            </div>
        </div>
    </main>



    <footer class="footer">
        <div class="container">
            <div class="footer-description">
                <div class="footer-about">
                    <div class="footer-about-logo">
                        <img src="images/icon-footer.svg" alt="Image:Crop" class="footer-about-logo-image">
                        <a href="#" class="footer-about-logo-link">СУИС<span>.</span></a>
                    </div>
                    <p class="footer-about-text">
                        Организация угодий и севооборотов на сельскохозяйственном предприятия
                    </p>
                </div>
                <ul class="footer-links">
                    <span class="footer-span footer-links-name">Переходы:</span>
                    <li class="footer-link">
                        <a href="aboutSystem.php" class="footer-link-nav">Про систему</a>
                    </li>
                    <li class="footer-link">
                        <a href="grounds.php" class="footer-link-nav">Угодья</a>
                    </li>
                    <li class="footer-link">
                        <a href="rotate.php" class="footer-link-nav">Севооборот</a>
                    </li>
                    <li class="footer-link">
                        <a href="typeOfCulture.php" class="footer-link-nav">Виды культур и сортов</a>
                    </li>
                    <li class="footer-link">
                        <a href="too.php" class="footer-link-nav">ТОО Родина</a>
                    </li>
                </ul>
                <div class="footer-contact">
                    <span class="footer-span footer-contact-name">Контакты</span>
                    <p class="footer-contact-text">
                        Email:<br>
                        sanzarmakasev@gmail.com,<br>
                        Телефон:<br>
                        +7778-479-87-82 </p>
                </div>
            </div>
        </div>
    </footer>

    <div class="modal-registration">
        <div class="modal-container">
            <div class="modal-element">
                <form action="#" class="sent-form-registration">
                    <h2 class="form-title">Создать аккаунт</h2>
                    <p class="form-description">
                        Создать аккаунт можно внизу
                    </p>
                    <div class="sent">
                        <input type="text" id="username" class="input-sent" placeholder="Имя:" minlength="6"
                            maxlength="15" required>
                        <!-- <input type="email" id="email" class="input-sent" placeholder="Email Address"> -->
                        <input type="password" id="password" class="input-sent" placeholder="Пароль:" minlength="8"
                            maxlength="16" required>
                    </div>
                    <button class="button-sent-registration">Создать</button>
                </form>
            </div>
        </div>
    </div>

    <div class="modal-sign-in">
        <div class="modal-container">
            <div class="modal-element">
                <form action="#" class="sent-form-sign">
                    <h2 class="form-title">Вход</h2>
                    <div class="sent">
                        <input type="text" class="input-sent-sign" placeholder="Username">
                        <!-- <input type="email" class="input-sent" placeholder="Email Address"> -->
                        <input type="password" class="input-sent-sign" placeholder="Password">
                    </div>
                    <button class="button-sent-sign">Отправить</button>
                </form>
            </div>
        </div>
    </div>

</body>

</html>