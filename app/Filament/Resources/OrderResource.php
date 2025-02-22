<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Order;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\OrderResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\OrderResource\RelationManagers;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Data';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make([
                    TextInput::make('customer_name')
                        ->afterStateHydrated(fn ($set, $record) => $set('customer_name', $record?->customer?->name))
                        ->disabled()
                        ->label('Customer')
                        ->required(),
                    TextInput::make('product_name')
                        ->afterStateHydrated(fn ($set, $record) => $set('product_name', $record?->product?->name))
                        ->disabled()
                        ->label('Product'),
                    TextInput::make('quantity')
                        ->disabled()
                        ->label('Quantity'),
                    TextInput::make('total_price')
                        ->disabled()
                        ->label('Total Price'),
                    TextInput::make('phone')
                        ->disabled()
                        ->label('Phone'),
                    TextInput::make('address')
                        ->disabled()
                        ->label('Address'),
                    Select::make('status')
                        ->label('Status Pembayaran')
                        ->options([
                            'Pending' => 'Pending',
                            'Paid' => 'Paid',
                        ])
                        ->default('Pending'),
                    TextInput::make('payment_method')
                        ->disabled()
                        ->label('Payment Method'),
                ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->alignCenter()
                    ->label('No.'),
                TextColumn::make('customer.name')
                    ->alignCenter()
                    ->label('Customer'),
                TextColumn::make('product.name')
                    ->alignCenter()
                    ->label('Product Pesanan'),
                TextColumn::make('quantity')
                    ->alignCenter()
                    ->label('Qty'),
                TextColumn::make('status')
                    ->alignCenter()
                    ->label('Status Pembayaran'),
                TextColumn::make('payment_method')
                    ->alignCenter()
                    ->label('Payment Method'),
                ImageColumn::make('payment_proof')
                    ->alignCenter()
                    ->defaultImageUrl('storage/buktiPembayaran/{filename}')
                    ->size(84)
                    ->square(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
