<x-mail::message>
# Halo, {{ $nama }}

Selamat datang di **Portal PMB Online** kami!  
Kami senang Anda telah bergabung. Silakan login untuk melanjutkan proses pendaftaran.

<x-mail::button :url="route('login')">
Login Sekarang
</x-mail::button>

Salam hangat,<br>
**Tim PMB Online**
</x-mail::message>
