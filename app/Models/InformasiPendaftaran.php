<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformasiPendaftaran extends Model
{
    use HasFactory;

    protected $table = 'informasi_pendaftaran';

    protected $fillable = [
        'jalur',
        'tanggal_mulai',
        'tanggal_selesai',
        'kegiatan',
        'biaya_pendaftaran',
    ];
}
