const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const serviceSchema = new mongoose.Schema({
  name: String,
  category: String,
  cuisine: String,
  description: String,
  pricePerPerson: Number,
  minGuests: Number,
  maxGuests: Number,
  featured: Boolean,
  rating: Number,
  menuItems: [String],
  availability: { type: Boolean, default: true }
});

const Service = mongoose.model('Service', serviceSchema);

const services = [
  {
    name: "👑 Royal Wedding Banquet",
    category: "wedding",
    cuisine: "continental",
    description: "Luxury 5-course wedding banquet with international cuisine. Includes champagne, live music, and premium decoration.",
    pricePerPerson: 125,
    minGuests: 100,
    maxGuests: 2000,
    featured: true,
    rating: 4.9,
    menuItems: [
      "🥂 Welcome Champagne/Mocktail",
      "🍢 Starters: Paneer Tikka, Chicken Tikka, Spring Rolls",
      "🍲 Soups: Hot & Sour, Sweet Corn, Tomato Shorba",
      "🍛 Main Course Veg: Paneer Butter Masala, Dal Makhani, Veg Biryani",
      "🍗 Main Course Non-Veg: Butter Chicken, Mutton Rogan Josh, Fish Curry",
      "🍞 Breads: Garlic Naan, Butter Naan, Stuffed Kulcha, Laccha Paratha",
      "🍚 Rice: Jeera Rice, Ghee Rice, Steamed Rice",
      "🥗 Sides: Raita, Salad, Pickles, Papad",
      "🍰 Desserts: Gulab Jamun, Rasmalai, Ice Cream, Wedding Cake",
      "🥤 Beverages: Soft Drinks, Buttermilk, Fresh Lime Soda"
    ]
  },
  {
    name: "🏢 Corporate Elite Package",
    category: "corporate",
    cuisine: "fusion",
    description: "Professional catering for corporate events. Includes AV equipment, business lunch setup, and dedicated staff.",
    pricePerPerson: 85,
    minGuests: 50,
    maxGuests: 500,
    featured: true,
    rating: 4.7,
    menuItems: [
      "☕ Welcome: Premium Coffee/Tea with Cookies",
      "🍢 Starters: Veg Spring Rolls, Chicken Popcorn, Cheese Balls",
      "🍛 Main Course: Paneer Tikka Masala, Mix Veg Curry, Dal Tadka",
      "🍗 Non-Veg: Chicken Curry, Egg Curry",
      "🍚 Rice: Jeera Rice, Veg Pulao",
      "🍞 Breads: Plain Naan, Tandoori Roti",
      "🥗 Salads: Green Salad, Veg Raita",
      "🍰 Dessert: Fruit Custard, Assorted Pastries",
      "🥤 Beverages: Soft Drinks, Mineral Water"
    ]
  },
  {
    name: "🎂 Birthday Bash Package",
    category: "birthday",
    cuisine: "italian",
    description: "Fun Italian feast for birthday celebrations. Includes pizza station, pasta bar, and birthday cake.",
    pricePerPerson: 65,
    minGuests: 25,
    maxGuests: 150,
    featured: false,
    rating: 4.5,
    menuItems: [
      "🍕 Live Pizza Station",
      "🍢 Starters: Chilli Paneer, Gobi Manchurian, Chicken Lollipop",
      "🍛 Main Course: Veg Manchurian Gravy, Paneer Chilli, Honey Chilli Potato",
      "🍗 Non-Veg: Chilli Chicken, Egg Fried Rice",
      "🍚 Rice: Veg Fried Rice, Schezwan Fried Rice",
      "🍝 Noodles: Hakka Noodles, Schezwan Noodles",
      "🎂 Birthday Cake (Customizable)",
      "🍨 Dessert: Ice Cream with Chocolate Sauce",
      "🥤 Unlimited Soft Drinks"
    ]
  },
  {
    name: "💕 Anniversary Special",
    category: "anniversary",
    cuisine: "mediterranean",
    description: "Romantic Mediterranean dinner for special occasions. Includes candlelight setup, rose petals, and champagne.",
    pricePerPerson: 95,
    minGuests: 30,
    maxGuests: 200,
    featured: true,
    rating: 4.8,
    menuItems: [
      "🥂 Sparkling Wine / Rose Drink",
      "🍢 Premium Starters: Malai Tikka, Hara Bhara Kabab, Tandoori Prawns",
      "🍲 Soup: Badami Shorba, Murg Malai Shorba",
      "🍛 Main Course Veg: Shahi Paneer, Navratan Korma, Malai Kofta",
      "🍗 Main Course Non-Veg: Murgh Makhani, Laal Maas, Prawn Curry",
      "🍞 Breads: Roomali Roti, Lachha Paratha, Butter Garlic Naan",
      "🍚 Rice: Biryani (Veg/Chicken/Mutton), Zafrani Pulao",
      "🥗 Sides: Boondi Raita, Onion Salad, Mango Chutney",
      "🍰 Desserts: Double Ka Meetha, Shahi Tukda, Gulab Jamun",
      "🍫 Complimentary: Chocolate Box with Rose"
    ]
  },
  {
    name: "🎓 Graduation Party",
    category: "graduation",
    cuisine: "american",
    description: "Celebratory feast with American classics. BBQ station, dessert bar, and photo booth included.",
    pricePerPerson: 55,
    minGuests: 40,
    maxGuests: 300,
    featured: false,
    rating: 4.6,
    menuItems: [
      "🍔 Slider Burgers (Veg/Chicken)",
      "🍟 Loaded Fries with Cheese",
      "🍢 Indian Starters: Samosa, Cutlet, Masala Papad",
      "🍛 Main Course: Kadai Paneer, Chana Masala, Mix Veg",
      "🍗 Non-Veg: Chicken Curry, Egg Curry",
      "🍚 Rice: Veg Pulao, Plain Rice",
      "🍞 Bread: Kulcha, Butter Roti",
      "🥗 Sides: Salad, Raita",
      "🧁 Cupcake Tower",
      "🥤 Soft Drink Counter"
    ]
  },
  {
    name: "🍱 Custom Premium Buffet",
    category: "custom",
    cuisine: "fusion",
    description: "Fully customizable buffet with any cuisine you desire. Work with our head chef to create your perfect menu.",
    pricePerPerson: 110,
    minGuests: 50,
    maxGuests: 1000,
    featured: true,
    rating: 5.0,
    menuItems: [
      "📋 Custom Menu Consultation with Chef",
      "🍢 Choose any 4 Starters",
      "🍛 Choose any 4 Main Course Curries",
      "🍗 Choose any 2 Non-Veg Dishes",
      "🍚 Choose your Rice (Biryani/Pulao/Steamed)",
      "🍞 Choose your Breads (Naan/Roti/Kulcha)",
      "🥗 Custom Salad Bar",
      "🍰 Custom Dessert Selection",
      "🥤 Premium Beverage Counter",
      "🎁 Special: Personalized Menu Cards"
    ]
  }
];

async function seed() {
  try {
    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/catering_system');
    console.log('✅ Connected!');
    
    await Service.deleteMany();
    console.log('🗑️  Cleared old services');
    
    await Service.insertMany(services);
    console.log(`✅ Added ${services.length} services to database`);
    
    console.log('\n📋 Services added with FULL MENU ITEMS:');
    services.forEach(s => console.log(`   - ${s.name} (${s.menuItems.length} food items)`));
    
    console.log('\n✨ Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seed();