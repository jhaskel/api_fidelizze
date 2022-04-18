const Setor = require('../models/Setor');
module.exports = {     
  
  async index(req, res) {   
    console.log("aqui2")
    
    try {
      const setores = await Setor.findAll({
        include: [{ 
          association: 'setor_cidades', 
           attributes: ['name','id'],           
        }]
          });        
      return res.status(201).json(setores);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter os Setores',
          error: error,
          success: false
      })
  }      
  },

  async findById(req, res) {
    var id = req.params.id;
    try {
      const setores = await Setor.findByPk(id)     
      if (!setores) {
        return res.status(404).json({ 
          message: 'Setor not found',success:false
         });
      }
      return res.status(201).json(setores);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter os Setores',
          error: error,
          success: false
      })
  } 
   
  },

  async findByCidade(req, res) {
    var cidade = req.params.cidade;
    try {
      
      const niveiss = await Setor.findAll({ 
        where : {cidade_id : cidade },
        include: [{ 
          association: 'setor_cidades', 
           attributes: ['name'],           
        }]
      
      }); 
      if (!niveiss) {
        return res.status(404).json({ 
          message: 'Setor not found',success:false
         });
      }
      return res.status(201).json(niveiss);
  } 
  catch (error) {
      console.log(`Error ${error}`);    
      return res.status(501).json({
          message: 'Houve um erro em obter os setores',
          error: error,
          success: false
      })
  } 
   
  },


  async create(req, res) {
    const { name, cidade_id } = req.body;    
    try {     
     
        const cliente = await Setor.create({ name, cidade_id });     
        return res.status(200).json({
          success: true,     
          data: cliente,
          message: 'Cadastro Realizado com sucesso'
      });            
      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao adicionar o Setor',
          error: error
      });
      
    }   
    
  },
  async update(req, res, next) {
    const  {id,name } = req.body;
    
    try {
      const setoor = await Setor.findByPk(id);
      if(!setoor){
          res.status(400).json({ error : "Setor não encontrado",success:false });        
        } 
        
      await Setor.update({ 
        name,
      }, {
        where: {
          id: id
        }
      });
     // const SetorAtualizada = await Setor.findByPk(id);

      return res.status(200).json({
        success: true,     
        data: Setor,
        message: 'Setor atualizado com sucesso'
    });


      
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
          success: false,
          message: 'Erro ao atualizar o Setor',
          error: error
      });
      
    }
    
   
  },

  async delete(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id;
   
    try {   
      const Setor = await Setor.findByPk(id);
      if(!Setor){
          res.status(400).json({ error : "Setor não encontrado" });
        
        } 
        await Setor.destroy({
          where: {
            id: id
          }
        });    
        return res.status(201).json({
            success: true,
            data:Setor,
            message: 'Setor excluído com sucesso'
        });
    } 
    catch(e) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Erro ao Excluir o Setor',
            error: error
        });
    }
  },
};