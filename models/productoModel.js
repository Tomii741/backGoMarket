const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productoSchema = new Schema({
    nombre: {
        type: 'string',
        require: true
    },
    precio: {
        type: 'string',
        require: true
    },
    timestamp: {
        type:'Date', 
        default: new Date()
    }
})

const Producto = mongoose.model('producto', productoSchema);

module.exports = Producto;