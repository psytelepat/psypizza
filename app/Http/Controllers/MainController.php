<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index(Request $request)
    {
        return view('index');
    }

    public function order(Request $request, int $id, string $token = null)
    {
    }
}
