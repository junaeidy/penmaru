<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use App\Models\Fakultas;
use Illuminate\Http\Request;

class ProgramStudiController extends Controller
{
    public function index()
    {
        return inertia('Admin/ProgramStudi/Index', [
            'programStudis' => ProgramStudi::with('fakultas')->latest()->get(),
            'fakultas' => Fakultas::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fakultas_id' => 'required|exists:fakultas,id',
            'nama' => 'required|string|max:255',
            'harga_pendaftaran' => 'required|numeric|min:0'
        ],[
            'fakultas_id.required' => 'Fakultas yang dipilih tidak valid.',
            'nama.required' => 'Nama Program Studi harus diisi.',
            'harga_pendaftaran.required' => 'Biaya Pendaftaran harus diisi.',
            'harga_pendaftaran.numeric' => 'Biaya Pendaftaran harus berupa angka.',
            'harga_pendaftaran.min' => 'Biaya Pendaftaran harus lebih besar dari atau sama dengan 1.'
        ]);

        ProgramStudi::create($request->only('fakultas_id', 'nama', 'harga_pendaftaran'));

        return back()->with(['success' => 'Program Studi berhasil ditambahkan.']);
    }

    public function update(Request $request, ProgramStudi $programStudi)
    {
        $request->validate([
            'fakultas_id' => 'required|exists:fakultas,id',
            'nama' => 'required|string|max:255',
            'harga_pendaftaran' => 'required|numeric|min:1'
        ],[
            'fakultas_id.exists' => 'Fakultas yang dipilih tidak valid.',
            'nama.required' => 'Nama Program Studi harus diisi.',
            'harga_pendaftaran.required' => 'Biaya Pendaftaran harus diisi.',
            'harga_pendaftaran.numeric' => 'Biaya Pendaftaran harus berupa angka.',
            'harga_pendaftaran.min' => 'Biaya Pendaftaran harus lebih besar dari atau sama dengan 1.'
        ]);

        $programStudi->update($request->only('fakultas_id', 'nama', 'harga_pendaftaran'));

        return back()->with(['success' => 'Program Studi berhasil diperbarui.']);
    }

    public function destroy(ProgramStudi $programStudi)
    {
        $programStudi->delete();
        return back()->with(['success' => 'Program Studi berhasil dihapus.']);
    }
}
