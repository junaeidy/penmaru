<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'user_id',
        'started_at',
        'finished_at',
    ];

    // Relasi ke exam
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    // Relasi ke user (mahasiswa)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke jawaban
    public function answers()
    {
        return $this->hasMany(ExamAnswer::class, 'response_id');
    }
}
