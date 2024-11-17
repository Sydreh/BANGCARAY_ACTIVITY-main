const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const mockData = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];
  app.post("/mockData", (req, res) => {
    const { name, price } = req.body; // to get the name and price from the request body
    const newData = { id: mockData.length + 1, name, price }; // to create a new Data object
    mockData.push(newData); // to add the new Data to the mockData array
    res.status(201).json(newData); // to send the new Data as a response
});

app.get("/mockData", (req, res) => {
    res.json(mockData); // to send the mockData array as a response
  });

  app.get("/mockData/:id", (req, res) => {
    const Data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the Data by id
    if (!Data) return res.status(404).json({ message: "Data not found" }); // to send a 404 status code and a message if the Data is not found
    res.json(Data); // to send the Data as a response
  });

  app.put("/mockData/:id", (req, res) => {
    const Data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the Data by id
    if (!Data) return res.status(404).json({ message: "Data not found" }); // to send a 404 status code and a message if the Data is not found
  
    const { name, price } = req.body; // to get the name and price from the request body
    Data.name = name; // to update the name of the Data
    Data.price = price; // to update the price of the Data
    res.json(Data); // to send the updated Data as a response
});

app.delete("/mockData/:id", (req, res) => {
    const index = mockData.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the Data by id
    if (index === -1) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the Data is not found
  
    mockData.splice(index, 1); // to delete the Data from the mockData array
    res.status(204).send(); // to send a 204 status code
  });