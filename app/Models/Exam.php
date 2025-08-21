<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_at',
        'end_at',
        'duration'
    ];

    // Relasi ke pertanyaan
    public function questions()
    {
        return $this->hasMany(ExamQuestion::class);
    }

    // Relasi ke response/jawaban mahasiswa
    public function responses()
    {
        return $this->hasMany(ExamResponse::class);
    }

    // Status ujian (aktif, selesai, belum dimulai)
    public function getStatusAttribute()
    {
        $now = now();
        if ($now->lt($this->start_at)) {
            return 'Belum Dimulai';
        } elseif ($now->between($this->start_at, $this->end_at)) {
            return 'Aktif';
        } else {
            return 'Selesai';
        }
    }
}
