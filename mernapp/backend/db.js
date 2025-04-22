const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://nasrumul:EUXNGLKBdT2KFT4r@cluster0.rrnqq.mongodb.net/ToolBox1?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    const fetched_data = mongoose.connection.db.collection("parts_items");
    const data = await fetched_data.find({}).toArray();

    const parts_categories = mongoose.connection.db.collection("parts_categories");
    const catData = await  parts_categories.find({}).toArray();
    global.parts_items = data;
    global.partsCategory = catData;
    
    //console.log(global.parts_items);

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
module.exports = mongoDB;