const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [];

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.get('/products', (req, res) => {
    res.json({ products: products }).send();
});

app.post('/products', (req, res) => {
    const { name, cpf, city, status } = req.body;

    products.push({ id: products.length + 1, name, cpf, city, status });

    res.status(201).json().send();
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const productIndex = products.findIndex(product => product.id == id);
    if (productIndex === -1) {
        return res.status(404).send();
    }

    products[productIndex] = { ...products[productIndex], name };

    res.status(204).json(products).send();
});

app.patch('/products/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const productIndex = products.findIndex(product => product.id == id);
    if (productIndex === -1) {
        return res.status(404).send();
    }

    products[productIndex] = { ...products[productIndex], status };

    res.status(204).json(products).send();
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(product => product.id != id);
    

    res.status(200).json({ products }).send();
});
    
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
