const { Model, DataTypes } = require('sequelize');

class Store extends Model {
  static init(sequelize) {
    super.init({      
      name: DataTypes.STRING, 
      nick: DataTypes.STRING, 
      phone: DataTypes.STRING,     
      address: DataTypes.STRING, 
      logo: DataTypes.TEXT,          
      isopen: DataTypes.BOOLEAN, 
      isativo: DataTypes.BOOLEAN,       

    }, {
      sequelize,
      tableName: 'stores',
    })
  }
  static associate(models) {      
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users_stores' });  
    this.hasMany(models.Card, { foreignKey: 'store_id', as: 'stores_cards' }); 
    this.hasMany(models.Resgate, { foreignKey: 'store_id', as: 'resgates_stores' }); 
    this.hasMany(models.Adesivo, { foreignKey: 'store_id', as: 'stores_adesivos' });  
  }
  
}

module.exports = Store;