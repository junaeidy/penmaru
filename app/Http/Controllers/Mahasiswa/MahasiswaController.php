<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use App\Models\Fakultas;
use App\Models\ProgramStudi;
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

    public function cetakKartu()
    {
        $profile = Auth::user()->mahasiswaProfile()->with(['fakultas', 'programStudi'])->first();

        if (!$profile || $profile->status_pendaftaran !== 'diverifikasi') {
            return redirect()->route('dashboard')
                ->with(['error' => 'Akses ditolak. Status pendaftaran belum diverifikasi.']);
        }
        $customPaper = array(0,0,600,450);
        $pdf = Pdf::loadView('pdf.kartu', compact('profile'))
                  ->setPaper($customPaper);

        return $pdf->download('kartu-pendaftaran-' . Auth::user()->name . '.pdf');
    }
}
