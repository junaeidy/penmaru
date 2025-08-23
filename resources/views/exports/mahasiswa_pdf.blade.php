<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Data Calon Mahasiswa</title>
    <style>
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h3>Data Calon Mahasiswa</h3>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nomor Pendaftaran</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Jenis Kelamin</th>
                <th>Tempat, Tgl Lahir</th>
                <th>Agama</th>
                <th>No HP</th>
                <th>Nama Sekolah</th>
                <th>Jurusan</th>
                <th>Tahun Lulus</th>
                <th>Fakultas</th>
                <th>Prodi</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($mahasiswa as $i => $m)
                <tr>
                    <td>{{ $i+1 }}</td>
                    <td>{{ $m->nomor_pendaftaran }}</td>
                    <td>{{ $m->user->name ?? '' }}</td>
                    <td>{{ $m->user->email ?? '' }}</td>
                    <td>{{ $m->jenis_kelamin }}</td>
                    <td>{{ $m->tempat_lahir }}, {{ $m->tanggal_lahir }}</td>
                    <td>{{ $m->agama }}</td>
                    <td>{{ $m->no_hp }}</td>
                    <td>{{ $m->nama_sekolah }}</td>
                    <td>{{ $m->jurusan }}</td>
                    <td>{{ $m->tahun_lulus }}</td>
                    <td>{{ $m->fakultas->nama ?? '' }}</td>
                    <td>{{ $m->programStudi->nama ?? '' }}</td>
                    <td>{{ $m->status_pendaftaran }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
