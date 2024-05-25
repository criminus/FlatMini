<?php
//Load Twig
require 'includes/twig.php';

//Includes
include 'includes/functions_language.php';

//Load the language data - Can be picked based on user's selection later
$lang = loadTranslation('en');

//Empty navigation for now.
$navigation = [];

//Assign vars
$data = array_merge($navigation, [
    'site_name'     => 'Flat Mini',
    'page_title'    => 'Index page',
    'translation'   => $lang['COPYRIGHT_TRANSLATION']
]);

//Render template
echo $twig->render('index.twig', $data);