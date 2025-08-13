<x-mail::message>
# Halo, {{ $nama }}

Terima kasih telah mengisi formulir pendaftaran calon mahasiswa. <br>
Data pendaftaran Anda telah berhasil kami terima dan sedang menunggu verifikasi.<br>
Kami akan menghubungi Anda melalui email ini jika ada informasi lanjutan.

<x-mail::button :url="route('login')">
Login Sekarang
</x-mail::button>

Salam hangat,<br>
**Tim PMB Online**
</x-mail::message>
