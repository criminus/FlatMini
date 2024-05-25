<?php
//Function to handle translations
function loadTranslation($language = 'en') {
    $lang = array();
    $main_language = "./language/{$language}/main.php";

    if (file_exists($main_language)) {
        $lang = array_merge($lang, include($main_language));
    }

    return $lang;
}