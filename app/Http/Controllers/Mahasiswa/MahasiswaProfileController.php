<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MahasiswaProfile;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Mail\ProfileSubmittedMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class MahasiswaProfileController extends Controller
{
    public function create()
    {
        $profile = Auth::user()->mahasiswaProfile;

        // Jika sudah submit dan status menunggu verifikasi, arahkan ke view read-only
        if ($profile && $profile->status_pendaftaran === 'menunggu verifikasi' || 'diverifikasi') {
            return redirect()->route('mahasiswa.profile.show');
        }

        if ($profile && $profile->status_pendaftaran === 'draft') {
            return redirect()->route('mahasiswa.profile.edit');
        }

        return inertia('Mahasiswa/ProfileForm', [
            'profile' => $profile
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            // Data Diri
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'agama' => 'required|string|max:50',
            'alamat' => 'required|string',
            'no_hp' => ['required', 'string', 'max:20', 'regex:/^(\+62|0)\d{8,12}$/'],
            'status_perkawinan' => 'required|string|max:50',
            'kewarganegaraan' => 'required|string|max:50',

            // Orang Tua/Wali
            'nama_ayah' => 'required|string|max:100',
            'nama_ibu' => 'required|string|max:100',
            'pekerjaan_ayah' => 'required|string|max:100',
            'pekerjaan_ibu' => 'required|string|max:100',
            'no_hp_orangtua' => ['required', 'string', 'max:20', 'regex:/^(\+62|0)\d{8,12}$/'],
            'alamat_orangtua' => 'required|string',
            'pendidikan_ayah' => 'required|string|max:50',
            'pendidikan_ibu' => 'required|string|max:50',
            'penghasilan_ayah' => 'required|string|max:50',
            'penghasilan_ibu' => 'required|string|max:50',

            // Pendidikan Sebelumnya
            'nama_sekolah' => 'required|string|max:150',
            'jurusan' => 'required|string|max:100',
            'tahun_lulus' => 'required|digits:4',

            // Berkas
            'foto_ktp' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'foto_kk' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'ijazah' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'skhu' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'pas_foto' => 'required|file|mimes:jpg,jpeg,png|max:1024',
        ], [
            'required' => 'Kolom :attribute wajib diisi.',
            'string' => 'Kolom :attribute harus berupa teks.',
            'max' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
            'in' => 'Pilihan untuk :attribute tidak valid.',
            'date' => 'Kolom :attribute harus berupa tanggal yang valid.',
            'digits' => 'Kolom :attribute harus berupa :digits digit.',
            'file' => 'Kolom :attribute harus berupa file.',
            'mimes' => 'File :attribute harus memiliki format :values.',
            'regex' => 'Format :attribute tidak valid.',
        ]);

        // Upload file
        foreach (['foto_ktp', 'foto_kk', 'ijazah', 'skhu', 'pas_foto'] as $field) {
            if ($request->hasFile($field)) {
                $validated[$field] = $request->file($field)->store('berkas', 'public');
            }
        }

        // Simpan data
        MahasiswaProfile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, [
                'status_pendaftaran' => 'menunggu verifikasi'
            ])
        );

        Mail::to(Auth::user()->email)->send(new ProfileSubmittedMail(Auth::user()->name));

        return redirect()->route('mahasiswa.profile.show')
            ->with(['success' => 'Data berhasil disubmit, menunggu verifikasi admin.']);
    }

    public function show()
    {
        $profile = Auth::user()->mahasiswaProfile;

        if (!$profile) {
            return redirect()->route('mahasiswa.profile.create');
        }

        return inertia('Mahasiswa/ProfileShow', [
            'profile' => $profile
        ]);
    }

    public function edit()
    {
        $profile = Auth::user()->mahasiswaProfile;

        if (!$profile) {
            return redirect()->route('mahasiswa.profile.create');
        }

        if (!in_array($profile->status_pendaftaran, ['draft', 'perlu perbaikan'])) {
            return redirect()->route('mahasiswa.profile.edit');
        }

        return inertia('Mahasiswa/ProfileEdit', [
            'profile' => $profile
        ]);
    }

    public function update(Request $request)
    {
        $profile = Auth::user()->mahasiswaProfile;

        if (!$profile || !in_array($profile->status_pendaftaran, ['draft', 'perlu perbaikan'])) {
            return redirect()->route('mahasiswa.profile.show');
        }

        $validated = $request->validate([
            // Data Diri
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'agama' => 'required|string|max:50',
            'alamat' => 'required|string',
            'no_hp' => ['required', 'string', 'max:20', 'regex:/^(\+62|0)\d{8,12}$/'],
            'status_perkawinan' => 'required|string|max:50',
            'kewarganegaraan' => 'required|string|max:50',

            // Orang Tua/Wali
            'nama_ayah' => 'required|string|max:100',
            'nama_ibu' => 'required|string|max:100',
            'pekerjaan_ayah' => 'required|string|max:100',
            'pekerjaan_ibu' => 'required|string|max:100',
            'no_hp_orangtua' => ['required', 'string', 'max:20', 'regex:/^(\+62|0)\d{8,12}$/'],
            'alamat_orangtua' => 'required|string',
            'pendidikan_ayah' => 'required|string|max:50',
            'pendidikan_ibu' => 'required|string|max:50',
            'penghasilan_ayah' => 'required|string|max:50',
            'penghasilan_ibu' => 'required|string|max:50',

            // Pendidikan Sebelumnya
            'nama_sekolah' => 'required|string|max:150',
            'jurusan' => 'required|string|max:100',
            'tahun_lulus' => 'required|digits:4',

            // Berkas
            'foto_ktp' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'foto_kk' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'ijazah' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'skhu' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'pas_foto' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ], [
            'required' => 'Kolom :attribute wajib diisi.',
            'string' => 'Kolom :attribute harus berupa teks.',
            'max' => [
                'numeric' => 'Kolom :attribute tidak boleh lebih dari :max.',
                'file'    => 'Kolom :attribute tidak boleh lebih dari :max kilobyte.',
                'string'  => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
                'array'   => 'Kolom :attribute tidak boleh memiliki lebih dari :max item.',
            ],
            'in' => 'Pilihan untuk :attribute tidak valid.',
            'date' => 'Kolom :attribute harus berupa tanggal yang valid.',
            'digits' => 'Kolom :attribute harus berupa :digits digit.',
            'file' => 'Kolom :attribute harus berupa file.',
            'mimes' => 'File :attribute harus memiliki format :values.',
            'regex' => 'Format :attribute tidak valid.',
        ]);

        foreach (['foto_ktp', 'foto_kk', 'ijazah', 'skhu', 'pas_foto'] as $field) {
            if ($request->hasFile($field)) {
                if ($profile->$field && Storage::disk('public')->exists($profile->$field)) {
                    Storage::disk('public')->delete($profile->$field);
                }
                $validated[$field] = $request->file($field)->store('berkas', 'public');
            } else {
                $validated[$field] = $profile->$field;
            }
        }

        $profile->update(array_merge($validated, [
            'status_pendaftaran' => 'menunggu verifikasi',
            'catatan_perbaikan' => null
        ]));

        return redirect()->route('mahasiswa.profile.show')
            ->with(['success' => 'Data berhasil diperbarui dan menunggu verifikasi admin.']);
    }

}
