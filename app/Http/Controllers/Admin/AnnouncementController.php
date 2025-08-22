<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\AnnouncementCreatedMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::latest()->paginate(10);

        return Inertia::render('Admin/Announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Announcements/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ],[
            'title.required' => 'Judul harus diisi.',
            'title.max'      => 'Judul tidak boleh lebih dari 255 karakter.',
            'content.required' => 'Konten harus diisi.',
        ]);

        $announcement = Announcement::create([
            'title'        => $request->title,
            'content'      => $request->content,
            'published_at' => now(),
        ]);

        $mahasiswa = User::where('role', 'mahasiswa')->get();
        foreach ($mahasiswa as $user) {
            Mail::to($user->email)->queue(new AnnouncementCreatedMail($announcement, $user));
        }

        return redirect()->route('admin.announcements.index')
                         ->with(['success' => 'Pengumuman berhasil dibuat.']);
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()->route('admin.announcements.index')
                         ->with(['success' => 'Pengumuman berhasil dihapus.']);
    }
}
