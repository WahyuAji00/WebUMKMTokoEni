<?php

use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Untuk mengambil semua data dari tabel Product dan mengembalikan dalam bentuk JSON
Route::get('/products', function() {
    return response()->json(Product::all(), 200);
});

// Untuk semua nilai unik column type dari tabel Product
Route::get('/types', function () {
    $types = Product::select('type')->distinct()->pluck('type');
    return response()->json($types);
});

// Untuk mengambil semua data dari tabel Customer dan mengembalikan dalam bentuk JSON
Route::get('/customers', function() {
    return response()->json(Customer::all(), 200);
});

// Untuk memastikan bahwa hanya Customer yang sudah login yang hanya bisa membuak page Prodile
Route::get('/customer', [CustomerController::class, 'profileCustomer']);
