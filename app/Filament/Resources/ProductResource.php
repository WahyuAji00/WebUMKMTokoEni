<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Product;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\ProductResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\ProductResource\RelationManagers;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Data';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make([
                    TextInput::make('name')
                        ->required(),
                    Textarea::make('description'),
                    TextInput::make('price')
                        ->numeric()
                        ->required(),
                    TextInput::make('stock')
                        ->numeric()
                        ->required(),
                    TextInput::make('sku')
                        ->label('Unique Code')
                        ->required(),
                    TextInput::make('brand'),
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('productsImages')
                        ->preserveFilenames()
                        ->required(),
                    Select::make('type')
                        ->options([
                            'Pen' => 'Pen',
                            'Pencil' => 'Pencil',
                            'Notebook' => 'Notebook',
                            'Eraser' => 'Eraser',
                            'Marker' => 'Marker',
                            'Other' => 'Other'
                        ])
                        ->default('Other')
                        ->required(),
                ])
                ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->alignCenter()
                    ->sortable()
                    ->label('No.'),
                ImageColumn::make('image')
                    ->alignCenter()
                    ->defaultImageUrl('storage/productsImages/{filename}')
                    ->size(84)
                    ->square(),
                TextColumn::make('name')
                    ->alignCenter()
                    ->searchable()
                    ->sortable()
                    ->label('Product Name'),
                TextColumn::make('price')
                    ->alignCenter()
                    ->numeric(),
                TextColumn::make('stock')
                    ->alignCenter()
                    ->numeric(),
                TextColumn::make('sku')
                    ->alignCenter()
                    ->searchable()
                    ->label('Unique Code'),
                TextColumn::make('type')
                    ->alignCenter(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                SelectFilter::make('type')->options([
                    'Pen' => 'Pen',
                    'Pencil' => 'Pencil',
                    'Notebook' => 'Notebook',
                    'Eraser' => 'Eraser',
                    'Marker' => 'Marker',
                    'Other' => 'Other'
                ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
