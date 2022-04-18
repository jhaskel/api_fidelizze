const { Model, DataTypes } = require('sequelize');

class Card extends Model {
  static init(sequelize) {
    super.init({     
     
      isativo: DataTypes.BOOLEAN,  
      description: DataTypes.TEXT, 
      logo: DataTypes.TEXT, 
      adesivos: DataTypes.INTEGER, 
      name: DataTypes.STRING,  
      tags: DataTypes.TEXT,                

    }, {
      sequelize,
      tableName: 'cards',
    })
  }
  static associate(models) {   
   
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users_cards' });   
    this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'stores_cards' });  
    this.belongsTo(models.Resgate, { foreignKey: 'resgate_id', as: 'resgates_cards' });      
    this.hasMany(models.Adesivo, { foreignKey: 'store_id', as: 'cards_adesivos'});  
  }
  
}

module.exports = Card;