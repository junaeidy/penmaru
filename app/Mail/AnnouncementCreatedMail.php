<?php

namespace App\Mail;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnnouncementCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $announcement;
    public $user;

    public function __construct(Announcement $announcement, User $user)
    {
        $this->announcement = $announcement;
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject("Pemberitahuan Pengumuman Baru")
                    ->markdown('emails.announcement_created');
    }
}
