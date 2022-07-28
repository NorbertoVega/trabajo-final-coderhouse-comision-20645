import express from 'express';
import axios from 'axios';
import config from '../config.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseUrl = `http://localhost:${config.PORT}/api/producto`

app.get('/', (req, res) => {
    res.send('Cliente de prueba');
})

app.get('/productos', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/`);
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({err});
    }
});

app.get('/productos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${baseUrl}/${id}`);
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({err});
    }
});

app.post('/productos',async (req, res) => {
    try {
        const response = await axios.post(`${baseUrl}/`, req.body);
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({err});
    }
});

app.put('/productos/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.put(`${baseUrl}/${id}`, req.body);
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({err});
    }
});

app.delete('/productos/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.delete(`${baseUrl}/${id}`, { data: req.body });
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({err});
    }
});

app.listen(3000, () => {
    console.log('Client server up at port 3000!!');
});