<?php

use Illuminate\Database\Seeder;

use \App\Psypizza\Product;
use \App\Psypizza\ProductCategory;

class Products extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('products')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $faker = \Faker\Factory::create();

        foreach (ProductCategory::all() as $category) {
            for ($i = 0; $i < 10; $i++) {
                $slug = $category->slug . str_pad($i + 1, 4, '0', STR_PAD_LEFT);
                list ($name, $description) = explode('|', static::randomUniquePizza());

                Product::create([
                    'category_id' => $category->id,

                    'slug' => $slug,
                    'name' => $name,
                    'description' => $description,
                    'price' => $faker->randomNumber(2),
                        
                    'in_stock' => true,
                    'is_published' => true,

                    'sku' => strtoupper($slug),
                    'ean13' => $faker->unique()->ean13,
                ]);
            }
        }
    }

    public static $pizza = [
        'Margherita|Tomato sauce, mozzarella, and oregano',
        'Marinara|Tomato sauce, garlic and basil',
        'Quattro Stagioni|Tomato sauce, mozzarella, mushrooms, ham, artichokes, olives, and oregano',
        'Carbonara|Tomato sauce, mozzarella, parmesan, eggs, and bacon',
        'Frutti di Mare|Tomato sauce and seafood',
        'Quattro Formaggi|Tomato sauce, mozzarella, parmesan, gorgonzola cheese, artichokes, and oregano',
        'Crudo|Tomato sauce, mozzarella and Parma ham',
        'Napoletana or Napoli|Tomato sauce, mozzarella, oregano, anchovies',
        'Pugliese|Tomato sauce, mozzarella, oregano, and onions',
        'Montanara|Tomato sauce, mozzarella, mushrooms, pepperoni, and Stracchino (soft cheese)',
        'Emiliana|Tomato sauce, mozzarella, eggplant, boiled potatoes, and sausage',
        'Romana|Tomato sauce, mozzarella, anchovies, capers, and oregano',
        'Fattoria|Tomato sauce, mozzarella, peppers, peas, porchetta (Italian spit-roasted pork)',
        'Schiacciata|Olive oil and rosemary',
        'Prosciutto or Cardinale|Tomato sauce, mozzarella, ham, and oregano',
        'Americana|Tomato sauce, mozzarella, sausage and french fries',
        'Prosciutto e Funghi|Tomato sauce, mozzarella, ham, and mushrooms',
        'Braccio di Ferro|Mozzarella, spinach, ricotta cheese, and parmesan',
        'Sarda|Tomato sauce, mozzarella, pecorino cheese, and spicy salami',
        'Tonno|Tomato sauce, mozzarella, tuna, and onions',
        'Valtellina|Tomato sauce, mozzarella, bresaola, Parmesan flakes and rocket',
        'Gorgonzola|Tomato sauce, mozzarella, gorgonzola, and olives',
        'Calzone (folded pizza)|Tomato sauce, mozzarella, ham, mushrooms, artichokes, anchovies, and oregano.',
        'Pizza al Pesto|Tomato, mozzarella, Genoese pesto, pine nuts, and olives',
        'Mediterranea|Tomato sauce, buffalo mozzarella, cherry tomatoes and pepper',
        'Ortolana|Tomato sauce, mozzarella, and assorted vegetables',
        'Diavola|Tomato sauce, mozzarella, spicy salami, and chilli pepper',
        'Rustica|Tomato sauce, mozzarella, gorgonzola cheese, and eggplants',
        'Contadina|Tomato sauce, mozzarella, asparagus, mushrooms, bacon, and parmesan.',
        'Parmigiana|Tomato sauce, mozzarella, eggplants and parmesan flakes',
        'Capricciosa|Tomato sauce, mozzarella, ham, artichokes, mushrooms, and olives',
        'Ricotta e Spinaci|Tomato sauce, mozzarella, ricotta cheese, and spinach.',
        'Mare e Monti|Mozzarella, tomato sauce, seafood and porcino mushrooms',
        'Padana|Tomato sauce, parmesan cheese, salami, zucchini, and polenta (boiled cornmeal)',
        'Tedesca|Tomato sauce, mozzarella, and Vienna Sausage.',
        'Tirolese|Tomato sauce, mozzarella, gorgonzola cheese and speck',
        'Boscaiola|Tomato sauce, mozzarella, porcino mushrooms and bacon',
        'Campagnola|Tomato sauce, mozzarella, corn and sausage',
        'Vegetariana|Tomato sauce, mozzarella and a various vegetable',
        'Bufalina|Tomato sauce, Buffalo mozzarella, and oregano',
        'Fontana|Tomato sauce, mozzarella, gorgonzola cheese, radicchio, and parmesan',
        'Francescana|Tomato sauce, mozzarella, porcino mushrooms, ham, and parmesan',
        'Pizza tartufata|Mozzarella, truffle cream, and porcini mushrooms',
        'Tricolore|Mozzarella, bresaola, and parmesan flakes',
        'Valdostana|Tomato sauce, mozzarella, fontina cheese and bacon',
        'Caprese|Mozzarella and sliced ​​tomato',
        'Fiori di zucca|Mozzarella, courgette flower, anchovies and olive oil',
        'Bismarck|Tomato sauce, mozzarella, ham, and fried egg',
        'Funghi|Tomato sauce, mozzarella, mushrooms, parsley and olive oil',
        'Mimosa|Mozzarella, cream, ham and corn',
    ];

    public static function randomUniquePizza() : string
    {
        static $stack;
        $count = count(static::$pizza);

        if (!$stack) {
            for ($i = 0; $i < $count; $i++) {
                $stack[$i] = $i;
            }
            shuffle($stack);
        }

        if (count($stack) <= 0) {
            return null;
        }

        return static::$pizza[array_pop($stack)];
    }
}
