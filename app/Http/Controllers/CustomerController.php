<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class CustomerController extends Controller
{
    // Register Page
    public function registerPageTokoEni(): Response {
        // Menampilkan halaman Register ke Customer
        return Inertia::render('customers/Register');
    }
    public function registerTokoEni(Request $request) {
        // Melakukan validasi
        $request->validate([
            'name' => ['required', 'string', 'max:225'],
            'email' => ['required', 'string', 'email', 'max:225', 'unique:customers'],
            'password' => ['required', 'confirmed', Password::default()],
        ], [
            'password.confirmed' => 'Confirm password does not match',
        ]);
        // Melakukan pembuatan akun dan dikirimkan ke Database
        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        // Untuk Customer agar bisa melakukan login dengan guard Customer
        Auth::guard('customer')->login($customer);
        // Melanjutkan ke halaman Login
        return redirect()->route('loginTokoEni');
    }



    // Login Page
    public function loginPageTokoEni(): Response {
        // Menampilkan halaman Login ke Customer
        return Inertia::render('customers/Login');
    }
    public function loginTokoEni(Request $request) {
        // Melakukan Validasi
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);
        // Untuk mengirimkan data, apakah Customer menekan Checkbox dengan nama Remember
        $remember = $request->has('remember');

        if (Auth::guard('customer')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'
        ]], $remember)) {
            return redirect()->route('Home');
        }

        return back()->withErrors(['email' => 'Email atau password salah.']);
    }


    // Logout
    public function logoutTokoEni(Request $request)
    {
        Auth::guard('customer')->logout();
        // Menghapus semua sesi Customer saat ini
        $request->session()->invalidate();
        // Menghasilkan CSRF Token baru
        $request->session()->regenerateToken();

        return Inertia::location(route('loginTokoEni'));
    }



    // Profile USer
    public function profileCustomer()
    {
        $customer = Auth::guard('customer')->user();

        return Inertia::render('customers/Profile', [
            'customer' => $customer,
        ]);
    }
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:500',
        ]);

        $customer = Auth::guard('customer')->user();
        // Melakukan percabangan untuk menentukan bahwa $cutomer adalah instance atau bukan dari Customer,
        // jika bukan, akan menampilkan error dan mengembalikan response dalam bentuk JSON
        if (!$customer instanceof Customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $customer->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
        ]);
        // Mengembalikan responese dalam bentuk JSON jika Success
        return response()->json([
            'message' => 'Profile updated successfully',
            'customer' => $customer,
        ], 200);
    }



    // Detail
    public function showDetailProduct($name) {
        // Digunakan untuk mengubah karakter khusus seperti spasi menjadi %20
        $decodedName = urldecode($name);
        // Mencari data lama tabel Product dengan column name sesuai dengan nilai $decodeName,
        // mengambil data pertama hasil pencarian, jika tidak ada, memunculkan error 404 Not Found
        $product = Product::where('name', $decodedName)->firstOrFail();

        return Inertia::render('DetailProduct', [
            'product' => $product,
        ]);
    }



    // Cart
    public function cartPage(Request $request)
    {
        $customer = auth()->guard('customer')->user();

        $carts = Cart::where('customer_id', $customer->id)
            ->with('product')
            ->get()
            ->map(function ($cart) {
                return [
                    'id' => $cart->id,
                    'product_id' => $cart->product->id,
                    'name' => $cart->product->name,
                    'price' => $cart->product->price,
                    'quantity' => $cart->quantity,
                    'total' => $cart->product->price * $cart->quantity,
                ];
            });

        return Inertia::render('Cart', ['carts' => $carts]);
    }
    public function addTocart(Request $request)
    {
        $customer = Auth::guard('customer')->user();

        if (!$customer) {
            return redirect()->route('login')->with('error', 'Unauthorized');
        }

        $cart = Cart::where('customer_id', $customer->id)
                    ->where('product_id', $request->product_id)
                    ->first();

        if ($cart) {
            $cart->quantity += $request->quantity;
            $cart->save();
        } else {
            Cart::create([
                'customer_id' => $customer->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return back()->with('success', 'Product added to cart');
    }
    public function deleteCart($id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
    public function updateQuantity(Request $request, $id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json([
            'message' => 'Cart updated successfully',
            'cart' => $cartItem
        ]);
    }
    public function updateCheckedStatus(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);
        $cart->is_checked = $request->input('is_checked') ? 1 : 0;
        $cart->save();

        return response()->json(['message' => 'Checked status updated', 'cart' => $cart]);
    }
    public function resetCheckedStatus()
    {
        $customer = Auth::guard('customer')->user();

        // Reset semua is_checked menjadi 0 untuk customer yang sedang login
        Cart::where('customer_id', $customer->id)->update(['is_checked' => 0]);

        return response()->json(['message' => 'Checked status reset successfully']);
    }



    // Order
    public function orderProductShow()
    {
        $customer = Auth::guard('customer')->user();

        // Ambil hanya item yang is_checked = 1
        $cartItems = Cart::where('customer_id', $customer->id)
                        ->where('is_checked', 1) // Filter hanya yang dicentang
                        ->with('product')
                        ->get();

        return Inertia::render('Order', [
            'customer' => $customer,
            'cart' => $cartItems, // Hanya kirim item yang dicentang
        ]);
    }
    public function orderProduct(Request $request)
    {
        $customer = Auth::guard('customer')->user();

        $request->validate([
            'checked_items' => 'required|array',
            'checked_items.*' => 'exists:carts,id',
            'payment_method' => 'required|string|in:QRIS,Pickup',
            'phone' => 'required|string',
            'address' => 'required|string',
            'payment_proof' => $request->payment_method === 'QRIS' ? 'required|image|mimes:jpeg,png,jpg|max:2048' : 'nullable',
        ]);

        $cartItems = Cart::whereIn('id', $request->checked_items)
                    ->where('customer_id', $customer->id)
                    ->with('product') // Pastikan product ikut dimuat
                    ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->back()->withErrors(['cart' => 'Keranjang kosong atau produk tidak ditemukan.']);
        }

        $totalPrice = $cartItems->sum(function ($cartItem) {
            return ($cartItem->product->price ?? 0) * $cartItem->quantity;
        });

        if ($totalPrice <= 0) {
            return redirect()->back()->withErrors(['error' => 'Total harga tidak valid.']);
        }

        // Buat Order
        $order = Order::create([
            'customer_id' => $customer->id,
            'product_id' => $cartItems->first()->product_id,
            'quantity' => $cartItems->sum('quantity'),
            'total_price' => $totalPrice,
            'customer_name' => $customer->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'status' => 'pending',
            'payment_method' => $request->payment_method,
        ]);

        // **Kurangi stok produk berdasarkan item yang dipesan**
        foreach ($cartItems as $cartItem) {
            if ($cartItem->product) {
                $cartItem->product->decrement('stock', $cartItem->quantity);
            }
        }

        // Simpan file bukti pembayaran jika metode QRIS dipilih
        if ($request->hasFile('payment_proof')) {
            $file = $request->file('payment_proof');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = 'buktiPembayaran/' . $fileName;

            $file->storeAs('public/buktiPembayaran', $fileName);
            $order->update(['payment_proof' => $filePath]);
        }

        // Hapus item dari cart setelah order dibuat
        Cart::whereIn('id', $request->checked_items)->delete();

        return redirect('/')->with('success', 'Order berhasil dibuat dan stok produk telah diperbarui!');
    }



    // RIwayat
    public function riwayatOrder()
    {
        return Inertia::render('RiwayatOrder');
    }
}
