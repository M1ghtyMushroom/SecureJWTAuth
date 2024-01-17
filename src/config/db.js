const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('ERROR connecting MongoDB : ', err.message);
  }
};

module.exports = connectDB;
