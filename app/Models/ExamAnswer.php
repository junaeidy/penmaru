<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'response_id',
        'question_id',
        'answer_text',
        'option_id'
    ];

    public function response()
    {
        return $this->belongsTo(ExamResponse::class, 'response_id');
    }

    public function question()
    {
        return $this->belongsTo(ExamQuestion::class, 'question_id');
    }

    public function option()
    {
        return $this->belongsTo(ExamQuestionOption::class, 'option_id');
    }
}
