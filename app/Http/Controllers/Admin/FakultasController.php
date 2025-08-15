<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use Illuminate\Http\Request;

class FakultasController extends Controller
{
    public function index()
    {
        return inertia('Admin/Fakultas/Index', [
            'fakultas' => Fakultas::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255'
        ],[
            'nama.required' => 'Nama fakultas harus diisi.',
            'nama.string' => 'Nama fakultas harus berupa teks.',
            'nama.max' => 'Nama fakultas tidak boleh lebih dari 255 karakter.'
        ]);

        Fakultas::create($request->only('nama'));

        return back()->with(['success' => 'Fakultas berhasil ditambahkan.']);
    }

    public function update(Request $request, Fakultas $fakulta)
    {
        $request->validate([
            'nama' => 'required|string|max:255'
        ],[
            'nama.required' => 'Nama fakultas harus diisi.',
            'nama.string' => 'Nama fakultas harus berupa teks.',
            'nama.max' => 'Nama fakultas tidak boleh lebih dari 255 karakter.'
        ]);

        $fakulta->update($request->only('nama'));

        return back()->with(['success' => 'Fakultas berhasil diperbarui.']);
    }

    public function destroy(Fakultas $fakulta)
    {
        $fakulta->delete();
        return back()->with(['success' => 'Fakultas berhasil dihapus.']);
    }
}
