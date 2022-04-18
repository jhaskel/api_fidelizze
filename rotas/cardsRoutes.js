

const CardController = require('../controllers/CardsController');


module.exports = (app, middlewareValidarJWT) => {


    app.get('/api/v1/cards/getAll', middlewareValidarJWT, CardController.getAll);    
    app.get('/api/v1/cards/:id', middlewareValidarJWT,CardController.findById);
      
    app.post('/api/v1/cards/create',middlewareValidarJWT, CardController.create);    
    app.put('/api/v1/cards/update',middlewareValidarJWT, CardController.update);

    app.delete('/api/v1/cards/excluir/:id', middlewareValidarJWT,CardController.delete);


}