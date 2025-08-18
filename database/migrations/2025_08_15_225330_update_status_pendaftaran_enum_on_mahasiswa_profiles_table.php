<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('mahasiswa_profiles', function (Blueprint $table) {
            $table->enum('status_pendaftaran', [
                'draft',
                'menunggu verifikasi',
                'diverifikasi',
                'menunggu ujian',
                'selesai ujian',
                'diterima',
                'ditolak'
            ])->default('draft')->change();
        });
    }

    public function down()
    {
        Schema::table('mahasiswa_profiles', function (Blueprint $table) {
            $table->enum('status_pendaftaran', [
                'draft',
                'menunggu verifikasi',
                'diverifikasi',
                'diterima',
                'ditolak'
            ])->default('draft')->change();
        });
    }
};

