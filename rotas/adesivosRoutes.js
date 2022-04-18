

const AdesivoController = require('../controllers/AdesivoController');


module.exports = (app, middlewareValidarJWT) => {


    app.get('/api/v1/adesivos/getAll', middlewareValidarJWT, AdesivoController.getAll);    
    app.get('/api/v1/adesivos/:id', middlewareValidarJWT,AdesivoController.findById);
      
    app.post('/api/v1/adesivos/create',middlewareValidarJWT, AdesivoController.create);    
    app.put('/api/v1/adesivos/update',middlewareValidarJWT, AdesivoController.update);

    app.delete('/api/v1/adesivos/excluir/:id', middlewareValidarJWT,AdesivoController.delete);


}