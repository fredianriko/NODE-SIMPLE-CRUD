const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// DUMMY DATABASE
let product = [
  {
    id: 1,
    name: "Sikat gigi",
    price: 100,
  },
  {
    id: 2,
    name: "odol",
    price: 200,
  },
  {
    id: 3,
    name: "sabun",
    price: 300,
  },
  {
    id: 4,
    name: "meja",
    price: 500,
  },
];

//ROUTE GET
app.get("/product", (req, res) => {
  return res.send(product).status(200);
});

//ROUTE POST
app.post("/product", (req, res) => {
  const newProduct = req.body;

  product.push(newProduct);
  return res.send(product).status(201);
});

//ROUTE PATCH
app.patch("/product", (req, res) => {
  const getId = parseInt(req.query.id);
  const price = parseInt(req.body.price);
  const newName = req.body.name ? req.body.name.toString() : undefined;
  //   console.log(getBody);

  product.filter((item) => {
    if (item.id === getId) {
      getId ? (item.price = price) : item.price;
      newName ? (item.name = newName) : item.name;
    }
  });

  return res.send(product).status(200);
});

//ROUTE DELETE
app.delete("/product", (req, res) => {
  const getId = req.query.id;

  product = product.filter((item) => item.id != getId);
  return res.send(product).status(202);
});

//ROUTE PUT
app.put("/product", (req, res) => {
  const newProduct = req.body ? req.body : undefined;

  product.map((item) => {
    if (item.id == parseInt(newProduct.id)) {
      item.id = newProduct.id ? parseInt(newProduct.id) : item.id;
      item.name = newProduct.name ? newProduct.name.toString() : item.name;
      item.price = newProduct.price ? parseInt(newProduct.price) : item.price;
    }
  });
  return res.send(product).status(200);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
