

const StatusController = require('../controllers/StatusController');



module.exports = (app) => {


    
    app.get('/api/v2/status/getAll', StatusController.getAll);
    app.get('/api/v2/status/:id', StatusController.findById);  
    app.post('/api/v2/status/create', StatusController.create);  
    app.put('/api/v2/status/update', StatusController.update);
    app.delete('/api/v2/status/excluir/:id', StatusController.delete);


}