<?php

namespace App\Exports;

use App\Models\MahasiswaProfile;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MahasiswaExport implements FromCollection, WithHeadings
{
    protected $status;
    protected $prodi;
    protected $tahun;

    public function __construct($status = null, $prodi = null, $tahun = null)
    {
        $this->status = $status;
        $this->prodi  = $prodi;
        $this->tahun  = $tahun;
    }

    public function collection()
    {
        return MahasiswaProfile::with(['user', 'fakultas', 'programStudi'])
            ->when($this->status, fn($q) => $q->where('status_pendaftaran', $this->status))
            ->when($this->prodi, fn($q) => $q->where('program_studi_id', $this->prodi))
            ->when($this->tahun, fn($q) => $q->where('tahun_lulus', $this->tahun))
            ->get()
            ->map(function ($m) {
                return [
                    'Nomor Pendaftaran' => $m->nomor_pendaftaran,
                    'Nama' => $m->user->name ?? '',
                    'Email' => $m->user->email ?? '',
                    'Jenis Kelamin' => $m->jenis_kelamin,
                    'Tempat Lahir' => $m->tempat_lahir,
                    'Tanggal Lahir' => $m->tanggal_lahir,
                    'Agama' => $m->agama,
                    'No HP' => $m->no_hp,
                    'Alamat' => $m->alamat,
                    'Nama Sekolah' => $m->nama_sekolah,
                    'Jurusan' => $m->jurusan,
                    'Tahun Lulus' => $m->tahun_lulus,
                    'Fakultas' => $m->fakultas->nama ?? '',
                    'Program Studi' => $m->programStudi->nama ?? '',
                    'Status' => $m->status_pendaftaran,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Nomor Pendaftaran',
            'Nama',
            'Email',
            'Jenis Kelamin',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Agama',
            'No HP',
            'Alamat',
            'Nama Sekolah',
            'Jurusan',
            'Tahun Lulus',
            'Fakultas',
            'Program Studi',
            'Status',
        ];
    }
}
