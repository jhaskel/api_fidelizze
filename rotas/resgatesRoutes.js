

const ResgateController = require('../controllers/ResgatesController');


module.exports = (app, middlewareValidarJWT) => {


    app.get('/api/v1/resgates/getAll', middlewareValidarJWT, ResgateController.getAll);    
    app.get('/api/v1/resgates/:id', middlewareValidarJWT,ResgateController.findById);
      
    app.post('/api/v1/resgates/create',middlewareValidarJWT, ResgateController.create);    
    app.put('/api/v1/resgates/update',middlewareValidarJWT, ResgateController.update);

    app.delete('/api/v1/resgates/excluir/:id', middlewareValidarJWT,ResgateController.delete);


}