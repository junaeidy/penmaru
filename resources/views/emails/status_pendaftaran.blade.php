<x-mail::message>
# Halo, {{ $nama }}

Status pendaftaran Anda telah **{{ strtoupper($status) }}**.

@if ($status === 'diterima')
Selamat! Anda dinyatakan **DITERIMA** pada seleksi penerimaan mahasiswa baru.  
Silakan login untuk melihat informasi selanjutnya.
@else
Mohon maaf, pendaftaran Anda **DITOLAK**.  
Anda dapat menghubungi panitia untuk informasi lebih lanjut.
@endif

<x-mail::button :url="route('login')">
Login
</x-mail::button>

Salam hangat,  
**Tim PMB Online**
</x-mail::message>
