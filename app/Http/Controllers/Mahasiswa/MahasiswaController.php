<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use App\Models\Exam;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Announcement;

class MahasiswaController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('mahasiswaProfile');
        $now = Carbon::now();

        $exam = Exam::where('start_at', '<=', $now)
                    ->where('end_at', '>=', $now)
                    ->first();

        $announcements = Announcement::where('published_at', '<=', $now)
                                    ->orderBy('published_at', 'desc')
                                    ->get();

        return Inertia::render('Mahasiswa/Dashboard', [
            'user' => $user,
            'exam' => $exam,
            'announcements' => $announcements,
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
