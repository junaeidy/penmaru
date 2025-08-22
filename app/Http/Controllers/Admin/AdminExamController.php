<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\User;
use App\Models\ExamQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminExamController extends Controller
{
    /**
     * List semua ujian
     */
    public function index()
    {
        $exams = Exam::withCount(['questions', 'responses'])->get();

        return Inertia::render('Admin/Exams/Index', [
            'exams' => $exams->map(function ($exam) {
                return [
                    'id'        => $exam->id,
                    'title'     => $exam->title,
                    'start_at'  => $exam->start_at,
                    'end_at'    => $exam->end_at,
                    'duration'  => $exam->duration,
                    'questions' => $exam->questions_count,
                    'responses' => $exam->responses_count,
                    'status'    => $this->getExamStatus($exam),
                ];
            })
        ]);
    }

    /**
     * Form create ujian
     */
    public function create()
    {
        return Inertia::render('Admin/Exams/Create');
    }

    /**
     * Simpan ujian baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_at'    => 'required|date',
            'end_at'      => 'required|date|after:start_at',
            'duration'    => 'required|integer|min:1',
        ],[
            'title.required'    => 'Judul ujian harus diisi.',
            'start_at.required' => 'Waktu mulai harus diisi dan valid.',
            'end_at.required'   => 'Waktu selesai harus diisi dan valid serta setelah waktu mulai.',
            'duration.required' => 'Durasi ujian harus diisi.',
            'duration.integer'  => 'Durasi harus berupa angka.',
            'duration.min'      => 'Durasi minimal 1 menit.',
        ]);

        Exam::create($request->only('title', 'description', 'start_at', 'end_at', 'duration'));

        return redirect()->route('admin.exams.index')->with(['success' => 'Ujian berhasil dibuat.']);
    }

    /**
     * Edit ujian (lihat pertanyaan)
     */
    public function edit($id)
    {
        $exam = Exam::with('questions.options')->findOrFail($id);

        return Inertia::render('Admin/Exams/Edit', [
            'exam' => $exam
        ]);
    }

    /**
     * Update ujian
     */
    public function update(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_at'    => 'required|date',
            'end_at'      => 'required|date|after:start_at',
            'duration'    => 'required|integer|min:1',
        ], [
            'title.required'    => 'Judul ujian harus diisi.',
            'start_at.required' => 'Waktu mulai harus diisi.',
            'start_at.date'     => 'Format waktu mulai tidak valid.',
            'end_at.required'   => 'Waktu selesai harus diisi.',
            'end_at.date'       => 'Format waktu selesai tidak valid.',
            'end_at.after'      => 'Waktu selesai harus setelah waktu mulai.',
            'duration.required' => 'Durasi ujian harus diisi.',
            'duration.integer'  => 'Durasi harus berupa angka.',
            'duration.min'      => 'Durasi minimal 1 menit.',
        ]);

        $exam->update($request->only('title', 'description', 'start_at', 'end_at', 'duration'));

        return redirect()->route('admin.exams.index')->with(['success' => 'Ujian berhasil diperbarui.']);
    }

    /**
     * Hapus ujian
     */
    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();

        return redirect()->route('admin.exams.index')->with(['success' => 'Ujian berhasil dihapus.']);
    }

    /**
     * Tambah pertanyaan
     */
    public function storeQuestion(Request $request, $examId)
    {
        $request->validate([
            'question_text' => 'required|string',
            'answer_type'   => 'required|in:radio,select,multiselect,text',
            'options'       => 'array'
        ]);

        $exam = Exam::findOrFail($examId);

        $question = $exam->questions()->create([
            'question_text' => $request->question_text,
            'answer_type'   => $request->answer_type,
        ]);

        if (in_array($request->answer_type, ['radio', 'select', 'multiselect']) && $request->options) {
            foreach ($request->options as $opt) {
                $question->options()->create(['option_text' => $opt]);
            }
        }

        return back()->with(['success' => 'Pertanyaan berhasil ditambahkan.']);
    }

    /**
     * Hapus pertanyaan
     */
    public function destroyQuestion($id)
    {
        $question = ExamQuestion::findOrFail($id);
        $question->delete();

        return back()->with(['success' => 'Pertanyaan berhasil dihapus.']);
    }

    /**
     * Statistik responden
     */
    public function statistics($examId)
    {
        $exam = Exam::with(['responses.user'])->findOrFail($examId);

        return Inertia::render('Admin/Exams/Statistics', [
            'exam'      => $exam,
            'responses' => $exam->responses->map(function ($resp) {
                return [
                    'id'          => $resp->id,
                    'user'        => $resp->user->name ?? 'Unknown',
                    'started_at'  => $resp->started_at,
                    'finished_at' => $resp->finished_at,
                ];
            })
        ]);
    }

    /**
     * Helper status ujian
     */
    private function getExamStatus($exam)
    {
        $now = now();

        if ($now->lt($exam->start_at)) {
            return 'Belum Dimulai';
        } elseif ($now->gt($exam->end_at)) {
            return 'Selesai';
        } else {
            return 'Aktif';
        }
    }

    public function showResponse($examId, $responseId)
    {
        $exam = Exam::with('questions.options')->findOrFail($examId);
        $mahasiswa = User::with('mahasiswaProfile')->findOrFail($exam->responses()->where('id', $responseId)->first()->user_id);

        $response = $exam->responses()->with('answers.question.options', 'answers.option', 'user')->findOrFail($responseId);

        return Inertia::render('Admin/Exams/ResponDetail', [
            'exam'     => $exam,
            'mahasiswa' => $mahasiswa,
            'response' => [
                'id'          => $response->id,
                'user_id'     => $response->user->id ?? null,
                'user_name'   => $response->user->name ?? 'Unknown',
                'started_at'  => $response->started_at,
                'finished_at' => $response->finished_at,
                'answers' => $response->answers->map(function($a) {
                    $question = $a->question;
                    $answerText = $a->answer_text;

                    if ($question && in_array($question->answer_type, ['radio', 'select'])) {
                        $answerText = $a->option ? $a->option->option_text : '';
                    } elseif ($question && $question->answer_type === 'multiselect') {
                        if ($a->answer_text) {
                            $optionIds = json_decode($a->answer_text, true);
                            if (is_array($optionIds)) {
                                $options = $question->options()->findMany($optionIds);
                                $texts = $options->pluck('option_text')->toArray();
                                $answerText = implode(', ', $texts);
                            }
                        }
                    }

                    return [
                        'question' => $question->question_text ?? '',
                        'answer'   => $answerText ?? '',
                        'type'     => $question->answer_type ?? '',
                    ];
                }),
            ]
        ]);
    }
}
