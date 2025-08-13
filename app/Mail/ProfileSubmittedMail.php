<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProfileSubmittedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nama;

    /**
     * Create a new message instance.
     */
    public function __construct($nama)
    {
        $this->nama = $nama;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Konfirmasi Pengiriman Data Pendaftaran')
                    ->markdown('emails.profile_submitted')
                    ->with([
                        'nama' => $this->nama,
                    ]);
    }
}
