<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use Illuminate\Database\Eloquent\SoftDeletes;

use \App\Psypizza\CartProduct;
use \App\Psypizza\Promocode;
use \App\Psypizza\Order;

class Cart extends Model
{
    use SoftDeletes;

    public $table = 'carts';
    protected $fillable = [
        'order_id',
        'user_id',

        'promocode_id',

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

        $original_cost = 0;
        $cost = 0;
        foreach ($cart->products as $cartProduct) {
            static::recalcCartProduct($cartProduct, $cart);
            $original_cost += $cartProduct->original_cost;
            $cost += $cartProduct->cost;
        }

        $cart->original_cost = $original_cost;
        $cart->cost = $cost;
        $cart->discount = $original_cost - $cost;
        $cart->save();

        return $cart;
    }

    public static function setPromocode(Promocode $promocode)
    {
        if (!$promocode->trashed() && $promocode->is_available) {
            $cart = self::instance();
            $cart->promocode_id = $promocode->id;
            $cart->save();

            self::recalc();
        }
    }

    public static function recalcCartProduct(CartProduct &$cartProduct, Cart &$cart) : void
    {
        $cartProduct->price = $cartProduct->original_price;
        if ($cart->promocode) {
            $cartProduct->price = round($cartProduct->price * ($cart->promocode->discount / 100), 2, PHP_ROUND_HALF_UP);
        }
        $cartProduct->cost = round($cartProduct->price * $cartProduct->amount, 2, PHP_ROUND_HALF_UP);
        $cartProduct->discount = $cartProduct->original_cost - $cartProduct->cost;
        $cartProduct->save();
    }

    public static function setProduct(int $id, int $amount): self
    {
        if ($amount < 1) {
            throw new \InvalidArgumentException('$amount should be more than 0');
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
