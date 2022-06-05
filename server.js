const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');
const mongoose   = require('mongoose');
const Recetas = require('./services/recetas');
const Controller = require ('./services/controller');
const { path } = require('express/lib/application');
const app = express();

// Conexión a la BD
mongoose.connection.openUri('mongodb+srv://admin:1234@cluster0.ywdgt.mongodb.net/endpointsapp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online')}).catch((err) => {
    console.log('Ocurrió un error al conectar a BD: ', err);
});


// parse body as json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/front'));


// all requests
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);
    next();

});

//Aca tenemos los endpoints:
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/front/index.html');
});

// Devolver todas las recetas
app.get('/api/recetas', Controller.getReceta);

// Devolver receta por ID
app.get('/api/recetas/:receta_id', Controller.getRecetaById);

// Crear una nueva receta
app.post('/api/recetas', Controller.setReceta);

// Modificar una receta
app.put('/api/recetas/:receta_id', Controller.updateReceta);

// Borrar una Receta
app.delete('/api/recetas/:receta_id', Controller.removeReceta);

app.get('/**', (req, res) => {
    res.status(404).send('Error 404 - El recurso solicitado no existe');

});

// start server
app.listen(process.env.PORT || 3000, function () {
    console.log('API andando con express...');

});