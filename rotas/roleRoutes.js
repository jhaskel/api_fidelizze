const RolesController = require('../controllers/roleController');


module.exports = (app) => {

    app.get('/users/:user_id/roles', RolesController.index);
    app.post('/users/:user_id/roles', RolesController.store);   
   }