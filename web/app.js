// Product database
const PRODUCTS = {
    "1000000000": { 
        name: "Washington Red Delicious™ Premium Apples", 
        brand: "Red Delicious",
        price: 0.80,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🍎",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
        description: "Fresh, crisp red apples. Rich in fiber and vitamin C. Perfect for a healthy snack.",
        details: "Premium quality red apples sourced from local farms. Each apple is carefully selected for optimal freshness and taste. Great for snacking, baking, or adding to salads."
    },
    "1000000001": { 
        name: "Sunkist® California Navel Oranges", 
        brand: "Navel Fresh",
        price: 0.70,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&h=400&fit=crop",
        description: "Juicy, sweet oranges packed with vitamin C. Perfect for breakfast or a refreshing snack.",
        details: "Fresh, juicy oranges with a perfect balance of sweetness and tanginess. High in vitamin C and antioxidants. Ideal for juicing or eating fresh."
    },
    "1000000002": { 
        name: "Maison Artisan Country White Bread", 
        brand: "Wonder",
        price: 2.40,
        priceUnit: "per loaf",
        category: "bakery", 
        emoji: "🍞",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        description: "Freshly baked white bread. Soft, fluffy texture perfect for sandwiches and toast.",
        details: "Artisan white bread baked daily in our bakery. Made with premium flour and natural ingredients. Soft, fluffy texture with a golden crust. Perfect for sandwiches, toast, or as a side with meals."
    },
    "1000000003": { 
        name: "Devondale® Australian Fresh Milk", 
        brand: "Australian",
        price: 1.50,
        priceUnit: "per liter",
        category: "dairy", 
        emoji: "🥛",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
        description: "Fresh whole milk. Rich in calcium and protein. Essential for a balanced diet.",
        details: "Fresh whole milk from local dairy farms. Rich in calcium, protein, and essential vitamins. Pasteurized for safety while maintaining natural flavor. Perfect for drinking, cooking, or adding to coffee and cereal."
    },
    "1000000004": { 
        name: "Jacob's Creek® Merlot Red Wine", 
        brand: "Merlot Premium",
        price: 10.00,
        priceUnit: "per bottle",
        category: "beverages", 
        emoji: "🍷",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
        description: "Premium red wine. Smooth and full-bodied, perfect for special occasions.",
        details: "Premium quality red wine with a smooth, full-bodied flavor. Aged to perfection, this wine pairs excellently with red meats, pasta, and cheese. Perfect for dinner parties or special occasions."
    },
    "1000000005": { 
        name: "Heineken® Original Lager Beer", 
        brand: "Heineken",
        price: 3.00,
        priceUnit: "per bottle",
        category: "beverages", 
        emoji: "🍺",
        image: "images/Attached_image.png",
        description: "Crisp, refreshing lager beer. Perfect for relaxing after a long day.",
        details: "Crisp and refreshing lager beer with a balanced flavor profile. Brewed with premium hops and malt. Best served chilled. Perfect for social gatherings, barbecues, or casual evenings."
    },
    "1000000006": { 
        name: "Dole® Cavendish Bananas", 
        brand: "Cavendish",
        price: 0.60,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🍌",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
        description: "Sweet, ripe bananas. High in potassium and natural energy. Great for breakfast or snacks.",
        details: "Fresh, ripe bananas with natural sweetness. High in potassium, fiber, and natural sugars. Perfect for breakfast, smoothies, or as a healthy snack. Naturally energy-boosting."
    },
    "1000000007": { 
        name: "Happy Egg Co.™ Free-Range Eggs", 
        brand: "Free Range",
        price: 3.50,
        priceUnit: "per dozen",
        category: "dairy", 
        emoji: "🥚",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
        description: "Farm-fresh eggs. High in protein and essential nutrients. Perfect for breakfast and baking.",
        details: "Farm-fresh eggs from free-range hens. High in protein, vitamins, and essential nutrients. Perfect for breakfast, baking, or cooking. Each egg is carefully inspected for quality and freshness."
    },
    "1000000008": { 
        name: "Cathedral City® Mature Cheddar Cheese", 
        brand: "Cheddar Aged",
        price: 4.50,
        priceUnit: "per 250g",
        category: "dairy", 
        emoji: "🧀",
        image: "images/Cathedral City® Mature Cheddar Cheese.jfif",
        description: "Aged cheddar cheese. Rich, sharp flavor perfect for sandwiches and cooking.",
        details: "Premium aged cheddar cheese with a rich, sharp flavor. Made from high-quality milk and aged to perfection. Perfect for sandwiches, cheese boards, or melting in your favorite dishes."
    },
    "1000000009": { 
        name: "Perdue® Organic Chicken Breast – Farm Raised", 
        brand: "Organic",
        price: 8.00,
        priceUnit: "per 500g",
        category: "meat", 
        emoji: "🍗",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
        description: "Fresh chicken breast. Lean protein source, perfect for healthy meals.",
        details: "Fresh, premium chicken breast. Lean, high-quality protein source. Perfect for grilling, baking, or pan-frying. Sourced from trusted suppliers and handled with care to ensure freshness and quality."
    },
    "1000000010": { 
        name: "Royal Umbrella® Thai Jasmine Rice", 
        brand: "Jasmine",
        price: 5.00,
        priceUnit: "per kg",
        category: "bakery", 
        emoji: "🍚",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
        description: "Premium long-grain white rice. Fluffy texture, perfect as a side dish or base for meals.",
        details: "Premium quality long-grain white rice. Fluffy texture when cooked, with a mild, slightly sweet flavor. Perfect as a side dish or as a base for stir-fries, curries, and other main dishes."
    },
    "1000000011": { 
        name: "Barilla® Italian Classic Pasta", 
        brand: "Barilla",
        price: 2.50,
        priceUnit: "per pack",
        category: "bakery", 
        emoji: "🍝",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop&auto=format",
        description: "Italian-style pasta. Made from durum wheat, perfect for your favorite pasta dishes.",
        details: "Authentic Italian-style pasta made from premium durum wheat semolina. Cooks to a perfect al dente texture. Versatile and perfect for a wide variety of pasta dishes, from simple marinara to rich carbonara."
    },
    "1000000012": { 
        name: "Chiquita® Premium Bananas", 
        brand: "Chiquita",
        price: 0.65,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🍌",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
        description: "Premium quality bananas. Sweet and creamy, perfect for breakfast or snacks.",
        details: "Chiquita premium bananas known for their consistent quality and sweet flavor. Rich in potassium and natural energy. Perfect for eating fresh, adding to smoothies, or baking."
    },
    "1000000013": { 
        name: "Driscoll's® Fresh Strawberries", 
        brand: "Driscoll's",
        price: 4.50,
        priceUnit: "per 250g",
        category: "fruits", 
        emoji: "🍓",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
        description: "Sweet, juicy strawberries. Perfect for desserts, salads, or fresh snacking.",
        details: "Driscoll's premium strawberries picked at peak ripeness. Bursting with natural sweetness and rich in vitamin C. Perfect for fresh eating, desserts, or adding to your morning cereal."
    },
    "1000000014": { 
        name: "Fresh Express® Baby Spinach", 
        brand: "Fresh Express",
        price: 3.20,
        priceUnit: "per 200g",
        category: "vegetables", 
        emoji: "🥬",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
        description: "Fresh baby spinach leaves. Tender and nutritious, perfect for salads and cooking.",
        details: "Fresh Express baby spinach is pre-washed and ready to eat. Rich in iron, vitamins, and antioxidants. Perfect for salads, smoothies, or sautéed as a side dish."
    },
    "1000000015": { 
        name: "Birds Eye® Frozen Mixed Vegetables", 
        brand: "Birds Eye",
        price: 3.80,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🥕",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
        description: "Frozen mixed vegetables. Convenient and nutritious, ready to cook.",
        details: "Birds Eye frozen mixed vegetables are flash-frozen at peak freshness to lock in nutrients and flavor. Contains carrots, peas, corn, and green beans. Perfect for stir-fries, soups, or as a side dish."
    },
    "1000000016": { 
        name: "Tyson® Premium Ground Beef", 
        brand: "Tyson",
        price: 7.50,
        priceUnit: "per 500g",
        category: "meat", 
        emoji: "🥩",
        image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop",
        description: "Premium ground beef. Fresh and lean, perfect for burgers and cooking.",
        details: "Tyson premium ground beef is sourced from quality cattle and ground fresh. Perfect for making burgers, meatballs, tacos, or any recipe calling for ground beef. High in protein and flavor."
    },
    "1000000017": { 
        name: "Ocean's Best® Wild Caught Salmon", 
        brand: "Ocean's Best",
        price: 12.00,
        priceUnit: "per 300g",
        category: "seafood", 
        emoji: "🐟",
        image: "images/Wild Caught Salmon.jpg",
        description: "Wild-caught salmon fillets. Rich in omega-3, perfect for healthy meals.",
        details: "Ocean's Best wild-caught salmon is sustainably sourced and rich in omega-3 fatty acids. Fresh, flavorful, and perfect for grilling, baking, or pan-searing. A healthy protein choice for any meal."
    },
    "1000000018": { 
        name: "Tillamook® Sharp Cheddar Cheese", 
        brand: "Tillamook",
        price: 5.20,
        priceUnit: "per 250g",
        category: "dairy", 
        emoji: "🧀",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
        description: "Sharp cheddar cheese. Rich and tangy, perfect for sandwiches and snacking.",
        details: "Tillamook sharp cheddar cheese is aged to perfection for a bold, tangy flavor. Made from high-quality milk with no artificial ingredients. Perfect for cheese boards, sandwiches, or melting."
    },
    "1000000019": { 
        name: "Yoplait® Greek Yogurt", 
        brand: "Yoplait",
        price: 2.80,
        priceUnit: "per 500g",
        category: "dairy", 
        emoji: "🥛",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
        description: "Creamy Greek yogurt. High in protein, perfect for breakfast or snacks.",
        details: "Yoplait Greek yogurt is thick, creamy, and packed with protein. Made with real fruit and no artificial flavors. Perfect for breakfast, smoothies, or as a healthy snack."
    },
    "1000000020": { 
        name: "Sara Lee® Classic White Bread", 
        brand: "Sara Lee",
        price: 2.60,
        priceUnit: "per loaf",
        category: "bakery", 
        emoji: "🍞",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        description: "Classic white bread. Soft and fluffy, perfect for sandwiches.",
        details: "Sara Lee classic white bread is soft, fluffy, and perfect for any sandwich. Made with quality ingredients and baked fresh. A family favorite for generations."
    },
    "1000000021": { 
        name: "Coca-Cola® Classic Soft Drink", 
        brand: "Coca-Cola",
        price: 2.20,
        priceUnit: "per 2L bottle",
        category: "beverages", 
        emoji: "🥤",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
        description: "Classic cola soft drink. Refreshing and carbonated, perfect for any occasion.",
        details: "Coca-Cola classic is the world's favorite soft drink. Refreshing, carbonated, and perfect for enjoying ice-cold. Great for parties, meals, or anytime you need a refreshing drink."
    },
    "1000000022": { 
        name: "Lay's® Classic Potato Chips", 
        brand: "Lay's",
        price: 3.50,
        priceUnit: "per 200g",
        category: "snacks", 
        emoji: "🥔",
        image: "images/Lays_Classic.jpg",
        description: "Classic potato chips. Crispy and delicious, perfect for snacking.",
        details: "Lay's classic potato chips are thinly sliced and perfectly salted. Made from real potatoes and cooked to crispy perfection. The perfect snack for any time of day."
    },
    "1000000023": { 
        name: "Oreo® Chocolate Sandwich Cookies", 
        brand: "Oreo",
        price: 4.20,
        priceUnit: "per 300g",
        category: "snacks", 
        emoji: "🍪",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
        description: "Classic chocolate sandwich cookies. Creamy filling, perfect for dunking.",
        details: "Oreo chocolate sandwich cookies feature two chocolate wafers with a creamy vanilla filling. Perfect for dunking in milk or enjoying on their own. A timeless favorite."
    },
    "1000000024": { 
        name: "Ben & Jerry's® Chocolate Fudge Brownie Ice Cream", 
        brand: "Ben & Jerry's",
        price: 6.50,
        priceUnit: "per 500ml",
        category: "frozen", 
        emoji: "🍦",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
        description: "Premium ice cream with chocolate fudge and brownie pieces. Rich and indulgent.",
        details: "Ben & Jerry's chocolate fudge brownie ice cream is made with fair trade ingredients. Rich chocolate ice cream swirled with fudge and loaded with brownie pieces. A decadent treat."
    },
    "1000000025": { 
        name: "Heinz® Tomato Ketchup", 
        brand: "Heinz",
        price: 2.80,
        priceUnit: "per 500ml",
        category: "condiments", 
        emoji: "🍅",
        image: "images/ketchup.png",
        description: "Classic tomato ketchup. Rich and tangy, perfect for fries and burgers.",
        details: "Heinz tomato ketchup is made from sun-ripened tomatoes and a secret blend of spices. Rich, tangy, and perfect for burgers, fries, hot dogs, and more. A kitchen essential."
    },
    "1000000026": { 
        name: "Hellmann's® Real Mayonnaise", 
        brand: "Hellmann's",
        price: 3.20,
        priceUnit: "per 500ml",
        category: "condiments", 
        emoji: "🥄",
        image: "images/Hellmann's® Real Mayonnaise.png",
        description: "Real mayonnaise. Creamy and rich, perfect for sandwiches and salads.",
        details: "Hellmann's real mayonnaise is made with real eggs, oil, and vinegar. Creamy, rich, and perfect for sandwiches, salads, and recipes. Bring out the best in your food."
    },
    "1000000027": { 
        name: "McCormick® Black Pepper Ground", 
        brand: "McCormick",
        price: 2.50,
        priceUnit: "per 50g",
        category: "condiments", 
        emoji: "🌶️",
        image: "images/McCormick® Black Pepper Ground.jpg",
        description: "Ground black pepper. Freshly ground, perfect for seasoning any dish.",
        details: "McCormick black pepper is freshly ground from premium peppercorns. Adds bold flavor to meats, vegetables, and any dish. A kitchen essential for every cook."
    },
    "1000000028": { 
        name: "Campbell's® Cream of Mushroom Soup", 
        brand: "Campbell's",
        price: 2.40,
        priceUnit: "per 400ml can",
        category: "canned", 
        emoji: "🥫",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop",
        description: "Creamy mushroom soup. Rich and comforting, perfect for cooking or eating.",
        details: "Campbell's cream of mushroom soup is a kitchen staple. Rich, creamy, and perfect for casseroles, recipes, or enjoying on its own. Made with real mushrooms."
    },
    "1000000029": { 
        name: "Kellogg's® Corn Flakes", 
        brand: "Kellogg's",
        price: 4.50,
        priceUnit: "per 500g",
        category: "cereal", 
        emoji: "🥣",
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=400&fit=crop",
        description: "Classic corn flakes. Crispy and golden, perfect for breakfast.",
        details: "Kellogg's corn flakes are crispy, golden flakes made from milled corn. A classic breakfast cereal that's perfect with milk. Low in sugar and high in taste."
    },
    "1000000030": { 
        name: "Quaker® Old Fashioned Oats", 
        brand: "Quaker",
        price: 3.80,
        priceUnit: "per 500g",
        category: "cereal", 
        emoji: "🌾",
        image: "images/Quaker® Old Fashioned Oats.jpg",
        description: "Old-fashioned rolled oats. Hearty and nutritious, perfect for breakfast.",
        details: "Quaker old-fashioned oats are 100% whole grain and a good source of fiber. Perfect for making oatmeal, cookies, or adding to smoothies. A healthy start to your day."
    },
    "1000000031": { 
        name: "Nestlé® Toll House Chocolate Chips", 
        brand: "Nestlé",
        price: 4.80,
        priceUnit: "per 300g",
        category: "baking", 
        emoji: "🍫",
        image: "images/Nestlé® Toll House Chocolate Chips.png",
        description: "Semi-sweet chocolate chips. Perfect for baking cookies and desserts.",
        details: "Nestlé Toll House semi-sweet chocolate chips are made with real chocolate. Perfect for cookies, brownies, muffins, and any baked treat. The original chocolate chip."
    },
    "1000000032": { 
        name: "Gold Medal® All-Purpose Flour", 
        brand: "Gold Medal",
        price: 3.20,
        priceUnit: "per 1kg",
        category: "baking", 
        emoji: "🌾",
        image: "images/Gold Medal® All-Purpose Flour.png",
        description: "All-purpose flour. Versatile and reliable, perfect for all your baking needs.",
        details: "Gold Medal all-purpose flour is milled from premium wheat. Perfect for breads, cakes, cookies, and all your baking needs. A trusted brand for generations."
    },
    "1000000033": { 
        name: "Domino® Granulated Sugar", 
        brand: "Domino",
        price: 2.90,
        priceUnit: "per 1kg",
        category: "baking", 
        emoji: "🍬",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
        description: "Pure granulated sugar. Fine and consistent, perfect for baking and sweetening.",
        details: "Domino granulated sugar is pure cane sugar, fine and consistent. Perfect for baking, sweetening beverages, and all your cooking needs. A kitchen essential."
    },
    "1000000034": { 
        name: "Bertolli® Extra Virgin Olive Oil", 
        brand: "Bertolli",
        price: 8.50,
        priceUnit: "per 500ml",
        category: "condiments", 
        emoji: "🫒",
        image: "images/Bertolli® Extra Virgin Olive Oil_.jpg",
        description: "Extra virgin olive oil. Rich and fruity, perfect for cooking and salads.",
        details: "Bertolli extra virgin olive oil is made from premium olives. Rich, fruity flavor perfect for cooking, drizzling on salads, or dipping bread. A Mediterranean classic."
    },
    "1000000035": { 
        name: "Progresso® Traditional Chicken Noodle Soup", 
        brand: "Progresso",
        price: 2.60,
        priceUnit: "per 400ml can",
        category: "canned", 
        emoji: "🍲",
        image: "images/Progresso® Traditional Chicken Noodle Soup.jfif",
        description: "Classic chicken noodle soup. Comforting and hearty, perfect for any day.",
        details: "Progresso traditional chicken noodle soup is made with tender chicken, egg noodles, and vegetables in a rich broth. A comforting classic that's ready in minutes."
    },
    "1000000036": { 
        name: "Green Giant® Sweet Corn", 
        brand: "Green Giant",
        price: 2.20,
        priceUnit: "per 340g can",
        category: "canned", 
        emoji: "🌽",
        image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400&h=400&fit=crop",
        description: "Sweet corn kernels. Tender and sweet, perfect as a side dish.",
        details: "Green Giant sweet corn is picked at peak freshness and packed in its own natural juices. Tender, sweet, and perfect as a side dish or in recipes."
    },
    "1000000037": { 
        name: "Del Monte® Sliced Peaches", 
        brand: "Del Monte",
        price: 2.80,
        priceUnit: "per 410g can",
        category: "canned", 
        emoji: "🍑",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
        description: "Sliced peaches in light syrup. Sweet and juicy, perfect for desserts.",
        details: "Del Monte sliced peaches are picked at peak ripeness and packed in light syrup. Sweet, juicy, and perfect for desserts, yogurt, or enjoying on their own."
    },
    "1000000038": { 
        name: "Ocean Spray® Cranberry Juice", 
        brand: "Ocean Spray",
        price: 3.50,
        priceUnit: "per 1L",
        category: "beverages", 
        emoji: "🥤",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
        description: "100% cranberry juice. Tart and refreshing, rich in antioxidants.",
        details: "Ocean Spray cranberry juice is made from real cranberries. Tart, refreshing, and rich in antioxidants. Perfect for drinking or mixing in cocktails."
    },
    "1000000039": { 
        name: "Tropicana® Pure Premium Orange Juice", 
        brand: "Tropicana",
        price: 4.20,
        priceUnit: "per 1L",
        category: "beverages", 
        emoji: "🧃",
        image: "images/Tropicana® Pure Premium Orange Juice.jfif",
        description: "100% pure orange juice. Fresh squeezed taste, rich in vitamin C.",
        details: "Tropicana pure premium orange juice is made from fresh oranges, not from concentrate. Rich in vitamin C and full of fresh-squeezed flavor. A healthy start to your day."
    },
    "1000000040": { 
        name: "Folgers® Classic Roast Coffee", 
        brand: "Folgers",
        price: 6.80,
        priceUnit: "per 300g",
        category: "beverages", 
        emoji: "☕",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        description: "Classic roast ground coffee. Rich and smooth, perfect for your morning cup.",
        details: "Folgers classic roast coffee is made from 100% pure coffee beans. Rich, smooth, and full of flavor. The perfect way to start your day."
    },
    "1000000041": { 
        name: "Lipton® Yellow Label Tea Bags", 
        brand: "Lipton",
        price: 3.60,
        priceUnit: "per 100 bags",
        category: "beverages", 
        emoji: "🍵",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
        description: "Premium black tea bags. Rich and refreshing, perfect any time of day.",
        details: "Lipton yellow label tea is made from premium tea leaves. Rich, refreshing, and perfect hot or iced. A classic tea that's been enjoyed for generations."
    },
    "1000000042": { 
        name: "Foster Farms® Whole Chicken", 
        brand: "Foster Farms",
        price: 9.50,
        priceUnit: "per whole chicken",
        category: "meat", 
        emoji: "🍗",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
        description: "Whole fresh chicken. Perfect for roasting, grilling, or any recipe.",
        details: "Foster Farms whole chicken is fresh, plump, and perfect for roasting. Great for family dinners, meal prep, or any recipe calling for whole chicken."
    },
    "1000000043": { 
        name: "Smithfield® Premium Bacon", 
        brand: "Smithfield",
        price: 5.80,
        priceUnit: "per 300g",
        category: "meat", 
        emoji: "🥓",
        image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=400&fit=crop",
        description: "Premium sliced bacon. Smoky and crispy, perfect for breakfast.",
        details: "Smithfield premium bacon is hickory-smoked and perfectly sliced. Crispy, smoky, and full of flavor. Perfect for breakfast, BLTs, or any recipe."
    },
    "1000000044": { 
        name: "Johnsonville® Italian Sausage", 
        brand: "Johnsonville",
        price: 6.50,
        priceUnit: "per 400g",
        category: "meat", 
        emoji: "🌭",
        image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=400&fit=crop",
        description: "Italian-style sausage. Seasoned with herbs and spices, perfect for grilling.",
        details: "Johnsonville Italian sausage is made with premium pork and authentic Italian seasonings. Perfect for grilling, pasta dishes, or sandwiches. Full of flavor."
    },
    "1000000045": { 
        name: "Bumble Bee® Solid White Albacore Tuna", 
        brand: "Bumble Bee",
        price: 3.80,
        priceUnit: "per 170g can",
        category: "canned", 
        emoji: "🐟",
        image: "images/Bumble Bee® Solid White Albacore Tuna.jfif",
        description: "Solid white albacore tuna in water. High in protein, perfect for salads and sandwiches.",
        details: "Bumble Bee solid white albacore tuna is packed in water and high in protein. Perfect for salads, sandwiches, casseroles, or enjoying on its own. A healthy protein choice."
    },
    "1000000046": { 
        name: "Fresh Atlantic Cod Fillets", 
        brand: "Ocean Fresh",
        price: 11.50,
        priceUnit: "per 400g",
        category: "seafood", 
        emoji: "🐟",
        image: "images/Fresh Atlantic Cod Fillets.jpg",
        description: "Fresh Atlantic cod fillets. Mild and flaky, perfect for frying or baking.",
        details: "Fresh Atlantic cod fillets are mild, flaky, and perfect for any cooking method. High in protein and omega-3. Great for fish and chips, baking, or grilling."
    },
    "1000000047": { 
        name: "Fresh Jumbo Shrimp", 
        brand: "Coastal Catch",
        price: 14.00,
        priceUnit: "per 500g",
        category: "seafood", 
        emoji: "🦐",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
        description: "Fresh jumbo shrimp. Sweet and tender, perfect for grilling or sautéing.",
        details: "Fresh jumbo shrimp are sweet, tender, and perfect for any recipe. Great for grilling, sautéing, pasta dishes, or shrimp cocktails. A seafood favorite."
    },
    "1000000048": { 
        name: "Fresh Baby Carrots", 
        brand: "Bunny Luv",
        price: 2.50,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🥕",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
        description: "Fresh baby carrots. Sweet and crunchy, perfect for snacking or cooking.",
        details: "Bunny Luv baby carrots are sweet, crunchy, and perfect for snacking. Rich in beta-carotene and vitamin A. Great raw, steamed, or in recipes."
    },
    "1000000049": { 
        name: "Fresh Broccoli Crowns", 
        brand: "Green Valley",
        price: 3.20,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🥦",
        image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&h=400&fit=crop",
        description: "Fresh broccoli crowns. Nutritious and versatile, perfect for steaming or roasting.",
        details: "Green Valley fresh broccoli crowns are rich in vitamins and fiber. Perfect for steaming, roasting, stir-fries, or adding to salads. A superfood favorite."
    },
    "1000000050": { 
        name: "Fresh Roma Tomatoes", 
        brand: "Garden Fresh",
        price: 3.80,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🍅",
        image: "images/Fresh Roma Tomatoes.jfif",
        description: "Fresh Roma tomatoes. Firm and meaty, perfect for cooking and salads.",
        details: "Garden Fresh Roma tomatoes are firm, meaty, and perfect for cooking. Great for sauces, salads, or any recipe. Rich in lycopene and flavor."
    },
    "1000000051": { 
        name: "Fresh Red Bell Peppers", 
        brand: "Sunshine Farms",
        price: 4.20,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🫑",
        image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
        description: "Fresh red bell peppers. Sweet and crisp, perfect for cooking or eating raw.",
        details: "Sunshine Farms red bell peppers are sweet, crisp, and full of flavor. Rich in vitamin C. Perfect for roasting, stir-fries, salads, or stuffing."
    },
    "1000000052": { 
        name: "Fresh Cucumbers", 
        brand: "Crisp Fresh",
        price: 2.20,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🥒",
        image: "images/Fresh Cucumbers.jpg",
        description: "Fresh cucumbers. Cool and crisp, perfect for salads and snacking.",
        details: "Crisp Fresh cucumbers are cool, crisp, and refreshing. Perfect for salads, sandwiches, or snacking. High in water content and low in calories."
    },
    "1000000053": { 
        name: "Fresh White Mushrooms", 
        brand: "Mushroom Masters",
        price: 3.50,
        priceUnit: "per 250g",
        category: "vegetables", 
        emoji: "🍄",
        image: "images/Fresh White Mushrooms.jpg",
        description: "Fresh white button mushrooms. Meaty and flavorful, perfect for cooking.",
        details: "Mushroom Masters white mushrooms are fresh, meaty, and full of umami flavor. Perfect for sautéing, grilling, or adding to any dish. A versatile ingredient."
    },
    "1000000054": { 
        name: "Fresh Red Onions", 
        brand: "Onion Express",
        price: 2.80,
        priceUnit: "per 500g",
        category: "vegetables", 
        emoji: "🧅",
        image: "images/Fresh Red Onions.jfif",
        description: "Fresh red onions. Mild and sweet, perfect for salads and cooking.",
        details: "Onion Express red onions are mild, sweet, and perfect for salads, sandwiches, or cooking. Adds flavor and color to any dish."
    },
    "1000000055": { 
        name: "Fresh Garlic Bulbs", 
        brand: "Garlic Gold",
        price: 2.40,
        priceUnit: "per 100g",
        category: "vegetables", 
        emoji: "🧄",
        image: "images/Fresh Garlic Bulbs.jpg",
        description: "Fresh garlic bulbs. Aromatic and flavorful, essential for cooking.",
        details: "Garlic Gold fresh garlic bulbs are aromatic and full of flavor. Essential for countless recipes. Adds depth and aroma to any dish."
    },
    "1000000056": { 
        name: "Fresh Avocados", 
        brand: "Hass Premium",
        price: 2.80,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🥑",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
        description: "Fresh Hass avocados. Creamy and rich, perfect for guacamole and salads.",
        details: "Hass Premium avocados are creamy, rich, and full of healthy fats. Perfect for guacamole, salads, toast, or any recipe. A superfood favorite."
    },
    "1000000057": { 
        name: "Fresh Pineapples", 
        brand: "Tropical Gold",
        price: 3.50,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🍍",
        image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop",
        description: "Fresh whole pineapples. Sweet and tropical, perfect for snacking or cooking.",
        details: "Tropical Gold pineapples are sweet, juicy, and full of tropical flavor. Rich in vitamin C. Perfect for eating fresh, grilling, or in recipes."
    },
    "1000000058": { 
        name: "Fresh Mangoes", 
        brand: "Tropical Sweet",
        price: 2.50,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🥭",
        image: "images/Fresh Mangoes.jpg",
        description: "Fresh mangoes. Sweet and juicy, perfect for snacking or smoothies.",
        details: "Tropical Sweet mangoes are sweet, juicy, and full of tropical flavor. Rich in vitamins A and C. Perfect for eating fresh, smoothies, or desserts."
    },
    "1000000059": { 
        name: "Fresh Grapes Red Seedless", 
        brand: "Vineyard Select",
        price: 4.50,
        priceUnit: "per 500g",
        category: "fruits", 
        emoji: "🍇",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop",
        description: "Fresh red seedless grapes. Sweet and crisp, perfect for snacking.",
        details: "Vineyard Select red seedless grapes are sweet, crisp, and perfect for snacking. Rich in antioxidants. Great for kids and adults alike."
    },
    "1000000060": { 
        name: "Fresh Blueberries", 
        brand: "Berry Best",
        price: 5.50,
        priceUnit: "per 250g",
        category: "fruits", 
        emoji: "🫐",
        image: "images/Fresh Blueberries.jpg",
        description: "Fresh blueberries. Sweet and antioxidant-rich, perfect for breakfast or snacking.",
        details: "Berry Best blueberries are sweet, plump, and packed with antioxidants. Perfect for breakfast, smoothies, baking, or snacking. A superfood favorite."
    },
    "1000000061": { 
        name: "Fresh Watermelons", 
        brand: "Summer Sweet",
        price: 4.80,
        priceUnit: "per piece",
        category: "fruits", 
        emoji: "🍉",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
        description: "Fresh whole watermelons. Sweet and refreshing, perfect for summer.",
        details: "Summer Sweet watermelons are sweet, juicy, and incredibly refreshing. Perfect for hot summer days. High in water content and naturally hydrating."
    }
};

