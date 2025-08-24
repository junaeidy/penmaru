<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Exam;
use App\Models\ExamResponse;
use App\Models\User;
use App\Models\MahasiswaProfile;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {
        $activities = collect();

        $stats = MahasiswaProfile::select('status_pendaftaran', DB::raw('count(*) as total'))
            ->groupBy('status_pendaftaran')
            ->pluck('total', 'status_pendaftaran');

        $trend = DB::table('mahasiswa_profiles')
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $months = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'Mei', 6 => 'Jun',
            7 => 'Jul', 8 => 'Agu', 9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des'
        ];

        $trendData = collect(range(1, 12))->map(function ($num) use ($months, $trend) {
            $item = $trend->firstWhere('month', $num);
            return [
                'month' => $months[$num],
                'Pendaftar' => $item ? $item->total : 0,
            ];
        });

        $statsMahasiswa = [
            'totalPendaftar' => MahasiswaProfile::count(),
            'totalDiterima' => MahasiswaProfile::where('status_pendaftaran', 'diterima')->count(),
            'totalDitolak' => MahasiswaProfile::where('status_pendaftaran', 'ditolak')->count(),
            'menungguVerifikasi' => MahasiswaProfile::where('status_pendaftaran', 'menunggu verifikasi')->count(),
        ];

        $pendaftaran = User::with('mahasiswaProfile')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'register',
                    'name' => $user->name,
                    'time' => $user->created_at,
                    'time_human' => $user->created_at->diffForHumans(),
                ];
            });

        $updateProfile = MahasiswaProfile::latest('updated_at')
            ->take(5)
            ->get()
            ->map(function ($profile) {
                return [
                    'type' => 'update',
                    'name' => $profile->user->name,
                    'time' => $profile->updated_at,
                    'time_human' => $profile->updated_at->diffForHumans(),
                ];
            });

        $finishExam = ExamResponse::with(['user', 'exam'])
            ->whereNotNull('finished_at')
            ->latest('finished_at')
            ->take(5)
            ->get()
            ->map(function ($response) {
                return [
                    'type' => 'finish_exam',
                    'name' => $response->user->name,
                    'exam' => $response->exam->title,
                    'time' => $response->finished_at,
                    'time_human' => $response->finished_at->diffForHumans(),
                ];
            });

        $schedule = Exam::latest()
            ->take(5)
            ->get()
            ->map(function ($exam) {
                return [
                    'type' => 'schedule_exam',
                    'name' => $exam->title,
                    'time' => $exam->created_at,
                    'time_human' => $exam->created_at->diffForHumans(),
                ];
            });

        $activities = $pendaftaran
            ->merge($updateProfile)
            ->merge($finishExam)
            ->merge($schedule)
            ->sortByDesc('time')
            ->take(10)
            ->values();


        return Inertia::render('Admin/Dashboard',[
            'stats' => [
                'Draft' => $stats['draft'] ?? 0,
                'Menunggu Verifikasi' => $stats['menunggu verifikasi'] ?? 0,
                'Diverifikasi' => $stats['diverifikasi'] ?? 0,
                'Selesai Ujian' => $stats['selesai ujian'] ?? 0,
                'Diterima' => $stats['diterima'] ?? 0,
                'Ditolak' => $stats['ditolak'] ?? 0,
            ],
            'trendData' => $trendData,
            'statsMahasiswa' => $statsMahasiswa,
            'activities' => $activities,
        ]);
    }
}
