<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    protected $table = 'program_studis';

    protected $fillable = ['fakultas_id', 'nama', 'harga_pendaftaran'];

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class);
    }
}
