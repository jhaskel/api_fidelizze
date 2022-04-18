

const StoreController = require('../controllers/StoresController');


module.exports = (app, middlewareValidarJWT) => {


    app.get('/api/v1/stores/getAll', middlewareValidarJWT, StoreController.getAll);    
    app.get('/api/v1/stores/:id', middlewareValidarJWT,StoreController.findById);  
    app.post('/api/v1/stores/create',middlewareValidarJWT, StoreController.create);    
    app.put('/api/v1/stores/update',middlewareValidarJWT, StoreController.update);
    app.delete('/api/v1/stores/excluir/:id', middlewareValidarJWT,StoreController.delete);


}