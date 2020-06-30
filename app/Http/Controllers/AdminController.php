<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin');
    }

    public function login(Request $request)
    {
        switch ($request->getMethod()) {
            case 'GET':
                if (auth('api')->check() && auth('api')->user()->is_admin) {
                    return [
                        'message' => 'Good to go!',
                        'user' => auth('api')->user(),
                    ];
                } else {
                    return response()->json([ 'message' => 'Invalid token' ], 403);
                }
                break;
            case 'POST':
                $email = $request->input('email');
                $password = $request->input('password');
                if (Auth::attempt(['email' => $email, 'password' => $password ])) {
                    $token = Str::random(60);
                    auth()->user()->forceFill(['api_token' => hash('sha256', $token)])->save();
                    return [
                        'message' => 'Success!',
                        'token' => $token,
                        'user' => auth('api')->user(),
                    ];
                } else {
                    return response()->json([
                        'message' => 'Invalid credentials',
                        'email' => $email,
                        'password' => $password,
                    ], 403);
                }
                break;
        }
    }
}
