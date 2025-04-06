const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ CONNECTED to MongoDB");
  } catch (error) {
    console.log('❌ DB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
