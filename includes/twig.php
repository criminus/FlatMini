<?php
//Twig Template Engine controller.
// Load Twig
require_once './vendor/autoload.php'; 

// Twig environment
$loader = new \Twig\Loader\FilesystemLoader('./templates');

// Initialize Twig environment
$twig = new \Twig\Environment($loader, [
    'cache' => false, //Set to false for development 
]);