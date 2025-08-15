<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MahasiswaProfile extends Model
{
    protected $fillable = [
        'user_id',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'agama',
        'alamat',
        'no_hp',
        'status_perkawinan',
        'kewarganegaraan',

        'nama_ayah',
        'nama_ibu',
        'pekerjaan_ayah',
        'pekerjaan_ibu',
        'no_hp_orangtua',
        'alamat_orangtua',
        'pendidikan_ayah',
        'pendidikan_ibu',
        'penghasilan_ayah',
        'penghasilan_ibu',

        'nama_sekolah',
        'jurusan',
        'tahun_lulus',

        'fakultas_id',
        'program_studi_id',

        'foto_ktp',
        'foto_kk',
        'ijazah',
        'skhu',
        'pas_foto',

        'status_pendaftaran',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class);
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class);
    }
}
