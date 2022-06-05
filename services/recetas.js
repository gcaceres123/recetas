var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TestSchema = new Schema({
    id_receta: {type: String},
    nombre: {type: String},
    chef: {type: String},
    ingredientes: {type: String},
    procedimiento: {type: String},

});
module.exports = Mongoose.model('Recetas', TestSchema, 'endpointsapp');