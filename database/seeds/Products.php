<?php

use Illuminate\Database\Seeder;

use \App\Psypizza\Product;
use \App\Psypizza\ProductCategory;

use Illuminate\Http\UploadedFile;

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

        Storage::disk('public')->deleteDirectory('products');

        $faker = \Faker\Factory::create();

        foreach (ProductCategory::all() as $category) {
            $numberOfProducts = 8;
            switch ($category->slug) {
                case 'pizza':
                    $numberOfProducts = 24;
                    break;
            }

            for ($i = 0; $i < $numberOfProducts; $i++) {
                $slug = $category->slug . str_pad($i + 1, 4, '0', STR_PAD_LEFT);
                list ($name, $description) = explode('|', static::randomUniqueForCategory($category->slug));

                $product = Product::create([
                    'category_id' => $category->id,

                    'slug' => $slug,
                    'name' => $name,
                    'description' => $description,
                    'price' => rand(2, 20),
                        
                    'in_stock' => true,
                    'is_published' => true,

                    'sku' => strtoupper($slug),
                    'ean13' => $faker->unique()->ean13,
                ]);

                $filename = self::randomUniqueSourceImageNumber() . '.jpg';
                $tempFilePath = resource_path('images/' . $filename);
                $file = new UploadedFile($tempFilePath, '', null, filesize($tempFilePath), 0, false);
                $product->handleImageUpload($file);
            }
        }
    }

    public static $beverage = [
        'Tea|Tea is the first widely consumed beverage in the world.',
        'Coffee|Coffee is a brewed beverage made from roasted coffee beans, which are the seeds fro the coffee plant.',
        'Beer|Beer the third most consumed beverage after water and tea and probably it is one of the oldest alcoholic beverage. ',
        'Energy drink|Energy drink is a type of beverage, containing psychoactive drugs, mostly caffeine.',
        'Vodka|Vodka is a type of beverage composed primarily of water and ethanol.',
        'Orange Juice|Orange Juice is rich in vitamin-C and it is consumed by million in gallons and it is the worlds number one Vitamin-C provider.',
        'Coca-Cola|Coca Cola offers hundreds of brands, including fruit juice, soft drinks, and other beverages.',
        'Wine|Wine is an alcoholic beverage made from fermented grapes. Wine comes in two types and two colors.',
    ];

    public static $salad = [
        'Caesar|The iconic Caesar salad was named after its creator Cesare Cardini.',
        'Greek|Greek salad, also known as village salad or horiatiki is the national dish of Greece, consisting of quartered tomatoes, sliced red onions, and chunky slices of cucumber.',
        'Som tam|Tam som is a versatile green papaya salad which is an incredibly popular dish in Thailand and Laos.',
        'Tabbouleh|Tabbouleh is a colorful Lebanese national dish that is usually considered a salad, with a crunchy and chewy texture.',
        'Olivier|Olivier salad is a Russian salad with variable ingredients, but it is typically made with chopped vegetables, meat, and mayonnaise. ',
        'Caprese|Nothing embodies the essence of summer in southern Italy like vibrant colors of the flavorful insalata Caprese, a true classic of Neapolitan cuisine.',
        'Karedok|Karedok is the traditional Indonesian version of a vegetable salad.',
        'Shopska|Shopska salad is a traditional cold salad that is also one of the national dishes of Bulgaria.',
    ];

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
        'Fiori di zucca|Mozzarella, courgette flower, anchovies and olive oil',
        'Bismarck|Tomato sauce, mozzarella, ham, and fried egg',
        'Funghi|Tomato sauce, mozzarella, mushrooms, parsley and olive oil',
        'Mimosa|Mozzarella, cream, ham and corn',
    ];

    public static function randomUniqueSourceImageNumber() : int
    {
        static $stack;
        $count = count(static::$pizza);

        if (!$stack) {
            for ($i = 0; $i < 48; $i++) {
                $stack[$i] = $i+1;
            }
            shuffle($stack);
        }

        if (count($stack) <= 0) {
            return null;
        }

        return array_pop($stack);
    }

    public static function randomUniqueForCategory(string $slug) : string
    {
        static $salad_pos = 0;
        static $beverage_pos = 0;
        switch ($slug) {
            case 'pizza':
                return static::randomUniquePizza();
            case 'salad':
                return static::$salad[$salad_pos++];
            case 'beverage':
                return static::$beverage[$beverage_pos++];
        }
    }

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
