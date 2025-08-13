<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mahasiswa_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Data Diri
            $table->string('jenis_kelamin');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('agama');
            $table->text('alamat');
            $table->string('no_hp');
            $table->string('status_perkawinan');
            $table->string('kewarganegaraan');

            // Data Orang Tua / Wali
            $table->string('nama_ayah');
            $table->string('nama_ibu');
            $table->string('pekerjaan_ayah');
            $table->string('pekerjaan_ibu');
            $table->string('no_hp_orangtua');
            $table->text('alamat_orangtua');
            $table->string('pendidikan_ayah');
            $table->string('pendidikan_ibu');
            $table->string('penghasilan_ayah');
            $table->string('penghasilan_ibu');

            // Data Pendidikan Sebelumnya
            $table->string('nama_sekolah');
            $table->string('jurusan');
            $table->year('tahun_lulus');

            // Berkas (path file)
            $table->string('foto_ktp');
            $table->string('foto_kk');
            $table->string('ijazah');
            $table->string('skhu');
            $table->string('pas_foto');

            // Status pendaftaran
            $table->enum('status_pendaftaran', ['draft', 'menunggu verifikasi', 'diterima', 'ditolak'])->default('draft');
            $table->text('catatan_perbaikan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa_profiles');
    }
};
