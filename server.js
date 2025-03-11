const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User"); // Import the User model
const { run } = require("node:test");

require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/myDatabase")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST route to add a user
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//update route
app.put("/users/:id", async (req,res)=>{
  try{
    const {name,email} = req.body;
    const UpdateUser = await User.findByIdAndUpdate(
      //find user by id and update form URL
      req.params.id,
      {name,email},//senet qe do te bahen update
      {new:true, runValidators:true}//Ben returu te dhenat e reja & validon te dhenat pare se me i rujt
    );
    if(!UpdateUser){
       return res.status(404).json({message:"User not found"});
      }
      res.status(200).json({message:"Useri u ba update me sukses",user:UpdateUser});

  }catch(error){
    res.status(400).json({error:error.message});
  }
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// {
//     "name": "John Doe",
//     "email": "johndoe@example.com"
//   }
  