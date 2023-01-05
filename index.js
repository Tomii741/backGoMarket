const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 9000;
const path = require('path');
const multer = require('multer');
require('./database/conexion');
const app = express();
const productoController = require('./controllers/productoController');
const Producto = require('./models/productoModel');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('common'));

/* const storage = multer.diskStorage({
    destination: function(req, file, callback){
        console.log(file);
        callback(null, 'uploads')
    },
    filename: function(req, file, callback){
        callback(null, `${file.originalname}`)
    }
});

const uploads = multer({ storage: storage }) */

app.get('/datos', async(req, res) => {
    res.json({
        productos: await productoController.findAll()
    });
})

app.post('/carga', async (req, res) => {

    const { nombre, precio } = req.body;
    console.log(`${nombre} - ${precio}`);

    if(!nombre || !precio){
        return res.send("Cargar datos");
    } else {
        await productoController.create(req.body)

        res.send('Producto Creado');
    }
    
    
})

app.delete('/:id', async (req, res) => {

    const { id } = req.params.id;

    res.send('Producto Eliminado');
    return await productoController.delete(req.params.id)
})

app.put('/:id', (req, res) => {
    res.send('Persona Actualizada')
})

app.listen(PORT, ()=>{
    console.log(`MERN trabajando en el Puerto ${PORT}`);
});
