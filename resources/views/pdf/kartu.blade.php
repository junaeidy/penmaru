<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kartu Pendaftaran</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            background: #f9fafb;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            border-radius: 12px;
            border: 2px solid #e5e7eb;
            background: #fff;
            padding: 20px;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-table td {
            vertical-align: top;
            padding: 0;
        }
        .logo {
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-right: 20px;
        }
        .title h1 {
            font-size: 20px;
            font-weight: bold;
            margin: 0;
            color: #1f2937;
        }
        .title h2 {
            font-size: 18px;
            font-weight: bold;
            margin: 2px 0;
            color: #1f2937;
        }
        .title p {
            font-size: 12px;
            color: #2563eb;
            font-style: italic;
            margin-top: 4px;
            margin-bottom: 8px;
        }
        .info div {
            font-size: 11px;
            color: #4b5563;
        }
        .info-table {
            border-collapse: collapse;
            font-size: 11px;
        }
        .info-table td {
            padding: 0;
        }

        /* Divider */
        .divider {
            margin: 15px 0;
            border-top: 1px solid #d1d5db;
        }

        .body-table {
            width: 100%;
            border-collapse: collapse;
        }
        .body-table td {
            vertical-align: top;
            padding: 0;
        }
        
        .foto-box {
            border: 2px solid #3b82f6;
            border-radius: 8px;
            width: 150px;
            height: 200px;
            overflow: hidden;
        }
        .foto-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }
        .data-table .label {
            font-weight: bold;
            color: #f97316;
            width: 150px;
            padding: 4px 0;
            text-align: left;
        }
        .data-table .separator {
            width: 15px;
            font-weight: bold;
            text-align: center;
            padding: 4px 0;
        }
        .data-table .value {
            font-weight: bold;
            color: #374151;
            padding: 4px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        {{-- Header dengan Tabel --}}
        <table class="header-table">
            <tr>
                <td style="width: 120px;">
                    <img src="{{ public_path('logo.png') }}" alt="Logo" class="logo">
                </td>
                <td>
                    <div class="title">
                        <h1>STAI Al-Hikmah Pariangan</h1>
                        <h2>Batusangkar</h2>
                        <p>"Lembaga pendidikan tinggi Islam yang berkomitmen mencetak generasi unggul"</p>
                        <table class="info-table">
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>info@staialhikmahpariangan.ac.id</td>
                            </tr>
                            <tr>
                                <td>Web</td>
                                <td>:</td>
                                <td>staialhikmahpariangan.ac.id</td>
                            </tr>
                            <tr>
                                <td>No HP</td>
                                <td>:</td>
                                <td>+62 853-7938-8533</td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>

        <div class="divider"></div>

        {{-- Body dengan Tabel --}}
        <table class="body-table">
            <tr>
                <td style="width: 170px; padding-right: 20px;">
                    <div class="foto-box">
                        @if($profile->pas_foto)
                            <img src="{{ public_path('storage/'.$profile->pas_foto) }}" alt="Foto Mahasiswa">
                        @else
                            <img src="{{ public_path('placeholder.png') }}" alt="Foto Placeholder">
                        @endif
                    </div>
                </td>
                <td>
                    <div class="data">
                        <table class="data-table">
                            <tr>
                                <td class="label">Nomor Registrasi</td>
                                <td class="separator">:</td>
                                <td class="value"> {{ $profile->nomor_pendaftaran ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td class="label">Fakultas</td>
                                <td class="separator">:</td>
                                <td class="value"> {{ $profile->fakultas->nama ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td class="label">Program Studi</td>
                                <td class="separator">:</td>
                                <td class="value"> {{ $profile->programStudi->nama ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td class="label">Nama</td>
                                <td class="separator">:</td>
                                <td class="value"> {{ auth()->user()->name }}</td>
                            </tr>
                            <tr>
                                <td class="label">Tanggal Lahir</td>
                                <td class="separator">:</td>
                                <td class="value">
                                    @if($profile->tanggal_lahir)
                                        {{ \Carbon\Carbon::parse($profile->tanggal_lahir)->format('d-m-Y') }}
                                    @else
                                        -
                                    @endif
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Alamat</td>
                                <td class="separator">:</td>
                                <td class="value"> {{ $profile->alamat ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td class="label">No HP/Whatsapp</td>
                                <td class="separator">:</td>
                                <td class="value"> {{ $profile->no_hp ?? '-' }}</td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>