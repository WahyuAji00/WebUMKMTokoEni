<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}"> 
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
    @inertia
</body>
</html>
