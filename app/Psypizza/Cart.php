<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use Illuminate\Database\Eloquent\SoftDeletes;

use \App\Psypizza\CartProduct;
use \App\Psypizza\Promocode;
use \App\Psypizza\Order;
use \App\Psypizza\Currency;
use \App\Psypizza\DeliveryMethod;

class Cart extends Model
{
    use SoftDeletes;

    public $table = 'carts';
    protected $fillable = [
        'order_id',
        'user_id',

        'currency',
        'exchange_rate',

        'promocode_id',

        'original_products_cost',
        'products_discount',
        'produducts_cost',

        'delivery_method_id',
        'delivery_price',

        'original_cost',
        'discount',
        'cost',
    ];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(CartProduct::class);
    }

    public function promocode()
    {
        return $this->belongsTo(Promocode::class);
    }

    public function deliveryMethod()
    {
        return $this->belongsTo(DeliveryMethod::class);
    }

    public static function instance($recreate = false) : self
    {
        static $cart;

        if ($recreate) {
            if (!$cart && $cart_id = session('cart_id', null)) {
                $cart = self::find($cart_id);
            }

            if ($cart) {
                $cart->delete();
                $cart = null;
            }

            $cart = self::newCart();
            session(['cart_id' => $cart->id]);
            return $cart;
        }

        if (!$cart && ($cart_id = session('cart_id'))) {
            $cart = self::find($cart_id);
        }

        if (!$cart) {
            $cart = self::newCart();
            session(['cart_id' => $cart->id]);
            session()->save();
        }

        return $cart;
    }

    protected static function newCart() : self
    {
        $cart = new self;

        $cart->currency = Currency::BASE_CURRENCY;
        $cart->exchange_rate = 1;

        $cart->delivery_method_id = DeliveryMethod::first()->id;
        $cart->delivery_price = 0;

        $cart->original_products_cost = 0;
        $cart->products_discount = 0;
        $cart->products_cost = 0;

        $cart->original_cost = 0;
        $cart->discount = 0;
        $cart->cost = 0;

        $cart->save();

        self::recalc($cart);

        return $cart;
    }

    public static function recalc(Cart $cart = null): self
    {
        $cart = $cart ?? self::instance();

        $original_products_cost = 0;
        $products_cost = 0;
        foreach ($cart->products as $cartProduct) {
            static::recalcCartProduct($cartProduct, $cart);
            $original_products_cost += $cartProduct->original_cost;
            $products_cost += $cartProduct->cost;
        }

        $cart->original_products_cost = $original_products_cost;
        $cart->products_cost = $products_cost;
        $cart->products_discount = $original_products_cost - $products_cost;

        $cart->original_cost = $cart->original_products_cost + $cart->delivery_price;
        $cart->cost = $cart->products_cost + round($cart->delivery_price * $cart->exchange_rate, 2, PHP_ROUND_HALF_UP);
        $cart->discount = $cart->original_cost - $cart->cost;

        $cart->save();

        return $cart;
    }

    public static function setPromocode(Promocode $promocode): self
    {
        if (!$promocode->trashed() && $promocode->is_available) {
            $cart = self::instance();
            $cart->promocode_id = $promocode->id;
            $cart->save();
        }

        return self::recalc();
    }

    public static function removePromocode(): self
    {
        $cart = self::instance();
        $cart->promocode_id = null;
        $cart->save();

        return self::recalc();
    }

    public static function recalcCartProduct(CartProduct &$cartProduct, Cart &$cart) : void
    {
        $cartProduct->price = round($cartProduct->original_price * $cart->exchange_rate, 2, PHP_ROUND_HALF_UP);
        if ($cart->promocode) {
            $cartProduct->price = round($cartProduct->price * ((100 - $cart->promocode->discount) / 100), 2, PHP_ROUND_HALF_UP);
        }
        $cartProduct->cost = round($cartProduct->price * $cartProduct->amount, 2, PHP_ROUND_HALF_UP);
        $cartProduct->discount = $cartProduct->original_cost - $cartProduct->cost;
        $cartProduct->save();
    }

    public static function setProduct(int $id, int $amount): self
    {
        if ($amount < 1) {
            return removeProduct($id);
        }

        $cart = self::instance();
        $product = \App\Psypizza\Product::findOrFail($id);

        if (!($cartProduct = $cart->products()->where('product_id', $product->id)->first())) {
            $cartProduct = new CartProduct();
            $cartProduct->cart_id = $cart->id;
            $cartProduct->product_id = $product->id;
            $cartProduct->original_price = $product->price;
        }

        $cartProduct->amount = $amount;
        $cartProduct->original_cost = $cartProduct->original_price * $amount;

        static::recalcCartProduct($cartProduct, $cart);

        return self::recalc();
    }

    public static function setCurrency(string $currency): self
    {
        if (in_array($currency, Currency::$currencies)) {
            $exchange_rate = \App\Psypizza\Currency::getExchangeRateFor($currency);
            $cart = self::instance();
            $cart->currency = $currency;
            $cart->exchange_rate = $exchange_rate;

            return self::recalc();
        } else {
            throw new \InvalidArgumentException('Invalid currency');
        }
    }

    public static function setDeliveryMethod(DeliveryMethod $deliveryMethod): self
    {
        $cart = self::instance();
        $cart->delivery_method_id = $deliveryMethod->id;
        $cart->delivery_price = $deliveryMethod->price;
        $cart->save();

        return self::recalc();
    }

    public static function removeProduct(int $id): self
    {
        $cart = self::instance();
        if ($cartProduct = CartProduct::where('cart_id', $cart->id)->where('product_id', $id)->first()) {
            $cartProduct->delete();
        }
        return self::recalc();
    }

    public static function hasProduct(int $id): ?CartProduct
    {
        $cart = static::instance();
        return $cartProduct = $cart->products()->where('product_id', $id)->first();
    }
}
