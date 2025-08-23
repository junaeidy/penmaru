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
use App\Models\BankAccount;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MahasiswaExport;
use App\Models\MahasiswaProfile;

class MahasiswaController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('mahasiswaProfile');
        $now = Carbon::now();
        $bankAccounts = BankAccount::all();

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
            'bankAccounts' => $bankAccounts,
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

    public function exportPdf(Request $request)
    {
        $profiles = MahasiswaProfile::with(['user', 'fakultas', 'programStudi'])
            ->when($request->status, fn($q) => $q->where('status_pendaftaran', $request->status))
            ->when($request->prodi, fn($q) => $q->where('program_studi_id', $request->prodi))
            ->when($request->tahun, fn($q) => $q->where('tahun_lulus', $request->tahun))
            ->get();

        $pdf = Pdf::loadView('exports.mahasiswa_pdf', [
            'mahasiswa' => $profiles
        ])->setPaper('a4', 'landscape');

        return $pdf->download('data-calon-mahasiswa.pdf');
    }

    // Excel Export with filter
    public function exportExcel(Request $request)
    {
        return Excel::download(
            new MahasiswaExport(
                $request->status,
                $request->prodi,
                $request->tahun
            ),
            'data-calon-mahasiswa.xlsx'
        );
    }
}
