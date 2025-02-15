<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

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

        $remember = $request->has('remember');

        $customer = Customer::where('email', $credentials['email'])->first();

        if (!$customer) {
            return back()->withErrors(['email' => 'Akun tidak ditemukan.'])->onlyInput('email');
        }

        if (!Hash::check($credentials['password'], $customer->password)) {
            return back()->withErrors(['password' => 'Password salah.'])->onlyInput('password');
        }

        Auth::guard('web')->login($customer, $remember);

        $request->session()->regenerate();
        return redirect()->intended('/');
    }
}
