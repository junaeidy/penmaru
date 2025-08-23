<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\BankAccount;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        $bankAccounts = BankAccount::all();

        return inertia('Admin/Settings/Index', [
            'settings' => $settings,
            'bankAccounts' => $bankAccounts
        ]);
    }

    public function updateGeneral(Request $request)
    {
        $data = $request->validate([
            'app_logo' => 'nullable|image|max:2048',
            'academic_year' => 'required|string',
        ],[
            'app_logo.max' => 'Maksimal ukuran gambar adalah 2MB',
            'academic_year.required' => 'Tahun Akademik wajib diisi',
        ]);

        if ($request->hasFile('app_logo')) {
            $oldLogo = Setting::getValue('app_logo');

            $path = $request->file('app_logo')->store('logos', 'public');
            Setting::setValue('app_logo', $path);

            if ($oldLogo && \Storage::disk('public')->exists($oldLogo)) {
                \Storage::disk('public')->delete($oldLogo);
            }
        }
        
        Setting::setValue('academic_year', $data['academic_year']);

        return back();
    }

    public function updatePeriod(Request $request)
    {
        $data = $request->validate([
            'registration_start' => 'required|date',
            'registration_end'   => 'required|date|after:registration_start',
        ],[
            'registration_start.required' => 'Tanggal mulai wajib diisi',
            'registration_end.required' => 'Tanggal selesai wajib diisi',
            'registration_end.after' => 'Tanggal selesai harus setelah tanggal mulai',
        ]);

        Setting::setValue('registration_start', $data['registration_start']);
        Setting::setValue('registration_end', $data['registration_end']);

        return back();
    }

    public function updateRequirements(Request $request)
    {
        $data = $request->validate([
            'requirements' => 'required|array',
            'requirements.*' => 'string'
        ],[
            'requirements.*.required' => 'Syarat wajib diisi',
        ]);

        Setting::setValue('registration_requirements', json_encode($data['requirements']));

        return back();
    }

    public function storeBankAccount(Request $request)
    {
        $data = $request->validate([
            'bank_name' => 'required|string',
            'account_number' => 'required|string',
            'account_holder' => 'required|string',
        ],[
            'bank_name.required' => 'Nama bank wajib diisi',
            'account_number.required' => 'Nomor rekening wajib diisi',
            'account_holder.required' => 'Atas nama wajib diisi',
        ]);

        BankAccount::create($data);

        return back();
    }

    public function destroyBankAccount(BankAccount $bankAccount)
    {
        $bankAccount->delete();

        return back();
    }
}
