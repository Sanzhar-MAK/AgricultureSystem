<?php
include "config.php";
$query = "SELECT *FROM kindoftechnology";
$result = mysqli_query($connection, $query);
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
    <!-- <script src="js/modal.js" defer></script> -->
    <script src="js/changeTitle.js" defer></script>
    <script src="js/sentData.js"></script>
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

                        <!-- <li class="nav-item">
                            <a href="typeOfCulture.php" class="nav-link">Виды культур и сортов</a>
                        </li> -->
                        <li class="nav-item">
                            <a href="too.php" class="nav-link">ТОО Родина</a>
                        </li>

                        <!-- <li class="nav-item">
                            <a href="newMap.php" class="nav-link">Новая карта</a>
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
        <div class="description">
            <div class="container">
                <h1 class="description-title">Вас приветствует информационная система СУИС</h1>
                <p class="description-text">Здесь вы можете познакомиться с основными методами и технологиями угодий и
                    севооборотов, а также как их организовывать на примере сельскохозяйственного предприятия ТОО
                    "Родина".</p>
                <div class="description-more">
                    <a href="#footer-id" class="link-more"><span>Больше</span></a>
                    <a href="#" class="link-more link-more-danger"><span>Больше</span></a>
                </div>
            </div>
        </div>
        <div class="cards-info">
            <div class="container">
                <div class="cards">
                    <?php
                    while ($row = mysqli_fetch_array($result)) : ?>
                    <div class='card'>
                        <div class='card-image'>
                            <img src="<?= $row['photo'] ?>">
                        </div>
                        <div class="card-description">
                            <h3 class="card-description-title">
                                <?= $row['title'] ?>
                            </h3>
                            <p class="card-description-text">
                                <?= $row['description'] ?>
                            </p>
                        </div>
                    </div>
                    <?php endwhile; ?>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer" id="footer-id">
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
                        <input type="text" name="username" class="input-sent input-text" placeholder="Логин:"
                            minlength="6" maxlength="15" required pattern="/^(?=.*[A-Za-zА-Яа-яЁё])*\w/">
                        <input type="email" name="email" class="input-sent input-text" placeholder="Email:" required>
                        <div class="show-password-block">
                            <input type="password" name="password" class="input-sent input-text" placeholder="Пароль:"
                                minlength="8" maxlength="16" required class="input-show-password">
                            <input type="button" class="show-password-button">

                        </div>
                        <input type="password" name="repassword" class="input-sent input-text"
                            placeholder="Повторите пароль:" minlength="8" maxlength="16" required
                            class="input-repassword">
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

</html>