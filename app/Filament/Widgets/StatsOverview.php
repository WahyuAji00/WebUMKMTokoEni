<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Orders', 'total_orders')
                ->value(Order::count())
                ->description('Jumlah total pesanan')
                ->color('success'),

            Stat::make('Total Customers', 'total_customers')
                ->value(Customer::count())
                ->description('Jumlah pelanggan')
                ->color('info'),

            Stat::make('Total Products', 'total_products')
                ->value(Product::count())
                ->description('Jumlah produk tersedia')
                ->color('primary'),
        ];
    }
}
