<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\VerifikasiPendaftaranController;
use App\Http\Controllers\Admin\FakultasController;
use App\Http\Controllers\Admin\ProgramStudiController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Mahasiswa\MahasiswaProfileController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//ADMIN ROUTES
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/dashboard/verifikasi', [VerifikasiPendaftaranController::class, 'index'])->name('verifikasi.index');
    Route::get('/admin/dashboard/verifikasi/{id}', [VerifikasiPendaftaranController::class, 'show'])->name('verifikasi.show');
    Route::put('/admin/dashboard/verifikasi/{id}', [VerifikasiPendaftaranController::class, 'update'])->name('verifikasi.update');
    Route::resource('/admin/dashboard/fakultas', FakultasController::class)->name('index', 'admin.fakultas.index')
        ->name('store', 'admin.fakultas.store')
        ->name('update', 'admin.fakultas.update')
        ->name('destroy', 'admin.fakultas.destroy');
    Route::resource('/admin/dashboard/program-studi', ProgramStudiController::class)->name('index', 'admin.program-studi.index')
        ->name('store', 'admin.program-studi.store')
        ->name('update', 'admin.program-studi.update')
        ->name('destroy', 'admin.program-studi.destroy');
});

//MAHASISWA ROUTES
Route::middleware(['auth', 'mahasiswa', 'verified'])->group(function () {
    Route::get('/dashboard', [MahasiswaController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/profile', [MahasiswaProfileController::class, 'create'])
        ->name('mahasiswa.profile.create');
    Route::post('/dashboard/profile', [MahasiswaProfileController::class, 'store'])
        ->name('mahasiswa.profile.store');
    Route::get('/dashboard/profile/show', [MahasiswaProfileController::class, 'show'])
        ->name('mahasiswa.profile.show');
    Route::get('/dashboard/profile/edit', [MahasiswaProfileController::class, 'edit'])
        ->name('mahasiswa.profile.edit');
    Route::post('/dashboard/profile/edit', [MahasiswaProfileController::class, 'update'])
        ->name('mahasiswa.profile.update');
    Route::put('/dashboard/profile/edit', [MahasiswaProfileController::class, 'update']);
    Route::get('/dashboard/kartu/cetak', [MahasiswaController::class, 'cetakKartu'])
        ->name('mahasiswa.kartu.cetak');
});

require __DIR__.'/auth.php';
