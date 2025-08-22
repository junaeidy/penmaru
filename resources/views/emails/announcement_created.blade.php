<x-mail::message>
# Halo, {{ $user->name }}

Ada pengumuman baru yang telah diterbitkan. Silakan cek pengumuman terbaru di dashboard kamu.

<x-mail::panel>
Diterbitkan pada: {{ \Carbon\Carbon::parse($announcement->published_at)->format('d M Y H:i') }}
</x-mail::panel>

<x-mail::button :url="route('dashboard')">
Lihat di Dashboard
</x-mail::button>

Terima kasih,<br>
**Tim PMB Online**
</x-mail::message>
