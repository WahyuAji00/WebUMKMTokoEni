<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

use function Termwind\render;

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


// Route untuk Customer agar bisa melakukan Registrasi Akun
Route::get('/registerTokoEni', [CustomerController::class, 'registerPageTokoEni'])->name('registerTokoEni');
Route::post('/registerTokoEni', [CustomerController::class, 'registerTokoEni'])->name('registerTokoEni');


// Route untuk Customer agar bisa melakukan Login Akun yang sduah dibuat
Route::get('/loginTokoEni', [CustomerController::class, 'loginPageTokoEni'])->name('loginTokoEni');
Route::post('/loginTokoEni', [CustomerController::class, 'loginTokoEni'])->name('loginTokoEni');


// Route agar Customer bisa melakukan Logout dari akun
Route::middleware('auth.customer')->group(function() {
    Route::post('/logoutTokoEni', [CustomerController::class, 'logoutTokoEni'])->name('logoutTokoEni');
});


// Route untuk mengakses halaman Shop
Route::get('/shopTokoEni', function() {
    return Inertia::render('Shop');
});
// Agar bisa membuka page Detail Product, Customer harus login terlebih dahulu
Route::middleware('auth.customer')->group(function(){
    Route::prefix('shopTokoEni')->group(function() {
        Route::get('/detailProduct/{id}', [CustomerController::class, 'showDetailProduct'])->name('showDetailProduct');
    });
});



Route::middleware('auth.customer')->group(function(){
    Route::get('/riwayatOrderTokoEni', [CustomerController::class, 'riwayatOrder'])->name('riwayatOrder');
});



// Agar bisa membuka segala aktivitas di page Cart, ustomer harus melakukan Login terlebih dahuluC
Route::middleware('auth.customer')->group(function() {
    Route::get('/cartTokoEni', [CustomerController::class, 'cartPage'])->name('cartPage');
    Route::post('/cartTokoEni', [CustomerController::class, 'addToCart'])->name('addToCart');
    Route::delete('/cartTokoEni/remove/{id}', [CustomerController::class, 'deleteCart'])->name('deleteCart');
    Route::put('/cartTokoEni/update/{id}', [CustomerController::class, 'updateQuantity']);
    Route::patch('/cartTokoEni/updateChecked/{id}', [CustomerController::class, 'updateCheckedStatus']);
    Route::patch('/resetCheckedStatus', [CustomerController::class, 'resetCheckedStatus']);
});


// ROute untuk membuka halaman about
Route::get('/aboutTokoEni', function() {
    return Inertia::render('About');
});


// Agar Customer bisa mangakses segala aktivitas di page Order diwajibkan Login terlebih dahulu
Route::middleware('auth.customer')->group(function() {
    Route::get('/orderTokoEni', [CustomerController::class, 'orderProductShow'])->name('orderProductShow');
    Route::post('/orderTokoEni', [CustomerController::class, 'orderProduct'])->name('orderProduct');
});


// Agar bisa mengakses page Prodilem Customer harus melakukan login terlebih dahulu
Route::middleware('auth.customer')->group(function() {
    Route::get('/profileCustomer', [CustomerController::class, 'profileCustomer'])->name('profileCustomer');
    Route::put('/profileCustomer', [CustomerController::class, 'updateProfile'])->name('updateprofileCustomer');
});
