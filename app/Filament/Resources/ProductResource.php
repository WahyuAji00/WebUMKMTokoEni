<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Product;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\ProductResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\ProductResource\RelationManagers;
use Filament\Tables\Columns\ImageColumn;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationGroup = 'Data';

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Section::make()
                ->schema([
                    TextInput::make('name')
                        ->label('Product Name')
                        ->required(),
                    Textarea::make('description')
                        ->label('Product Description'),
                    TextInput::make('price')
                        ->numeric()
                        ->required()
                        ->tel(),
                    TextInput::make('stock')
                        ->required()
                        ->numeric(),
                    TextInput::make('sku')
                        ->required()
                        ->label('Unique Code'),
                    TextInput::make('brand'),
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('productsImages')
                        ->preserveFilenames()
                        ->required(),
                    Select::make('type')
                        ->required()
                        ->options([
                            'Pen' => 'Pen',
                            'Pencil' => 'Pencil',
                            'Notebook' => 'Notebook',
                            'Eraser' => 'Eraser',
                            'Marker' => 'Marker',
                            'Other' => 'Other',
                        ])
                ])
                ->coumns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('No.'),
                ImageColumn::make('image')
                    ->defaultImageUrl('/productsImages/{filename}')
                    ->square(),
                TextColumn::make('name')
                    ->searchable()
                    ->label('Product Name'),
                TextColumn::make('price')
                    ->numeric(),
                TextColumn::make('stock')
                    ->numeric(),
                TextColumn::make('sku')
                    ->searchable()
                    ->label('Unique Code'),
                TextColumn::make('type'),
            ])
            ->filters([
                SelectFilter::make('type')->options([
                    'Pen' => 'Pen',
                    'Pencil' => 'Pencil',
                    'Notebook' => 'Notebook',
                    'Eraser' => 'Eraser',
                    'Marker' => 'Marker',
                    'Other' => 'Other',
                ]),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
