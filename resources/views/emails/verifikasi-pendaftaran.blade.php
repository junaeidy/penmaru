@component('mail::message')
# Halo, {{ $nama }}

@if($status === 'diverifikasi')
Terima kasih telah mengisi formulir pendaftaran calon mahasiswa. <br>
Data pendaftaran Anda sudah **telah berhasil diverifikasi** oleh Tim kami. <br>
Silakan menunggu informasi lebih lanjut terkait test ujian online. <br>

@component('mail::button', ['url' => route('login')])
Login
@endcomponent

@elseif($status === 'draft')
Terima kasih telah mengisi formulir pendaftaran calon mahasiswa.  
Namun, data atau berkas Anda **belum sesuai**. Mohon perbaiki data berikut:

**Catatan:**  
{{ $catatan ?? '-' }}

@component('mail::button', ['url' => route('login')])
Perbarui Data
@endcomponent
@endif

Salam hangat,  
**Tim PMB Online**
@endcomponent
