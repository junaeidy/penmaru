<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Baris Bahasa Validasi
    |--------------------------------------------------------------------------
    |
    | Baris bahasa berikut berisi pesan kesalahan default yang digunakan oleh
    | kelas validator. Beberapa aturan memiliki beberapa versi seperti aturan
    | size. Silakan sesuaikan sesuai kebutuhan aplikasi Anda.
    |
    */

    'accepted'             => ':attribute harus diterima.',
    'accepted_if'          => ':attribute harus diterima ketika :other bernilai :value.',
    'active_url'           => ':attribute bukan URL yang valid.',
    'after'                => ':attribute harus tanggal setelah :date.',
    'after_or_equal'       => ':attribute harus tanggal setelah atau sama dengan :date.',
    'alpha'                => ':attribute hanya boleh berisi huruf.',
    'alpha_dash'           => ':attribute hanya boleh berisi huruf, angka, strip, dan garis bawah.',
    'alpha_num'            => ':attribute hanya boleh berisi huruf dan angka.',
    'array'                => ':attribute harus berupa array.',
    'before'               => ':attribute harus tanggal sebelum :date.',
    'before_or_equal'      => ':attribute harus tanggal sebelum atau sama dengan :date.',
    'between'              => [
        'array'   => ':attribute harus memiliki antara :min dan :max item.',
        'file'    => ':attribute harus antara :min dan :max kilobyte.',
        'numeric' => ':attribute harus antara :min dan :max.',
        'string'  => ':attribute harus antara :min dan :max karakter.',
    ],
    'boolean'              => ':attribute harus bernilai benar atau salah.',
    'confirmed'            => 'Konfirmasi :attribute tidak cocok.',
    'current_password'     => 'Password tidak sesuai.',
    'date'                 => ':attribute bukan tanggal yang valid.',
    'date_equals'          => ':attribute harus berupa tanggal yang sama dengan :date.',
    'date_format'          => ':attribute tidak cocok dengan format :format.',
    'declined'             => ':attribute harus ditolak.',
    'declined_if'          => ':attribute harus ditolak ketika :other bernilai :value.',
    'different'            => ':attribute dan :other harus berbeda.',
    'digits'               => ':attribute harus berupa :digits digit.',
    'digits_between'       => ':attribute harus antara :min dan :max digit.',
    'dimensions'           => ':attribute memiliki dimensi gambar yang tidak valid.',
    'distinct'             => ':attribute memiliki nilai yang duplikat.',
    'email'                => ':attribute harus alamat email yang valid.',
    'ends_with'            => ':attribute harus diakhiri dengan salah satu dari: :values.',
    'enum'                 => ':attribute yang dipilih tidak valid.',
    'exists'               => ':attribute yang dipilih tidak valid.',
    'file'                 => ':attribute harus berupa berkas.',
    'filled'               => ':attribute wajib diisi.',
    'gt'                   => [
        'array'   => ':attribute harus memiliki lebih dari :value item.',
        'file'    => ':attribute harus lebih besar dari :value kilobyte.',
        'numeric' => ':attribute harus lebih besar dari :value.',
        'string'  => ':attribute harus lebih besar dari :value karakter.',
    ],
    'gte'                  => [
        'array'   => ':attribute harus memiliki :value item atau lebih.',
        'file'    => ':attribute harus lebih besar atau sama dengan :value kilobyte.',
        'numeric' => ':attribute harus lebih besar atau sama dengan :value.',
        'string'  => ':attribute harus lebih besar atau sama dengan :value karakter.',
    ],
    'image'                => ':attribute harus berupa gambar.',
    'in'                   => ':attribute yang dipilih tidak valid.',
    'in_array'             => ':attribute tidak ada dalam :other.',
    'integer'              => ':attribute harus berupa bilangan bulat.',
    'ip'                   => ':attribute harus alamat IP yang valid.',
    'ipv4'                 => ':attribute harus alamat IPv4 yang valid.',
    'ipv6'                 => ':attribute harus alamat IPv6 yang valid.',
    'json'                 => ':attribute harus berupa JSON string yang valid.',
    'lt'                   => [
        'array'   => ':attribute harus memiliki kurang dari :value item.',
        'file'    => ':attribute harus kurang dari :value kilobyte.',
        'numeric' => ':attribute harus kurang dari :value.',
        'string'  => ':attribute harus kurang dari :value karakter.',
    ],
    'lte'                  => [
        'array'   => ':attribute tidak boleh lebih dari :value item.',
        'file'    => ':attribute harus kurang dari atau sama dengan :value kilobyte.',
        'numeric' => ':attribute harus kurang dari atau sama dengan :value.',
        'string'  => ':attribute harus kurang dari atau sama dengan :value karakter.',
    ],
    'mac_address'          => ':attribute harus berupa alamat MAC yang valid.',
    'max'                  => [
        'array'   => ':attribute tidak boleh lebih dari :max item.',
        'file'    => ':attribute tidak boleh lebih dari :max kilobyte.',
        'numeric' => ':attribute tidak boleh lebih dari :max.',
        'string'  => ':attribute tidak boleh lebih dari :max karakter.',
    ],
    'mimes'                => ':attribute harus berupa file dengan tipe: :values.',
    'mimetypes'            => ':attribute harus berupa file dengan tipe: :values.',
    'min'                  => [
        'array'   => ':attribute harus memiliki setidaknya :min item.',
        'file'    => ':attribute harus setidaknya :min kilobyte.',
        'numeric' => ':attribute harus setidaknya :min.',
        'string'  => ':attribute harus setidaknya :min karakter.',
    ],
    'multiple_of'          => ':attribute harus kelipatan dari :value.',
    'not_in'               => ':attribute yang dipilih tidak valid.',
    'not_regex'            => 'Format :attribute tidak valid.',
    'numeric'              => ':attribute harus berupa angka.',
    'password'             => 'Password salah.',
    'present'              => ':attribute harus ada.',
    'prohibited'           => ':attribute dilarang.',
    'prohibited_if'        => ':attribute dilarang ketika :other bernilai :value.',
    'prohibited_unless'    => ':attribute dilarang kecuali :other berada dalam :values.',
    'prohibits'            => ':attribute melarang :other hadir.',
    'regex'                => 'Format :attribute tidak valid.',
    'required'             => ':attribute wajib diisi.',
    'required_array_keys'  => ':attribute harus memiliki entri untuk: :values.',
    'required_if'          => ':attribute wajib diisi ketika :other bernilai :value.',
    'required_unless'      => ':attribute wajib diisi kecuali :other ada dalam :values.',
    'required_with'        => ':attribute wajib diisi ketika :values ada.',
    'required_with_all'    => ':attribute wajib diisi ketika :values ada.',
    'required_without'     => ':attribute wajib diisi ketika :values tidak ada.',
    'required_without_all' => ':attribute wajib diisi ketika tidak ada :values yang ada.',
    'same'                 => ':attribute dan :other harus sama.',
    'size'                 => [
        'array'   => ':attribute harus mengandung :size item.',
        'file'    => ':attribute harus :size kilobyte.',
        'numeric' => ':attribute harus :size.',
        'string'  => ':attribute harus :size karakter.',
    ],
    'starts_with'          => ':attribute harus dimulai dengan salah satu dari: :values.',
    'string'               => ':attribute harus berupa teks.',
    'timezone'             => ':attribute harus berupa zona waktu yang valid.',
    'unique'               => ':attribute sudah digunakan.',
    'uploaded'             => ':attribute gagal diunggah.',
    'url'                  => ':attribute harus berupa URL yang valid.',
    'uuid'                 => ':attribute harus berupa UUID yang valid.',

    /*
    |--------------------------------------------------------------------------
    | Kustom Pesan Validasi
    |--------------------------------------------------------------------------
    |
    | Anda dapat menentukan pesan kustom untuk atribut menggunakan konvensi
    | "attribute.rule" untuk memberi nama baris. Ini memudahkan untuk membuat
    | pesan tertentu untuk aturan atribut tertentu.
    |
    */

    'custom' => [
        'email' => [
            'required' => 'Alamat email wajib diisi.',
            'lowercase' => 'Alamat email harus menggunakan huruf kecil.',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Atribut Validasi Kustom
    |--------------------------------------------------------------------------
    |
    | Baris berikut digunakan untuk mengganti placeholder atribut dengan
    | sesuatu yang lebih ramah pembaca, seperti "Alamat Email" daripada "email".
    |
    */

    'attributes' => [],

];
