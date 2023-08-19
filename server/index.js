const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/add-partner', (req, res) => {
  try {
    const newPartner = req.body;

    // Read existing partners data from JSON file
    const partnersData = JSON.parse(fs.readFileSync('./assets/partners.json'));

    // Assign a new ID based on the last partner's ID
    newPartner.id = partnersData[partnersData.length - 1].id + 1;

    // Add the new partner to the array
    partnersData.push(newPartner);

    // Write updated data back to JSON file
    fs.writeFileSync('partners.json', JSON.stringify(partnersData, null, 2));

    res.status(201).json({ message: 'Partner added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding partner' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
