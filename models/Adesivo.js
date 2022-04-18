const { Model, DataTypes } = require('sequelize');

class Adesivo extends Model {
  static init(sequelize) {
    super.init({     
     
      isativo: DataTypes.BOOLEAN,  
        

    }, {
      sequelize,
      tableName: 'adesivos',
    })
  }
  static associate(models) {      
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users_adesivos' });   
    this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'stores_adesivos' });  
    this.belongsTo(models.Card, { foreignKey: 'card_id', as: 'cards_adesivos' });      
  }
  
}

module.exports = Adesivo;