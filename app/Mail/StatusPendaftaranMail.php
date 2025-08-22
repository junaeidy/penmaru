<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StatusPendaftaranMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nama;
    public $status;

    public function __construct($nama, $status)
    {
        $this->nama   = $nama;
        $this->status = $status;
    }

    public function build()
    {
        return $this->subject('Status Pendaftaran PMB Online')
                    ->markdown('emails.status_pendaftaran');
    }
}
