<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMahasiswaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nama;

    public function __construct($nama)
    {
        $this->nama = $nama;
    }

    public function build()
    {
        return $this->subject('Selamat Datang di PMB Online')
                    ->markdown('emails.welcome_mahasiswa');
    }
}
