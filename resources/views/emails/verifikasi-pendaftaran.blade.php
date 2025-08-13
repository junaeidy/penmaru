@component('mail::message')
# Halo, {{ $nama }}

@if($status === 'diverifikasi')
Terima kasih telah mengisi formulir pendaftaran calon mahasiswa. <br>
Data pendaftaran Anda **telah berhasil diverifikasi** oleh admin.  <br>
Silakan melanjutkan ke tahap pembayaran biaya pendaftaran.<br>

@component('mail::button', ['url' => route('login')])
Lanjutkan Pembayaran
@endcomponent

@elseif($status === 'draft')
Terima kasih telah mengisi formulir pendaftaran calon mahasiswa.  
Namun, data atau berkas Anda **belum sesuai**. Mohon perbaiki data berikut:

**Catatan Admin:**  
{{ $catatan ?? '-' }}

@component('mail::button', ['url' => route('login')])
Perbarui Data
@endcomponent
@endif

Salam hangat,  
**Tim PMB Online**
@endcomponent
