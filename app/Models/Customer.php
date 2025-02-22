<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Customer extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $dates = [
        'deleted_at'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
