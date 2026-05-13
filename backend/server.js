const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// ============ USER SCHEMA ============
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

// ============ SERVICE SCHEMA ============
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
  menuItems: [String]
});

const Service = mongoose.model('Service', serviceSchema);

// ============ ORDER SCHEMA ============
const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: Object,
  customerInfo: Object,
  guestCount: Number,
  subtotal: Number,
  tax: Number,
  total: Number,
  paymentMethod: String,
  transactionId: String,
  paymentStatus: { type: String, default: 'pending' },
  paidAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// ============ MIDDLEWARE ============
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'secret123');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ============ AUTH ROUTES ============

app.post('/api/auth/register', async (req, res) => {
  console.log('📝 Register:', req.body.email);
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: 'Email already exists' });
    }
    const user = new User({ name, email, password, phone });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'secret123');
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  console.log('🔐 Login:', req.body.email);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const valid = user.comparePassword(password);
    if (!valid) {
      return res.json({ success: false, message: 'Wrong password' });
    }
    const token = jwt.sign({ id: user._id }, 'secret123');
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false });
  }
});

// ============ SERVICE ROUTES WITH COMPLETE MENU ============

app.get('/api/services', async (req, res) => {
  try {
    let services = await Service.find();
    if (services.length === 0) {
      const allServices = [
        { 
          name: "👑 Royal Wedding Banquet", 
          category: "wedding", 
          cuisine: "Indian & Continental", 
          description: "Grand wedding feast with authentic Indian and Continental delicacies. Perfect for your special day.", 
          pricePerPerson: 125, 
          minGuests: 100, 
          maxGuests: 2000, 
          featured: true, 
          rating: 4.9,
          menuItems: [
            "🥂 Welcome Drink (Champagne/Mocktail)",
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
          cuisine: "Multi-Cuisine", 
          description: "Professional corporate catering with buffet setup. Ideal for meetings, conferences, and office parties.", 
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
          cuisine: "Indian & Chinese", 
          description: "Fun-filled birthday celebration with popular Indian and Chinese dishes that everyone loves.", 
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
          cuisine: "Royal Indian", 
          description: "Romantic anniversary dinner with royal Indian cuisine. Candlelight setup included.", 
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
          cuisine: "Indo-Western", 
          description: "Celebrate your achievement with delicious Indo-Western fusion menu.", 
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
          cuisine: "Fully Customizable", 
          description: "Design your own menu with our head chef. Choose from thousands of dishes.", 
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
      services = await Service.insertMany(allServices);
      console.log('✅ Added 6 services with full Indian meals');
    }
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ ORDER ROUTES ============

app.post('/api/orders', verifyToken, async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order({
      ...orderData,
      userId: req.userId,
      orderId: 'ORD-' + Date.now(),
      paymentStatus: 'completed',
      paidAt: new Date()
    });
    await order.save();
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/api/orders/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ HOME ROUTE ============
app.get('/', (req, res) => {
  res.json({ message: 'Catering System API is running!' });
});

// ============ DATABASE CONNECTION (LOCAL MONGODB) ============
const MONGODB_URI = 'mongodb://localhost:27017/catering_system';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected (LOCAL)'))
  .catch(err => console.log('MongoDB Error:', err.message));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   GET  / - Home`);
  console.log(`   POST /api/auth/register - Sign up`);
  console.log(`   POST /api/auth/login - Login`);
  console.log(`   GET  /api/services - Get all services`);
});