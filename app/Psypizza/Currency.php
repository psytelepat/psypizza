<?php

namespace App\Psypizza;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Arr;

use \App\Psypizza\Cart;

class Currency
{
    public const BASE_CURRENCY = 'EUR';
    public static $currencies = [
        'EUR',
        'USD',
        'RUB',
    ];

    protected static function getExchangeRates(): array
    {
        if ($response = file_get_contents('https://api.exchangeratesapi.io/latest?base=' . self::BASE_CURRENCY)) {
            $response = json_decode($response, true);
            if ($rates = Arr::get($response, 'rates')) {
                return $rates;
            }
        }
        throw new \Exception('Error retrieving currency rates');
    }

    public static function getExchangeRateFor(string $currency): float
    {
        if (in_array($currency, self::$currencies)) {
            if ($currency == self::BASE_CURRENCY) {
                return 1;
            }

            $exchange_rates = Cache::remember('exchange_rates', 3600, function () {
                return Currency::getExchangeRates();
            });
            
            if ($exchange_rate = Arr::get($exchange_rates, $currency)) {
                return $exchange_rate;
            } else {
                throw new \Exception("No value for {$currency}");
            }
        } else {
            throw new \InvalidArgumentException('Invalid $currency');
        }
    }

    public static function exchange(float $price, string $currency): float
    {
        return round($price * self::getExchangeRateFor($currency), 2, PHP_ROUND_HALF_UP);
    }
}
