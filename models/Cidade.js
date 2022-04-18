const { Model, DataTypes } = require('sequelize');

class Cidade extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      isativo: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Setor, { foreignKey: 'cidade_id', as: 'setor_cidades' });   
    this.hasMany(models.Pnae, { foreignKey: 'cidade_id', as: 'cidade_pnae' });   
    this.hasMany(models.Licitacao, { foreignKey: 'cidade_id', as: 'cidade_licitacao' }); 
    this.hasMany(models.User, { foreignKey: 'cidade_id', as: 'cidade_users'});  
    
  }

}

module.exports = Cidade;