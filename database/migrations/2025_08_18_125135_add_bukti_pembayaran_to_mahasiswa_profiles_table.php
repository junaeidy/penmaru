<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('mahasiswa_profiles', function (Blueprint $table) {
            $table->string('nomor_pendaftaran')->nullable()->unique()->after('id');
            $table->string('bukti_pembayaran')->nullable()->after('pas_foto');
        });
    }

    public function down()
    {
        Schema::table('mahasiswa_profiles', function (Blueprint $table) {
            $table->dropColumn('nomor_pendaftaran');
            $table->dropColumn('bukti_pembayaran');
        });
    }

};