// User management (using localStorage)
function initDatabase() {
    if (!localStorage.getItem('users')) {
        // Pre-populate with test user accounts
        const defaultUsers = [
            { name: "John Doe", email: "john@example.com", password: "password123" },
            { name: "Jane Smith", email: "jane@example.com", password: "password123" },
            { name: "Admin User", email: "admin@spmart.com", password: "admin123" },
            { name: "Test User", email: "test@test.com", password: "test123" },
            { name: "Alice Johnson", email: "alice@example.com", password: "alice123" }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({}));
    }
}

// Auth functions
function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
    document.getElementById('errorMessage').classList.remove('show');
}

function showSignup() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
    document.querySelectorAll('.tab-btn')[0].classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    document.getElementById('errorMessage').classList.remove('show');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'shop.html';
    } else {
        showError('Invalid email or password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showError('Email already registered');
        return;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    window.location.href = 'shop.html';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function handleGuestLogin(event) {
    event.preventDefault();
    // Set guest user
    const guestUser = { 
        name: "Guest", 
        email: "guest@spmart.com", 
        password: "",
        isGuest: true 
    };
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    window.location.href = 'shop.html';
}

function handleLogout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = 'index.html';
}

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    let count = 0;
    for (let item of Object.values(cart)) {
        count += item.qty;
    }
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
        // Animate cart count update
        if (typeof animateCartCount === 'function') {
            animateCartCount();
        } else {
            cartCountEl.classList.add('updated');
            setTimeout(() => {
                cartCountEl.classList.remove('updated');
            }, 500);
        }
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initDatabase();
        if (!window.location.pathname.includes('index.html')) {
            checkAuth();
        }
        updateCartCount();
    });
} else {
    initDatabase();
    if (!window.location.pathname.includes('index.html')) {
        checkAuth();
    }
    updateCartCount();
}
