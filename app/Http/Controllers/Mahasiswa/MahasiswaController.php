<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Fakultas;
use App\Models\ProgramStudi;

class MahasiswaController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('mahasiswaProfile');

        return Inertia::render('Mahasiswa/Dashboard', [
            'user' => $user
        ]);
    }

    public function show()
    {
        $profile = Auth::user()->mahasiswaProfile()->with(['fakultas', 'programStudi'])->first();

        if (!$profile || $profile->status_pendaftaran !== 'diverifikasi') {
            return redirect()->route('dashboard')
                ->with(['error' => 'Akses ditolak. Status pendaftaran belum diverifikasi.']);
        }

        return Inertia::render('Mahasiswa/Kartu/Index', [
            'profile' => $profile,
            'fakultas' => Fakultas::all(),
            'programStudis' => ProgramStudi::all(),
        ]);
    }
}
