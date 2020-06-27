<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'category_id' => $this->category->id,
            'name' => $this->name,
            'is_published' => $this->is_published,
            'in_stock' => $this->in_stock,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
        ];
    }
}
