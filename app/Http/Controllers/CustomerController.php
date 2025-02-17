<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class CustomerController extends Controller
{
    public function registerPageTokoEni(): Response {
        return Inertia::render('users/Register');
    }

    public function registerTokoEni(Request $request) {
        $request->validate([
            'name' => ['required', 'string', 'max:225'],
            'email' => ['required', 'string', 'email', 'max:225', 'unique:customers'],
            'password' => ['required', 'confirmed', Password::default()],
        ], [
            'password.confirmed' => 'Confirm password does not match',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($customer);

        return redirect()->route('loginPageTokoEni');
    }

    public function loginPageTokoEni(): Response {
        return Inertia::render('users/Login');
    }

    public function loginTokoEni(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $remember_customer = $request->boolean('remember');

        $customer = Customer::where('email', $credentials['email'])->first();

        if (!$customer) {
            return back()->withErrors(['email' => 'Akun tidak ditemukan.'])->onlyInput('email');
        }

        if (!Hash::check($credentials['password'], $customer->password)) {
            return back()->withErrors(['password' => 'Password salah.'])->onlyInput('password');
        }

        Auth::guard('web')->login($customer, $remember_customer);

        $request->session()->regenerate();
        return redirect()->intended('/');
    }

    public function logoutTokoEni(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/loginTokoEni')->with('success', 'Logout berhasil!');
    }

    public function showDetailProduct($name) {
        $decodedName = urldecode($name);

        $product = Product::where('name', $decodedName)->firstOrFail();

        return Inertia::render('DetailProduct', [
            'product' => $product,
        ]);
    }

    public function cartPage()
    {
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        return Inertia::render('Cart', ['cartItems' => $cartItems]);
    }

    public function addTocart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock < $request->quantity) {
            return back()->withErrors(['message' => 'Stok tidak mencukupi']);
        }

        $product->reduceStock($request->quantity);

        Cart::updateOrCreate(
            ['user_id' => Auth::id(), 'product_id' => $request->product_id],
            ['quantity' => $request->quantity]
        );

        return back()->with('success', 'Produk ditambahkan ke cart');
    }

    public function destroyCart($id)
    {
        $cartItem = Cart::findOrFail($id);

        if ($cartItem->user_id !== Auth::id()) {
            return back()->withErrors(['message' => 'Tidak dapat menghapus item ini']);
        }

        $product = $cartItem->product;
        $product->stock += $cartItem->quantity;
        $product->save();

        $cartItem->delete();

        return back()->with('success', 'Produk dihapus dari cart');
    }
}
