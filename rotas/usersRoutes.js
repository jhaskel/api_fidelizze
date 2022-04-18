const UsersController = require('../controllers/UserControllers');

const dotenv = require('dotenv');
dotenv.config()

module.exports = (app,upload,middlewareValidarJWT) => {
  app.get('/users', UsersController.getAll);
    app.get('/api/v2/users/getAll', UsersController.getAll);  
   
    app.get('/api/v1/users/getAll', middlewareValidarJWT,UsersController.getAll);
    app.get('/api/v2/users/getAll', UsersController.getAll);
    app.get('/api/v2/users/findById/:id',UsersController.findById);    
    app.get('/api/teste', function (req, res) {
        res.send('APP MERENDA!');
      });
      
   app.post('/api/v1/users/create', UsersController.register);
   app.post('/api/v1/users/login', UsersController.login);
   app.delete('/users/api/v1/delete/:id', UsersController.delete);

   
}