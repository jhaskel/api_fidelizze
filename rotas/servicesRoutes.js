

const ServiceController = require('../controllers/ServicesController');


module.exports = (app, middlewareValidarJWT) => {


    app.get('/api/v1/services/getAll', middlewareValidarJWT, ServiceController.getAll);    
    app.get('/api/v1/services/:id', middlewareValidarJWT,ServiceController.findById);
      
    app.post('/api/v1/services/create',middlewareValidarJWT, ServiceController.create);    
    app.put('/api/v1/services/update',middlewareValidarJWT, ServiceController.update);

    app.delete('/api/v1/services/excluir/:id', middlewareValidarJWT,ServiceController.delete);


}