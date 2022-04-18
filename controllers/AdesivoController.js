const Adesivo = require('../models/Adesivo');
module.exports = {     
  
  async getAll(req, res) {  
       
    try {
      const escol = await Adesivo.findAll();        
      return res.status(201).json(escol);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter as adesivos',
          error: error,
          success: false
      })
  }      
  },

  async findById(req, res) {
    var id = req.params.id;
    try {
      const ser = await Adesivo.findByPk(id)     
      if (!ser) {
        return res.status(404).json({ 
          message: 'Adesivo não encontrado',success:false
         });
      }
      return res.status(201).json(ser);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter o adesivo',
          error: error,
          success: false
      })
  } 
   
  },



  async create(req, res) {
    const {user_id,store_id,card_id,isativo} = req.body;    
    try {     
     
        const cliente = await Adesivo.create({user_id,store_id,card_id,isativo});     
        return res.status(200).json({
          success: true,     
          data: cliente,
          message: 'Cadastro Realizado com sucesso'
      });            
      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao adicionar o adesivo',
          error: error
      });
      
    }   
    
  },
  async update(req, res, next) {
    const  { id,user_id,store_id,card_id,isativo} = req.body;
    
    try {
      const Conf = await Adesivo.findByPk(id);

      if(!Conf){
          res.status(400).json({ error : "Adesivo não encontrado",success:false });        
        } 
        
      await Adesivo.update({user_id,store_id,card_id,isativo }, {
        where: {
          id: id
        }
      });
    
      const catAtualizada = await Adesivo.findOne({ where : {id : id }});

      return res.status(200).json({
        success: true,     
        data: catAtualizada,
        message: 'Adesivo atualizado com sucesso'
    });


      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao atualizar o adesivo',
          error: error
      });
      
    }
    
   
  },

  async delete(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id;
   
    try {   
      const Conf = await Adesivo.findByPk(id);
      if(!Conf){
          res.status(400).json({ error : "Adesivo não encontrado" });
        
        } 
        await Adesivo.destroy({
          where: {
            id: id
          }
        });    
        return res.status(201).json({
            success: true,
            data:Adesivo,
            message: 'Adesivo excluído com sucesso'
        });
    } 
    catch(e) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro ao Excluir o adesivo',
            error: error
        });
    }
  },
};