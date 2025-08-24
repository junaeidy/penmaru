<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Setting;
use Carbon\Carbon;

class CheckRegistrationPeriod
{
    public function handle(Request $request, Closure $next)
    {
        $setting = Setting::first();
        if ($setting) {
            $now = Carbon::now();

            if ($now->lt(Carbon::parse($setting->registration_start)) || 
                $now->gt(Carbon::parse($setting->registration_end))) {
                return back()->with(['error' => 'Masa pendaftaran sudah habis, Silahkan tunggu periode berikutnya']);
            }
        }

        return $next($request);
    }
}
