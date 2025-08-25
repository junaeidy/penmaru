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
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/registration-info', [HomeController::class, 'registrationInfo'])->name('registration.info');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//ADMIN ROUTES
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/dashboard/website-content', [WebsiteContentController::class, 'index'])->name('website-content.index');

    // Informasi Pendaftaran
    Route::post('/admin/dashboard/website-content/informasi', [WebsiteContentController::class, 'storeInformasi'])->name('website-content.informasi.store');
    Route::put('/admin/dashboard/website-content/informasi/{informasi}', [WebsiteContentController::class, 'updateInformasi'])->name('website-content.informasi.update');
    Route::delete('/admin/dashboard/website-content/informasi/{informasi}', [WebsiteContentController::class, 'destroyInformasi'])->name('website-content.informasi.destroy');

    // Hero Section
    Route::post('/admin/dashboard/website-content/hero', [WebsiteContentController::class, 'storeHero'])->name('website-content.hero.store');
    Route::put('/admin/dashboard/website-content/hero/{hero}', [WebsiteContentController::class, 'updateHero'])->name('website-content.hero.update');
    Route::delete('/admin/dashboard/website-content/hero/{hero}', [WebsiteContentController::class, 'destroyHero'])->name('website-content.hero.destroy');

    // FAQ
    Route::post('/admin/dashboard/website-content/faq', [WebsiteContentController::class, 'storeFaq'])->name('website-content.faq.store');
    Route::put('/admin/dashboard/website-content/faq/{faq}', [WebsiteContentController::class, 'updateFaq'])->name('website-content.faq.update');
    Route::delete('/admin/dashboard/website-content/faq/{faq}', [WebsiteContentController::class, 'destroyFaq'])->name('website-content.faq.destroy');

    // Verifikasi
    Route::get('/admin/dashboard/verifikasi', [VerifikasiPendaftaranController::class, 'index'])->name('verifikasi.index');
    Route::get('/admin/dashboard/verifikasi/{id}', [VerifikasiPendaftaranController::class, 'show'])->name('verifikasi.show');
    Route::put('/admin/dashboard/verifikasi/{id}', [VerifikasiPendaftaranController::class, 'update'])->name('verifikasi.update');
    Route::post('/admin/dashboard/verifikasi/{id}/set-status', [VerifikasiPendaftaranController::class, 'setStatus'])->name('verifikasi.setStatus');

    // Fakultas
    Route::resource('/admin/dashboard/fakultas', FakultasController::class)
        ->name('index', 'admin.fakultas.index')
        ->name('store', 'admin.fakultas.store')
        ->name('update', 'admin.fakultas.update')
        ->name('destroy', 'admin.fakultas.destroy');

    // Program Studi
    Route::resource('/admin/dashboard/program-studi', ProgramStudiController::class)
        ->name('index', 'admin.program-studi.index')
        ->name('store', 'admin.program-studi.store')
        ->name('update', 'admin.program-studi.update')
        ->name('destroy', 'admin.program-studi.destroy');

    //  Ujian
    Route::prefix('/admin/dashboard/exams')->name('admin.exams.')->group(function () {
        Route::get('/', [AdminExamController::class, 'index'])->name('index');
        Route::get('/create', [AdminExamController::class, 'create'])->name('create');
        Route::post('/', [AdminExamController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [AdminExamController::class, 'edit'])->name('edit');
        Route::put('/{id}', [AdminExamController::class, 'update'])->name('update');
        Route::delete('/{id}', [AdminExamController::class, 'destroy'])->name('destroy');

        // Pertanyaan
        Route::post('/{examId}/questions', [AdminExamController::class, 'storeQuestion'])->name('questions.store');
        Route::delete('/questions/{id}', [AdminExamController::class, 'destroyQuestion'])->name('questions.destroy');

        // Statistik
        Route::get('/{examId}/statistics', [AdminExamController::class, 'statistics'])->name('statistics');
        Route::get('/{exam}/responses/{response}', [AdminExamController::class, 'showResponse'])->name('responses.show');
        Route::delete('/{examId}/responses/{responseId}', [AdminExamController::class, 'delete'])->name('responses.delete');
    });

    // Pengumuman
    Route::get('/admin/dashboard/announcements', [AnnouncementController::class, 'index'])->name('admin.announcements.index');
    Route::get('/admin/dashboard/announcements/create', [AnnouncementController::class, 'create'])->name('admin.announcements.create');
    Route::post('/admin/dashboard/announcements', [AnnouncementController::class, 'store'])->name('admin.announcements.store');
    Route::delete('/admin/dashboard/announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('admin.announcements.destroy');

    // Pengaturan
    Route::prefix('admin/settings')->name('admin.settings.')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');

        Route::post('/general', [SettingController::class, 'updateGeneral'])->name('general');
        Route::post('/period', [SettingController::class, 'updatePeriod'])->name('period');
        Route::post('/requirements', [SettingController::class, 'updateRequirements'])->name('requirements');

        Route::post('/bank-accounts', [SettingController::class, 'storeBankAccount'])->name('bank.store');
        Route::delete('/bank-accounts/{bankAccount}', [SettingController::class, 'destroyBankAccount'])->name('bank.destroy');
    });

    // Export
    Route::get('/admin/dashboard/export/pdf', [MahasiswaController::class, 'exportPdf'])->name('admin.mahasiswa.export.pdf');
    Route::get('/admin/dashboard/export/excel', [MahasiswaController::class, 'exportExcel'])->name('admin.mahasiswa.export.excel');
});


//MAHASISWA ROUTES
Route::middleware(['auth', 'mahasiswa', 'verified'])->group(function () {
    Route::get('/dashboard', [MahasiswaController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/dashboard/profile', [MahasiswaProfileController::class, 'create'])
        ->name('mahasiswa.profile.create')->middleware('check.registration');
    Route::post('/dashboard/profile', [MahasiswaProfileController::class, 'store'])
        ->name('mahasiswa.profile.store')->middleware('check.registration');
    Route::get('/dashboard/profile/show', [MahasiswaProfileController::class, 'show'])
        ->name('mahasiswa.profile.show');
    Route::get('/dashboard/profile/edit', [MahasiswaProfileController::class, 'edit'])
        ->name('mahasiswa.profile.edit');
    Route::post('/dashboard/profile/edit', [MahasiswaProfileController::class, 'update'])
        ->name('mahasiswa.profile.update');
    Route::put('/dashboard/profile/edit', [MahasiswaProfileController::class, 'update']);

    // Kartu
    Route::get('/dashboard/kartu/cetak', [MahasiswaController::class, 'cetakKartu'])
        ->name('mahasiswa.kartu.cetak');

    //  Ujian
    Route::prefix('dashboard/exams')->name('mahasiswa.exams.')->group(function () {
        Route::get('{exam}/access', [ExamController::class, 'accessForm'])->name('access');
        Route::post('{exam}/access', [ExamController::class, 'accessVerify'])->name('access.verify');

        Route::get('{exam}/start', [ExamController::class, 'start'])->name('start');
        Route::get('{exam}', [ExamController::class, 'show'])->name('show');
        Route::post('{exam}/submit', [ExamController::class, 'submit'])->name('submit');
    });

    // Pengaturan
    Route::get('/dashboard/settings', [SettingsController::class, 'index'])->name('mahasiswa.settings');
});


require __DIR__.'/auth.php';
