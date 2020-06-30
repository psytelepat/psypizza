<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        if (!auth()->user()->is_admin) {
            return abort('403');
        }

        return view('admin');
    }
}
