

const dotenv = require('dotenv');

dotenv.config();
    const middlewareValidarJWT = (req, res, next) => {
        
         
            const jwt = req.headers['authorization'].split(" ")[1];        
         
                const chavePrivada = '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb';     
        
                // Efetuando a validação do JWT:
                const jwtService = require("jsonwebtoken");
                jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
                    console.log("3")
                    if (err) {                 
                        return res.status(501).json({
                          message: 'Você não está autenticado',
                          error: err,
                          success: false
                      })
                    }
        
                    //res.json(userInfo);
                    next();
                    
                });

        
          
        
       
    };

    module.exports = middlewareValidarJWT
