const { Model, DataTypes } = require('sequelize');

class Resgate extends Model {
  static init(sequelize) {
    super.init({ 
      name: DataTypes.STRING,       
      ano: DataTypes.STRING,  
      is_presente: DataTypes.BOOLEAN, 
      is_premiado: DataTypes.BOOLEAN,    
      isativo: DataTypes.BOOLEAN, 


    }, {
      sequelize,
      tableName: 'resgates',
    })
  }
  static associate(models) {     
    
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users_resgates' });  
    this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'resgates_stores' }); 
    this.hasMany(models.Card, { foreignKey: 'store_id', as: 'resgates_cards' }); 
    
  }
  
}

module.exports = Resgate;