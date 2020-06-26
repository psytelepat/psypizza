<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>psyPIZZA</title>
        <link rel="stylesheet" type="text/css" href="/css/app.css" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <div id="psypizza"></div>
        <script type="text/javascript" async src="/js/app.js"></script>
    </body>
</html>
