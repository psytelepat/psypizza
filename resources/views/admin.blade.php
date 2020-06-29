<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>psyPIZZA Admin Panel</title>
        <link rel="stylesheet" type="text/css" href="/css/admin.css" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <div id="psypizza-admin"></div>
        <script type="text/javascript" async src="/js/admin.js"></script>
    </body>
</html>
