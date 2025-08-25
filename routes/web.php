<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\VerifikasiPendaftaranController;
use App\Http\Controllers\Admin\FakultasController;
use App\Http\Controllers\Admin\ProgramStudiController;
use App\Http\Controllers\Admin\AdminExamController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\WebsiteContentController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Mahasiswa\MahasiswaProfileController;
use App\Http\Controllers\Mahasiswa\ExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Rute Halaman Depan
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/registration-info', [HomeController::class, 'registrationInfo'])->name('registration.info');

// Rute untuk Profil Pengguna
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute Admin
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
Route::middleware(['auth', 'admin'])->prefix('admin/dashboard')->name('admin.')->group(function () {
    // Dashboard & Website Content
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    Route::prefix('website-content')->name('website-content.')->group(function () {
        Route::get('/', [WebsiteContentController::class, 'index'])->name('index');
        Route::post('/informasi', [WebsiteContentController::class, 'storeInformasi'])->name('informasi.store');
        Route::put('/informasi/{informasi}', [WebsiteContentController::class, 'updateInformasi'])->name('informasi.update');
        Route::delete('/informasi/{informasi}', [WebsiteContentController::class, 'destroyInformasi'])->name('informasi.destroy');
        
        Route::post('/hero', [WebsiteContentController::class, 'storeHero'])->name('hero.store');
        Route::put('/hero/{hero}', [WebsiteContentController::class, 'updateHero'])->name('hero.update');
        Route::delete('/hero/{hero}', [WebsiteContentController::class, 'destroyHero'])->name('hero.destroy');
        
        Route::post('/faq', [WebsiteContentController::class, 'storeFaq'])->name('faq.store');
        Route::put('/faq/{faq}', [WebsiteContentController::class, 'updateFaq'])->name('faq.update');
        Route::delete('/faq/{faq}', [WebsiteContentController::class, 'destroyFaq'])->name('faq.destroy');
    });

    // Verifikasi Pendaftaran
    Route::prefix('verifikasi')->name('verifikasi.')->group(function () {
        Route::get('/', [VerifikasiPendaftaranController::class, 'index'])->name('index');
        Route::get('/{id}', [VerifikasiPendaftaranController::class, 'show'])->name('show');
        Route::put('/{id}', [VerifikasiPendaftaranController::class, 'update'])->name('update');
        Route::post('/{id}/set-status', [VerifikasiPendaftaranController::class, 'setStatus'])->name('setStatus');
    });

    // Manajemen Fakultas & Program Studi
    Route::resource('fakultas', FakultasController::class);
    Route::resource('program-studi', ProgramStudiController::class);
    
    // Manajemen Ujian
    Route::prefix('exams')->name('exams.')->group(function () {
        Route::get('/', [AdminExamController::class, 'index'])->name('index');
        Route::get('/create', [AdminExamController::class, 'create'])->name('create');
        Route::post('/', [AdminExamController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [AdminExamController::class, 'edit'])->name('edit');
        Route::put('/{id}', [AdminExamController::class, 'update'])->name('update');
        Route::delete('/{id}', [AdminExamController::class, 'destroy'])->name('destroy');
        
        Route::post('/{examId}/questions', [AdminExamController::class, 'storeQuestion'])->name('questions.store');
        Route::delete('/questions/{id}', [AdminExamController::class, 'destroyQuestion'])->name('questions.destroy');
        
        Route::get('/{examId}/statistics', [AdminExamController::class, 'statistics'])->name('statistics');
        Route::get('/{exam}/responses/{response}', [AdminExamController::class, 'showResponse'])->name('responses.show');
        Route::delete('/{examId}/responses/{responseId}', [AdminExamController::class, 'delete'])->name('responses.delete');
    });

    // Manajemen Pengumuman
    Route::resource('announcements', AnnouncementController::class)->except(['edit', 'show', 'update']);

    // Pengaturan
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');
        Route::post('/general', [SettingController::class, 'updateGeneral'])->name('general');
        Route::post('/period', [SettingController::class, 'updatePeriod'])->name('period');
        Route::post('/requirements', [SettingController::class, 'updateRequirements'])->name('requirements');
        Route::post('/bank-accounts', [SettingController::class, 'storeBankAccount'])->name('bank.store');
        Route::delete('/bank-accounts/{bankAccount}', [SettingController::class, 'destroyBankAccount'])->name('bank.destroy');
    });
    
    // Export Data
    Route::prefix('export')->name('mahasiswa.export.')->group(function () {
        Route::get('/pdf', [MahasiswaController::class, 'exportPdf'])->name('pdf');
        Route::get('/excel', [MahasiswaController::class, 'exportExcel'])->name('excel');
    });
});

// Rute Mahasiswa
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
Route::middleware(['auth', 'mahasiswa', 'verified'])->prefix('dashboard')->name('mahasiswa.')->group(function () {
    Route::get('/', [MahasiswaController::class, 'index'])->name('dashboard');

    // Profil Mahasiswa
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [MahasiswaProfileController::class, 'create'])->name('create')->middleware('check.registration');
        Route::post('/', [MahasiswaProfileController::class, 'store'])->name('store')->middleware('check.registration');
        Route::get('/show', [MahasiswaProfileController::class, 'show'])->name('show');
        Route::get('/edit', [MahasiswaProfileController::class, 'edit'])->name('edit');
        Route::post('/edit', [MahasiswaProfileController::class, 'update'])->name('update');
    });
    
    // Cetak Kartu Mahasiswa
    Route::get('/kartu/cetak', [MahasiswaController::class, 'cetakKartu'])->name('kartu.cetak');
    
    // Ujian
    Route::prefix('exams')->name('exams.')->group(function () {
        Route::get('{exam}/access', [ExamController::class, 'accessForm'])->name('access');
        Route::post('{exam}/access', [ExamController::class, 'accessVerify'])->name('access.verify');
        Route::get('{exam}/start', [ExamController::class, 'start'])->name('start');
        Route::get('{exam}', [ExamController::class, 'show'])->name('show');
        Route::post('{exam}/submit', [ExamController::class, 'submit'])->name('submit');
    });
    
    // Pengaturan Mahasiswa
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
});

require __DIR__.'/auth.php';