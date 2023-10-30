const express = require('express');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');
const cors =require('cors');
const UserModel = require('./modules/products')


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// app.use(apiRoutes);


const PORT = process.env.PORT|| 5000;

mongoose.connect('mongodb+srv://yugandhar:7032292232@mydatabase.i6jal.mongodb.net/shopping-cart-app?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


  app.get('/getProducts', (req, res) => {
    UserModel.find()
      .then(data => {
        console.log('Products data:', data);
        res.json(data);
      })
      .catch(err => {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
      });
  });

  app.get('/getProduct/:id', (req, res) => {
    const productId = req.params.id;
    UserModel.findById(productId)
      .then(data => {
        console.log('Products data:', data);
        res.json(data);
      })
      .catch(err => {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
      });
  });

  app.post('/addProduct', (req, res) => {
    const newProduct = new UserModel(req.body); 
    newProduct
      .save()
      .then(data => {
        console.log('Product added:', data);
        res.json(data);
      })
      .catch(err => {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
      });
  });

  app.put('/updateProduct/:id', (req, res) => {
    const productId = req.params.id;
    UserModel.findByIdAndUpdate(productId, req.body, { new: true })
      .then(data => {
        if (!data) {
          return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product updated:', data);
        res.json(data);
      })
      .catch(err => {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
      });
  });

  app.delete('/deleteProduct/:id', (req, res) => {
    const productId = req.params.id; // Extract the product ID from the URL
    UserModel.findByIdAndRemove(productId)
      .then(data => {
        if (!data) {
          return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product deleted:', data);
        res.json(data);
      })
      .catch(err => {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
      });
  });