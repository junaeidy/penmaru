<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('mahasiswaProfile');

        return Inertia::render('Mahasiswa/Dashboard', [
            'user' => $user
        ]);
    }
}
