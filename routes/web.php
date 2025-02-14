<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Navbar
Route::get('/', function() {
    return Inertia::render('Home');
});
Route::get('/shopTokoEni', function() {
    return Inertia::render('Shop');
});
Route::get('/aboutTokoEni', function() {
    return Inertia::render('About');
});
Route::get('/cartTokoEni', function() {
    return Inertia::render('Cart');
});


// User
Route::get('/profile', function() {
    return Inertia::render('users/Profile');
});
Route::get('/registerTokoEni', function() {
    return Inertia::render('users/Register');
});
Route::get('/loginTokoEni', function() {
    return Inertia::render('users/Login');
});
