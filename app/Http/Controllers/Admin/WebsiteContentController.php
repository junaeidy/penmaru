<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InformasiPendaftaran;
use App\Models\HeroSection;
use App\Models\Faq;
use Illuminate\Support\Facades\Storage;

class WebsiteContentController extends Controller
{
    public function index()
    {
        return inertia('Admin/WebsiteContent/Index', [
            'informasi' => InformasiPendaftaran::all(),
            'heroes'    => HeroSection::all(),
            'faqs'      => Faq::all(),
        ]);
    }

    // ----- Informasi Pendaftaran -----
    public function storeInformasi(Request $request)
    {
        $request->validate([
            'jalur' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'kegiatan' => 'required',
            'biaya_pendaftaran' => 'required|integer',
        ],[
            'jalur.required' => 'Jalur wajib diisi',
            'tanggal_mulai.required' => 'Tanggal mulai wajib diisi',
            'tanggal_mulai.date' => 'Tanggal mulai tidak valid',
            'tanggal_selesai.required' => 'Tanggal selesai wajib diisi',
            'tanggal_selesai.date' => 'Tanggal selesai tidak valid',
            'tanggal_selesai.after_or_equal' => 'Tanggal selesai tidak boleh sebelum tanggal mulai',
            'kegiatan.required' => 'Kegiatan wajib diisi',
            'biaya_pendaftaran.required' => 'Biaya pendaftaran wajib diisi',
            'biaya_pendaftaran.integer' => 'Biaya pendaftaran harus berupa angka',
        ]);

        InformasiPendaftaran::create($request->only([
            'jalur',
            'tanggal_mulai',
            'tanggal_selesai',
            'kegiatan',
            'biaya_pendaftaran'
        ]));

        return back()->with(['success' => 'Informasi pendaftaran ditambahkan']);
    }

    public function updateInformasi(Request $request, InformasiPendaftaran $informasi)
    {
        $request->validate([
            'jalur' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'kegiatan' => 'required',
            'biaya_pendaftaran' => 'required|integer',
        ],[
            'jalur.required' => 'Jalur wajib diisi',
            'tanggal_mulai.required' => 'Tanggal mulai wajib diisi',
            'tanggal_mulai.date' => 'Tanggal mulai tidak valid',
            'tanggal_selesai.required' => 'Tanggal selesai wajib diisi',
            'tanggal_selesai.date' => 'Tanggal selesai tidak valid',
            'tanggal_selesai.after_or_equal' => 'Tanggal selesai tidak boleh sebelum tanggal mulai',
            'kegiatan.required' => 'Kegiatan wajib diisi',
            'biaya_pendaftaran.required' => 'Biaya pendaftaran wajib diisi',
            'biaya_pendaftaran.integer' => 'Biaya pendaftaran harus berupa angka',
        ]);

        $informasi->update($request->only([
            'jalur',
            'tanggal_mulai',
            'tanggal_selesai',
            'kegiatan',
            'biaya_pendaftaran'
        ]));

        return back()->with(['success' => 'Informasi pendaftaran diubah']);
    }

    public function destroyInformasi(InformasiPendaftaran $informasi)
    {
        $informasi->delete();
        return back()->with(['success' => 'Informasi pendaftaran dihapus']);
    }


    // ----- Hero Section -----
    public function storeHero(Request $request)
    {
        $request->validate([
            'gambar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ],[
            'gambar.required' => 'Gambar wajib diisi',
            'gambar.image' => 'Gambar harus berupa gambar',
            'gambar.mimes' => 'Gambar harus berupa gambar JPG, JPEG, atau PNG',
            'gambar.max' => 'Gambar tidak boleh lebih besar dari 2MB',
        ]);

        $path = $request->file('gambar')->store('hero', 'public');

        HeroSection::create(['gambar' => $path]);

        return back()->with(['success' => 'Hero section ditambahkan']);
    }

    public function updateHero(Request $request, HeroSection $hero)
    {
        $request->validate([
            'gambar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ],[
            'gambar.required' => 'Gambar harus diisi',
            'gambar.mimes' => 'Gambar harus berupa file gambar JPG, JPEG, atau PNG',
            'gambar.max' => 'Gambar tidak boleh lebih besar dari 2MB',
        ]);

        // hapus gambar lama permanen
        if ($hero->gambar && Storage::disk('public')->exists($hero->gambar)) {
            Storage::disk('public')->delete($hero->gambar);
        }

        $path = $request->file('gambar')->store('hero', 'public');
        $hero->update(['gambar' => $path]);

        return back()->with(['success' => 'Hero section diperbarui']);
    }

    public function destroyHero(HeroSection $hero)
    {
        // hapus gambar permanen
        if ($hero->gambar && Storage::disk('public')->exists($hero->gambar)) {
            Storage::disk('public')->delete($hero->gambar);
        }

        $hero->delete();

        return back()->with(['success' => 'Hero section dihapus']);
    }


    // ----- FAQ -----
    public function storeFaq(Request $request)
    {
        $request->validate([
            'pertanyaan' => 'required',
            'jawaban' => 'required',
        ],[
            'pertanyaan.required' => 'Pertanyaan wajib diisi',
            'jawaban.required' => 'Jawaban wajib diisi',
        ]);

        Faq::create($request->only(['pertanyaan', 'jawaban']));

        return back()->with(['success' => 'FAQ ditambahkan']);
    }

    public function updateFaq(Request $request, Faq $faq)
    {
        $request->validate([
            'pertanyaan' => 'required',
            'jawaban' => 'required',
        ],[
            'pertanyaan.required' => 'Pertanyaan wajib diisi',
            'jawaban.required' => 'Jawaban wajib diisi',
        ]);

        $faq->update($request->only(['pertanyaan', 'jawaban']));

        return back()->with(['success' => 'FAQ diubah']);
    }

    public function destroyFaq(Faq $faq)
    {
        $faq->delete();
        return back()->with(['success' => 'FAQ dihapus']);
    }
}
