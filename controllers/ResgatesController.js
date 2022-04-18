const Resgate = require('../models/Resgate');
module.exports = {     
  
  async getAll(req, res) {  
   
    
    try {
      const escol = await Resgate.findAll();        
      return res.status(201).json(escol);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter as resgates',
          error: error,
          success: false
      })
  }      
  },

  async findById(req, res) {
    var id = req.params.id;
    try {
      const ser = await Resgate.findByPk(id)     
      if (!ser) {
        return res.status(404).json({ 
          message: 'Resgate não encontrado',success:false
         });
      }
      return res.status(201).json(ser);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter o resgate',
          error: error,
          success: false
      })
  } 
   
  },



  async create(req, res) {
    const {user_id,store_id,name,ano,is_presente,is_premiado,isativo} = req.body;    
    try {     
     
        const cliente = await Resgate.create({user_id,store_id,name,ano,is_presente,is_premiado,isativo});     
        return res.status(200).json({
          success: true,     
          data: cliente,
          message: 'Cadastro Realizado com sucesso'
      });            
      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao adicionar o resgate',
          error: error
      });
      
    }   
    
  },
  async update(req, res, next) {
    const  { id,user_id,store_id,name,ano,is_presente,is_premiado,isativo} = req.body;
    
    try {
      const Conf = await Resgate.findByPk(id);

      if(!Conf){
          res.status(400).json({ error : "Resgate não encontrado",success:false });        
        } 
        
      await Resgate.update({user_id,store_id,name,ano,is_presente,is_premiado,isativo }, {
        where: {
          id: id
        }
      });
    
      const catAtualizada = await Resgate.findOne({ where : {id : id }});

      return res.status(200).json({
        success: true,     
        data: catAtualizada,
        message: 'Resgate atualizado com sucesso'
    });


      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao atualizar o resgate',
          error: error
      });
      
    }
    
   
  },

  async delete(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id;
   
    try {   
      const Conf = await Resgate.findByPk(id);
      if(!Conf){
          res.status(400).json({ error : "Resgate não encontrado" });
        
        } 
        await Resgate.destroy({
          where: {
            id: id
          }
        });    
        return res.status(201).json({
            success: true,
            data:Resgate,
            message: 'Resgate excluído com sucesso'
        });
    } 
    catch(e) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro ao Excluir o resgate',
            error: error
        });
    }
  },
};