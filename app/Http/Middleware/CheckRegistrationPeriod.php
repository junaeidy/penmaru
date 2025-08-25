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
        $registrationStart = Setting::getValue('registration_start');
        $registrationEnd   = Setting::getValue('registration_end');

        if ($registrationStart && $registrationEnd) {
            $now   = Carbon::now();
            $start = Carbon::parse($registrationStart)->startOfDay();
            $end   = Carbon::parse($registrationEnd)->endOfDay();

            if ($now->lt($start) || $now->gt($end)) {
                return redirect()->route('home')
                    ->with('error', 'Masa pendaftaran sudah berakhir, silahkan tunggu periode berikutnya.');
            }
        }

        return $next($request);
    }
}

