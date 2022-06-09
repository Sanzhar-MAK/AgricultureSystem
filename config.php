<?php
$connection = mysqli_connect("localhost", "agro", "sanzhar45924", "agro");
if (!$connection) {
    echo "Database is connecting" . mysqli_connect_error();
}