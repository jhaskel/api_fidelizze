const TechController = require('../controllers/TechController');

module.exports = (app) => {    
    app.post('/clientes/:cliente_id/techs', TechController.store);

}