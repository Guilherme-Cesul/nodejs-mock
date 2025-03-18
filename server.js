const express = require('express');
const app = express();
const port = 3000;

const products = [];

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.get('/products', (req, res) => {
    const { status } = req.query;
    res.json({ status }).send();
});

app.post('/products', (req, res) => {
    res.status(201).json(products).send();
});

app.put('/products', (req, res) => {
    res.status(204).json(products).send();
});

app.patch('/products', (req, res) => {
    res.status(204).json(products).send();
});

app.delete('/products', (req, res) => {
    res.status(204).json(products).send();
});
    
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
