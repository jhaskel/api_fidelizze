const Card = require('../models/Cards');
module.exports = {     
  
  async getAll(req, res) {  
       
    try {
      const escol = await Card.findAll();        
      return res.status(201).json(escol);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter as cards',
          error: error,
          success: false
      })
  }      
  },

  async findById(req, res) {
    var id = req.params.id;
    try {
      const ser = await Card.findByPk(id)     
      if (!ser) {
        return res.status(404).json({ 
          message: 'Card não encontrado',success:false
         });
      }
      return res.status(201).json(ser);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter o card',
          error: error,
          success: false
      })
  } 
   
  },



  async create(req, res) {
    const {user_id,store_id,resgate_id,name,tags,description,logo,adesivos,isativo} = req.body;    
    try {    
     
        const cliente = await Card.create({user_id,store_id,resgate_id,name,tags,description,logo,adesivos,isativo});     
        return res.status(200).json({
          success: true,     
          data: cliente,
          message: 'Cadastro Realizado com sucesso'
      });            
      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao adicionar o card',
          error: error
      });
      
    }   
    
  },
  async update(req, res, next) {
    const  { id,user_id,store_id,resgate_id,adesivos,name,description,logo,tags,isativo} = req.body;
    
    try {
      const Conf = await Card.findByPk(id);

      if(!Conf){
          res.status(400).json({ error : "Card não encontrado",success:false });        
        } 
        
      await Card.update({user_id,store_id,resgate_id,adesivos,name,description,logo,tags,isativo }, {
        where: {
          id: id
        }
      });
    
      const catAtualizada = await Card.findOne({ where : {id : id }});

      return res.status(200).json({
        success: true,     
        data: catAtualizada,
        message: 'Card atualizado com sucesso'
    });


      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao atualizar o card',
          error: error
      });
      
    }
    
   
  },

  async delete(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id;
   
    try {   
      const Conf = await Card.findByPk(id);
      if(!Conf){
          res.status(400).json({ error : "Card não encontrado" });
        
        } 
        await Card.destroy({
          where: {
            id: id
          }
        });    
        return res.status(201).json({
            success: true,
            data:Card,
            message: 'Card excluído com sucesso'
        });
    } 
    catch(e) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro ao Excluir o card',
            error: error
        });
    }
  },
};