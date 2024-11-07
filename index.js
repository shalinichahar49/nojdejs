const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { v4: isUuid } = require("uuid"); // Optional: import for UUID validation

const prisma = new PrismaClient();
const app = express();

app.use(cors());  
app.use(bodyParser.json());

app.post("/profiles", async (req, res) => {
    console.log("Request body:", req.body); // Debug incoming data
    try {
      const { name, phoneNumber, profileData, partner, status } = req.body;
      
      const newProfile = await prisma.profile.create({
        data: {
          name,
          phoneNumber,
          profileData,
          partner,
          status,
        },
      });
      
      res.status(200).json(newProfile);
      
    } catch (error) {
      console.error("Error creating profile:", error.message); // Log exact error message
      res.status(500).json({ error: "Failed to create profile", details: error.message });
    }
  });
  
// Route to get all profiles
app.get("/profiles", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Failed to retrieve profiles" });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
