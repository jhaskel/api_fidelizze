const User = require('../models/User');
const jwt = require('jsonwebtoken');
const UserRoles = require('../models/User_roles');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
       
  async getAll(req, res, next) {
     
    try {
        const data = await User.findAll({
            order:[                
                ['name','DESC'],]
            
        });    
        console.log(`Usuarios: ${data}`);
        return res.status(201).json(data);
    } 
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro em buscar os usuários'
        });
    }
},
//fim getall


async findById(req, res) {
    var id = req.params.id;
    try {
      const  users = await User.findOne({where:{id : id},attributes:{exclude:["password"]}});
   //   const users = await User.findByPk(id)     
      if (!users) {
        return res.status(404).json({ 
          message: 'User not found',
          success:false
         });
      }
      return res.status(201).json(users);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter os Usuarios',
          error: error,
          success: false
      })
  }   

   
  },
   
  
  async index(req, res) {
    try {
      const users = await User.findAll();        
      return res.status(201).json(users);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter os Usuarios',
          error: error,
          success: false
      })
  }   

   
  },


  async register(req, res, next) {   
      
    try{
        const user = await User.findOne({ where : {email : req.body.email }});
        if(user){
            res.status(400).json({ error : "Usuário já registrado",success:false });
          
          }else{
            const salt = await bcrypt.genSalt(10);   
            var usr = {
              cidade_id: req.body.cidade_id,
              setor_id: req.body.setor_id,
              name : req.body.name,
              email : req.body.email, 
              password : await bcrypt.hash(req.body.password, salt),
              isativo : req.body.isativo,              
            };
            created_user = await User.create(usr);
            const user_id = created_user.id;
            const role_id = 1;
            console.log("userId "+user_id)
            
            await UserRoles.create({user_id,role_id})

            const data = {
                id: created_user.id,
                name: created_user.name,
                email:created_user.email,
                             
            }
            return res.status(200).json({
              success: true,              
              data: data,
              message: 'O usuario Foi registrado com Sucesso'
          });
           
          }
      

      }catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Houve un erro com el registro do usuario',
            error: error
        });
    }
    
   

  
},
async login(req, res, next) {
  const chavePrivada = '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb';     
    const user = await User.findOne({ where : {email : req.body.email }});
    if(user){
      console.log(`email ${req.body.email}`);
      
       const password_valid = await bcrypt.compare(req.body.password,user.password);

       if(password_valid){
           token = jwt.sign({ "id" : user.id,"email" : user.email,"name":user.name },chavePrivada);
           console.log(user.id)
           const roles = await User.findByPk(user.id,{       
           
            include: { 
                association: 'roles', 
                attributes: ['name','route','id'], 
                through: { 
                  attributes: []
                } 
              },   
              attributes:{exclude:["password"]}        
            
          },
          
          );
         /* const data = {
            id: roles.id,
            name: roles.name,            
            email: roles.email,
            login: roles.phone,           
            session_token: `${token}`,
            array_to_json: roles.name
        }*/
           
        return res.status(200).json({
            success: true,
            session_token: `${token}`,
            data: roles,
            message: 'O usuario está autenticado'
        });
           res.status(200).json({ 
               token : token ,
               user:user
        });
       } else {
         res.status(400).json({ error : "password incorreta" });
       }
     
     }else{
       res.status(404).json({ error : "Usuário não existe" });
     }
  
  
   
},
async logout(req, res, next) {

  try {
      const id = req.body.id;
      await User.updateToken(id, null);
      return res.status(201).json({
          success: true,
          message: ' Sessão do usuario foi finalizada'
      });
  } 
  catch(e) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro no momento de encerrar a sessão',
          error: error
      });
  }
},

async delete(req, res, next) {
    console.log(req.params.id)
    const user = await User.findOne({ where : {id : req.params.id }});
    if(!user){
        res.status(400).json({ error : "Usuário não encontrado" });
      
      }

    try {
        const id = req.params.id;
        
        await User.destroy({
            where: {
              id: req.params.id
            }
          });
        
        return res.status(201).json({
            success: true,
            message: ' Usuário excluído com sucesso'
        });
    } 
    catch(e) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro ao Excluir usuario',
            error: error
        });
    }
  },


};