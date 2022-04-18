const Store = require('../models/Store');
module.exports = {     
  
  async getAll(req, res) {   
   
    
    try {
      const escol = await Store.findAll();        
      return res.status(201).json(escol);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter as lojas',
          error: error,
          success: false
      })
  }      
  },

  async findById(req, res) {
    var id = req.params.id;
    try {
      const lojass = await Store.findByPk(id)     
      if (!lojass) {
        return res.status(404).json({ 
          message: 'Loja não encontrada',success:false
         });
      }
      return res.status(201).json(lojass);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter as lojas',
          error: error,
          success: false
      })
  } 
   
  },




  async create(req, res) {
    const { 
      user_id,
      name,
      nick,
      phone,
      address,
      logo,      
      isopen,
      isativo,
     
    } = req.body;    
    try {     
     
        const cliente = await Store.create({ 
          user_id,
          name,
          nick,
          phone,
          address,
          logo,
          isopen,
          isativo
    });     
        return res.status(200).json({
          success: true,     
          data: cliente,
          message: 'Cadastro Realizado com sucesso'
      });            
      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao adicionar a loja',
          error: error
      });
      
    }   
    
  },
  async update(req, res, next) {
    const  { 
      id,
      user_id,
      name,
      nick,
      phone,
      address,
      logo,     
      isopen,
      isativo
    } = req.body;
    
    try {
      const Conf = await Store.findByPk(id);

      if(!Conf){
          res.status(400).json({ error : "Loja não encontrada",success:false });
        
        } 
        
      await Store.update({ 
        user_id,
        name,
        nick,
        phone,
        address,
        logo,        
        isopen,
        isativo  
      }, {
        where: {
          id: id
        }
      });
    
      const catAtualizada = await Store.findOne({ where : {id : id }});

      return res.status(200).json({
        success: true,     
        data: catAtualizada,
        message: 'Loja  atualizado com sucesso'
    });


      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao atualizar a loja',
          error: error
      });
      
    }
    
   
  },

  async delete(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id;
   
    try {   
      const Conf = await Store.findByPk(id);
      if(!Conf){
          res.status(400).json({ error : "Loja não encontrado" });
        
        } 
        await Store.destroy({
          where: {
            id: id
          }
        });    
        return res.status(201).json({
            success: true,
            data:Store,
            message: 'Loja excluída com sucesso'
        });
    } 
    catch(e) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro ao Excluir a loja',
            error: error
        });
    }
  },
};