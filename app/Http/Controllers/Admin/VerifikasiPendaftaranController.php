<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MahasiswaProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\VerifikasiPendaftaranMail;
use Illuminate\Support\Facades\Mail;

class VerifikasiPendaftaranController extends Controller
{
   public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $profilesQuery = MahasiswaProfile::with('user');

        if ($status) {
            $profilesQuery->where('status_pendaftaran', $status);
        }

        if ($search) {
            $profilesQuery->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%')
                    ->orWhere('nomor_pendaftaran', 'like', '%' . $search . '%');
            });
        }

        $profiles = $profilesQuery->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Verifikasi/Index', [
            'profiles' => $profiles,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

   public function show($id)
    {
        $profile = MahasiswaProfile::with([
            'user',
            'fakultas',
            'programStudi'
        ])->findOrFail($id);

        return inertia('Admin/Verifikasi/Show', [
            'profile' => $profile
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status_pendaftaran' => 'required|in:diverifikasi,draft,ditolak',
            'catatan_perbaikan' => 'nullable|string'
        ]);

        $profile = MahasiswaProfile::findOrFail($id);
        $profile->status_pendaftaran = $request->status_pendaftaran;
        $profile->catatan_perbaikan = $request->catatan_perbaikan ?? null;
        $profile->save();

        Mail::to($profile->user->email)->send(new VerifikasiPendaftaranMail($profile->user->name, $request->status_pendaftaran, $request->catatan_perbaikan));

        return redirect()->route('verifikasi.index')
            ->with(['success' => 'Status pendaftaran berhasil diperbarui.']);
    }
}
