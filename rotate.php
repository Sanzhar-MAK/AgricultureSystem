<?php
include "config.php";
$query = "SELECT *FROM cultureandsort";
$result = mysqli_query($connection, $query);
?>

<?php
$getData = array();
$infoTotal = array();
while ($row = mysqli_fetch_array($result)) : ?>
<?php
    $culture = $row['culture'];
    $idCulture = $row['idCulture'];
    $infoTotal = [
        "culture" => $culture,
        "idCulture" => $idCulture,
    ];
    array_push($getData, $infoTotal);
    ?>
<?php endwhile; ?>
<?php

$showArray = array();
$showInfo = array();

for ($i = 0; $i < count($getData); $i++) {
    if (!in_array($getData[$i]['idCulture'], $showArray)) {
        array_push($showArray, $getData[$i]['idCulture']);
        $showTotal = [
            "culture" => $getData[$i]['culture'],
            "idCulture" => $getData[$i]['idCulture']
        ];
        array_push($showInfo, $showTotal);
    }
}
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
    <script src="js/jquery-3.6.0.min.js" defer></script>
    <!-- <script src="js/modal.js" defer></script> -->
    <script src="js/changeTitle.js" defer></script>
    <script src="js/showCulture.js" defer></script>
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
                        <!-- <li class="nav-item">
                            <a href="aboutSystem.php" class="nav-link">Про систему</a>
                        </li> -->
                        <li class="nav-item">
                            <a href="grounds.php" class="nav-link">Угодья</a>
                        </li>
                        <li class="nav-item">
                            <a href="rotate.php" class="nav-link">Севооборот</a>
                        </li>
                        <!-- 
                        <li class="nav-item">
                            <a href="typeOfCulture.php" class="nav-link">Виды культур и сортов</a>
                        </li> -->
                        <li class="nav-item">
                            <a href="too.php" class="nav-link">ТОО Родина</a>
                        </li>
                        <!-- <li class="nav-item">
                            <a href="newMap.php" class="nav-link">Новая карта</a>
                        </li> -->

                        <!-- <li class="nav-item">
                            <a href="#" class="nav-link">Контакты</a>
                        </li> -->
                    </ul>
                </div>
                <!-- <div class="user">
                    <button class="registration-button"><span>Регистрация</span></button>
                    <button class="sign-in-button"><span>Вход</span></button>
                </div> -->
            </nav>
        </div>
    </header>

    <main class="main">
        <div class="description rotate-side">
            <div class="container">
                <p class="grounds-description-text">
                    <span>Севоборот</span> – это научно обоснованное чередование
                    сельскохозяйственных культур (и пара) во времени и размещении на полях.
                    Севооборот один из важных приемов в агротехнике всех
                    сельскохозяйственных культур. При введении севооборота, земельную
                    площадь разбивают на приблизительно равные участки. Каждая культура в
                    определенной последовательности (согласно схеме севооборота) высевается
                    на каждом из них.
                </p>
                <br>
                <p class="grounds-description-text">
                    <span>Схема севооборотов</span> – перечень сельскохозяйственных культур и
                    паров (поле свободное от выращивания сельскохозяйственных культур) в
                    порядке их чередования в севообороте. Каждая схема отражает общие черты
                    большого числа ротаций. Если какую-либо культуру высевают на поле 2-3
                    года, то ее называют Повторной. Если продолжительность возделывания
                    повторной культуры, равна или больше ротации севооборота, ее называют
                    Бессменной.
                </p>
                <h2 class="rotate-description-title">Внизу указаны посевы использумые Агрофирмой <span>"Родина"</span>
                </h2>
                <div class="select-rotate">
                    <ul class="topmenu">
                        <li class="first-child">
                            <a href="#" class="submenu-link">Виды посева
                                <span class="arrow-link"></span></a>
                            <ul class="submenu">
                                <? foreach ($showInfo as $infoCulture) : ?>
                                <li class="inside-link"><a href="#" data-id=<?= $infoCulture['idCulture'] ?>
                                        class="inside-nav"><?= $infoCulture['culture'] ?></a></li>
                                <?php endforeach; ?>
                            </ul>
                        </li>
                    </ul>
                    <div class="show-kind-culture">
                        <div class='kind-culture-card'>

                        </div>
                    </div>
                </div>
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
                    <!-- <li class="footer-link">
                        <a href="aboutSystem.php" class="footer-link-nav">Про систему</a>
                    </li> -->
                    <li class="footer-link">
                        <a href="grounds.php" class="footer-link-nav">Угодья</a>
                    </li>
                    <li class="footer-link">
                        <a href="rotate.php" class="footer-link-nav">Севооборот</a>
                    </li>
                    <!-- <li class="footer-link">
                        <a href="typeOfCulture.php" class="footer-link-nav">Виды культур и сортов</a>
                    </li> -->
                    <li class="footer-link">
                        <a href="too.php" class="footer-link-nav">ТОО Родина</a>
                        <!-- <a href="too.php" class="footer-link-nav">ТОО <span class="change-span">Родина</span></a> -->
                    </li>
                </ul>
                <div class="footer-contact">
                    <span class="footer-span footer-contact-name">Контакты</span>
                    <p class="footer-contact-text">
                        Email:<br>
                        sanzarmakasev@gmail.com,<br>
                        Телефон:<br>
                        +7778-479-87-82 </p>
                    <p class="footer-contact-text">
                        Email:<br>
                        knm25-1979@mail.ru,<br>
                        Телефон:<br>
                        +7771-536-92-19 </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- <div class="modal-registration">
        <div class="modal-container">
            <div class="modal-element">
                <form action="#" class="sent-form-registration">
                    <h2 class="form-title">Создать аккаунт</h2>

                    <div class="sent">
                        <input type="text" name="username" class="input-sent" placeholder="Логин:" minlength="6"
                            maxlength="15" required pattern="/^(?=.*[A-Za-zА-Яа-яЁё])*\w/">
                        <input type="email" name="email" class="input-sent" placeholder="Email:" required>
                        <input type="password" name="password" class="input-sent" placeholder="Пароль:" minlength="8"
                            maxlength="16" required pattern="/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/">
                        <input type="password" name="repassword" class="input-sent" placeholder="Повторите пароль:"
                            minlength="8" maxlength="16" required pattern="/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/">
                    </div>
                    <button class="button-sent-registration">Создать</button>
                </form>
            </div>
        </div>
    </div> -->

    <!-- <div class="modal-sign-in">
        <div class="modal-container">
            <div class="modal-element">
                <form action="#" class="sent-form-sign">
                    <h2 class="form-title">Вход</h2>
                    <div class="sent">
                        <input type="text" name="username" class="input-sent-sign" placeholder="Логин">
                        <input type="password" name="password" class="input-sent-sign" placeholder="Пароль">
                    </div>
                    <button class="button-sent-sign">Отправить</button>
                </form>
            </div>
        </div>
    </div> -->

</body>

</html>