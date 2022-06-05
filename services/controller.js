var Receta = require('./recetas');

// Obtiene todos los objetos Receta de la base de datos
exports.getReceta = function (req, res){
	Receta.find(
		function(err, receta) {
			if (err)
				res.send(err)
					res.json(receta); // devuelve todas las Recetas en JSON	
				}
			);
}

// Obtiene el objeto receta por ID
exports.getRecetaById = function (req, res) {
    const id = req.params.receta_id;
    Receta.find({id_receta: id} , function(err, receta){
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Ocurrió un error',
                errors: err
            });
        }
        Receta.countDocuments({}, (err, conteo) => {
            return res.status(200).json({
                ok: true,
                receta: receta
            })
        });
      });
}

// Guarda un objeto Receta en base de datos
exports.setReceta = function(req, res) {
		// Creo el objeto Receta
		Receta.create(req.body,
			function(err, receta) {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las recetas tras crear una de ellas
				Receta.find(function(err, receta) {
				 	if (err)
				 		res.send(err)
				 	res.json(receta);	
				});
			});
	}

// Elimino un objeto receta de la base de Datos
exports.removeReceta = function(req, res) {
    console.log(req.params);
	Receta.deleteOne({_id: req.params.receta_id}, function(err, receta) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las recetas tras borrar una de ellas
			Receta.find(function(err, receta) {
				if (err)
					res.send(err)
				res.json(receta);
			});
		});
}

// Modificamos un objeto Receta de la base de datos
exports.updateReceta = function (req, res) {
    Receta.updateOne( {_id : req.body._id},
        req.body, 
        function(err, receta) {
            if (err)
                res.send(err);
    // Obtine y devuelve todas las personas tras crear una de ellas
    Receta.find(function(err, receta) {
         if (err)
             res.send(err)
         res.json(receta);
    });
});
}
