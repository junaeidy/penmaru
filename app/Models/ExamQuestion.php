<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question_text',
        'answer_type',
    ];

    // Relasi ke ujian
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    // Relasi ke opsi jawaban
    public function options()
    {
        return $this->hasMany(ExamQuestionOption::class, 'question_id');
    }

    // Relasi ke jawaban
    public function answers()
    {
        return $this->hasMany(ExamAnswer::class, 'question_id');
    }
}
