<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

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
})->name('Home');

Route::get('/shopTokoEni', function() {
    return Inertia::render('Shop');
});
Route::middleware('auth.customer')->group(function(){
    Route::prefix('shopTokoEni')->group(function() {
        Route::get('/detailProduct/{id}', [CustomerController::class, 'showDetailProduct'])->name('showDetailProduct');
    });
});


Route::get('/aboutTokoEni', function() {
    return Inertia::render('About');
});


Route::middleware('auth.customer')->group(function() {
    Route::get('/cartTokoEni', [CustomerController::class, 'cartPage'])->name('cartPage');
    Route::prefix('cartTokoEni')->group(function() {
        Route::post('/addToCart', [CustomerController::class, 'addToCart'])->name('addToCart');
        Route::delete('/deleteCart/{id}', [CustomerController::class, 'deleteCart'])->name('deleteCart');
    });
});



// User
Route::get('/profile', function() {
    return Inertia::render('users/Profile');
});
Route::get('/registerTokoEni', [CustomerController::class, 'registerPageTokoEni'])->name('registerPageTokoEni');
Route::post('/registerTokoEni', [CustomerController::class, 'registerTokoEni'])->name('registerTokoEni');

Route::middleware('auth.guest')->group(function() {
    Route::get('/loginTokoEni', [CustomerController::class, 'loginPageTokoEni'])->name('loginPageTokoEni');
    Route::post('/loginTokoEni', [CustomerController::class, 'loginTokoEni'])->name('loginTokoEni');
});

Route::middleware('auth.customer')->group(function() {
    Route::get('/logoutTokoEni', [CustomerController::class, 'logoutTokoEni'])->name('logoutTokoEni');
});
