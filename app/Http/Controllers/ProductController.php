<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');

        $products = Product::when($type, function ($query, $type) {
            return $query->where('type', $type);
        })->get();

        return Inertia::render('Dashboard', [
            'products' => $products,
            'types' => ['Pen', 'Pencil', 'Notebook', 'Eraser', 'Marker', 'Other']
        ]);
    }
}

