<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifikasiPendaftaranMail extends Mailable
{
    use Queueable, SerializesModels;

    public $status;
    public $catatan;
    public $nama;

    public function __construct($nama, $status, $catatan = null)
    {
        $this->status = $status;
        $this->catatan = $catatan;
        $this->nama = $nama;
    }

    public function build()
    {
        return $this
            ->subject('Status Verifikasi Pendaftaran')
            ->markdown('emails.verifikasi-pendaftaran');
    }
}
