@php
use \App\Psypizza\Currency;
$cart = $order->cart;
$cur = $cart->currency;
@endphp

@component('mail::message')
# Order #{{$order->number}}


# Details
-- --
Number: **{{$order->number}}**  
Name: **{{$order->name}}**  
@if($order->surname)
Surname: **{{$order->surname}}**  
@endif
E-mail: **[{{$order->email}}](mailto:{{$order->email}})**  
Phone: **{{$order->phone}}**  
@if($order->address)
Address: **{{$order->address}}**
@endif


# Shopping list
-- --
@foreach($cart->products as $product)
**{{$product->product->name}}**  
*{{$product->product->description}}*  
{{$product->amount}} x {{Currency::format($product->price, $cur)}}  
@if($product->discount)
Discount: {{Currency::format($product->discount, $cur)}}  
@endif
= {{Currency::format($product->cost, $cur)}}  

@endforeach


# Total
-- --
Goods: {{Currency::format($cart->original_products_cost, $cur)}}  
@if($cart->promocode)
Promocode: {{$cart->promocode->code}} (-{{$cart->promocode->discount}}%)  
Goods (with discount): {{Currency::format($cart->products_cost, $cur)}}  
@endif
Delivery: {{Currency::format($cart->delivery_price, $cur)}} ({{$cart->deliveryMethod->name}})  
@if($cart->discount)
Discount: {{Currency::format($cart->discount, $cur)}}  
@endif

Total: **{{Currency::format($cart->cost, $cur)}}**


@component('mail::button', ['url' => url('/orders/' . $order->id . '/' . $order->token), 'color' => 'success'])
View order
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
