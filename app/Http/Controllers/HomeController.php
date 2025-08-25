<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use App\Models\Faq;
use App\Models\BankAccount;
use App\Models\HeroSection;
use App\Models\InformasiPendaftaran;

class HomeController extends Controller
{
    public function index()
    {
        $faqs = Faq::all(['id', 'pertanyaan', 'jawaban']);
        $informasi = InformasiPendaftaran::all();
        $slides = HeroSection::all(['id', 'gambar']);

        return Inertia::render('Welcome', [
            'faqs' => $faqs,
            'informasi' => $informasi,
            'slides' => $slides
        ]);
    }

    public function registrationInfo()
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        $bankAccounts = BankAccount::all();
        $informasi = InformasiPendaftaran::all();

        return Inertia::render('RegistrationInfo',[
            'settings' => $settings,
            'bankAccounts' => $bankAccounts,
            'informasi' => $informasi
        ]);
    }
}
