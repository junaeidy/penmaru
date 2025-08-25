<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Mail\WelcomeMahasiswaMail;
use Illuminate\Support\Facades\Mail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'nik' => [
                'required',
                'digits:16',
                'unique:users',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:users',
            ],
            'password' => [
                'required',
                'confirmed',
                Rules\Password::defaults(),
            ],
        ], [
            'nik.required' => 'NIK wajib di isi.',
            'nik.digits' => 'NIK harus terdiri dari 16 digit angka.',
            'nik.unique' => 'NIK ini sudah terdaftar di sistem.',
            'name.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah digunakan.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
        ]);

        $sanitizedData = [];
        
        $sanitizedData['nik'] = preg_replace('/[^0-9]/', '', $validatedData['nik']);

        $sanitizedData['name'] = strip_tags($validatedData['name']);
        $sanitizedData['name'] = htmlspecialchars($sanitizedData['name'], ENT_QUOTES, 'UTF-8');
        
        $sanitizedData['email'] = filter_var($validatedData['email'], FILTER_SANITIZE_EMAIL);
        $sanitizedData['email'] = htmlspecialchars($sanitizedData['email'], ENT_QUOTES, 'UTF-8');

        $user = User::create([
            'nik' => $sanitizedData['nik'],
            'name' => $sanitizedData['name'],
            'email' => $sanitizedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        Mail::to($user->email)->send(new WelcomeMahasiswaMail($user->name));
        
        event(new Registered($user));

        return redirect()
            ->route('login')
            ->with(['success'=> 'Pendaftaran berhasil! Silakan verifikasi email anda untuk menggunakan akun Anda.']);
    }
}