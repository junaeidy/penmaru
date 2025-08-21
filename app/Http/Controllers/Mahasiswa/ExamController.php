<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Exam;
use App\Models\ExamQuestion;
use Illuminate\Support\Facades\Auth;
use App\Mail\UjianSelesaiMail;
use Illuminate\Support\Facades\Mail;

class ExamController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->mahasiswaProfile->status_pendaftaran !== 'diverifikasi') {
            abort(403, 'Anda belum diverifikasi untuk mengikuti ujian.');
        }

        if ($user->mahasiswaProfile->status_pendaftaran === 'selesai ujian') {
            abort(403, 'Anda sudah menyelesaikan ujian dan tidak bisa mengakses ujian lagi.');
        }

        $exams = Exam::where('start_at', '<=', now())
            ->where('end_at', '>=', now())
            ->get();

        return Inertia::render('Mahasiswa/Exams/Index', [
            'exams' => $exams,
        ]);
    }

    public function start($examId)
    {
        $user = Auth::user();

        if ($user->mahasiswaProfile->status_pendaftaran === 'selesai ujian') {
            return redirect()->route('dashboard')->with([
                'error' => 'Anda sudah menyelesaikan ujian dan tidak bisa mengaksesnya lagi.'
            ]);
        }

        $exam = Exam::findOrFail($examId);

        $response = $exam->responses()->firstOrCreate(
            ['user_id' => $user->id],
            ['started_at' => now()]
        );

        return redirect()->route('mahasiswa.exams.show', $exam->id);
    }

    public function show($examId)
    {
        $user = Auth::user();

        if ($user->mahasiswaProfile->status_pendaftaran === 'selesai ujian') {
            return redirect()->route('dashboard')->with([
                'error' => 'Anda sudah menyelesaikan ujian dan tidak bisa mengaksesnya lagi.'
            ]);
        }

        $exam = Exam::with('questions.options')->findOrFail($examId);

        $response = $exam->responses()->where('user_id', $user->id)->first();
        $alreadySubmitted = $response && $response->finished_at ? true : false;

        return Inertia::render('Mahasiswa/Exams/Show', [
            'exam' => $exam,
            'response' => $response,
            'alreadySubmitted' => $alreadySubmitted,
        ]);
    }


    public function submit(Request $request, $examId)
    {
        $exam = Exam::findOrFail($examId);
        $user = Auth::user();

        $response = $exam->responses()->where('user_id', $user->id)->firstOrFail();

        if ($response->finished_at) {
            return redirect()->route('dashboard')->with([
                'error' => 'Anda sudah menyelesaikan ujian ini. Tidak bisa submit dua kali.'
            ]);
        }

        foreach ($request->answers as $questionId => $answer) {
            $question = ExamQuestion::find($questionId);

            if (!$question) {
                continue;
            }

            $dataToSave = [];
            if ($question->answer_type === 'text') {
                $dataToSave['answer_text'] = is_string($answer) ? $answer : null;
            } elseif (in_array($question->answer_type, ['radio', 'select'])) {
                $dataToSave['option_id'] = is_numeric($answer) ? $answer : null;
            } elseif ($question->answer_type === 'multiselect') {
                $dataToSave['answer_text'] = is_array($answer) ? json_encode($answer) : null;
            }

            $response->answers()->updateOrCreate(
                ['question_id' => $questionId],
                $dataToSave
            );
        }

        $response->update(['finished_at' => now()]);

        $user->mahasiswaProfile()->update([
            'status_pendaftaran' => 'selesai ujian'
        ]);

        Mail::to($user->email)->send(new UjianSelesaiMail($user));

        return redirect()->route('dashboard')->with(['success' => 'Jawaban berhasil disubmit!']);
    }

    public function accessForm($examId)
    {
        $user = Auth::user();

        if ($user->mahasiswaProfile->status_pendaftaran === 'selesai ujian') {
            return redirect()->route('dashboard')->with([
                'error' => 'Anda sudah menyelesaikan ujian dan tidak bisa mengaksesnya lagi.'
            ]);
        }

        $exam = Exam::findOrFail($examId);
        $response = $exam->responses()->where('user_id', $user->id)->first();
        $alreadySubmitted = $response && $response->finished_at ? true : false;

        return Inertia::render('Mahasiswa/Exams/AccessForm', [
            'exam' => $exam,
            'response' => $response,
            'alreadySubmitted' => $alreadySubmitted
        ]);
    }

    public function accessVerify(Request $request, $examId)
    {
        $request->validate([
            'nomor_pendaftaran' => 'required|string',
        ],[
            'nomor_pendaftaran.required' => 'Nomor pendaftaran harus diisi.',
            'nomor_pendaftaran.string' => 'Nomor pendaftaran harus berupa teks.',
            'nomor_pendaftaran.exists' => 'Nomor pendaftaran tidak valid.',
        ]);

        $user = Auth::user();
        $profile = $user->mahasiswaProfile;

        if (!$profile || $profile->nomor_pendaftaran !== $request->nomor_pendaftaran) {
            return back()->withErrors([
                'nomor_pendaftaran' => 'Nomor pendaftaran tidak valid.',
            ]);
        }

        return redirect()->route('mahasiswa.exams.start', $examId);
    }
}
