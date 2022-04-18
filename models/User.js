const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,     
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      session_token: DataTypes.STRING,
      notification_token:DataTypes.STRING,
      recovery:DataTypes.STRING,     
      isativo: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }
  static associate(models) {    
    this.belongsToMany(models.Role, {foreignKey: 'user_id', through: 'user_roles', as: 'roles' });
    this.hasMany(models.Store, { foreignKey: 'user_id', as: 'users_stores' });    
    this.hasMany(models.Resgate, { foreignKey: 'user_id', as: 'users_resgates' });   
    this.hasMany(models.Card, { foreignKey: 'user_id', as: 'users_cards' });  
    this.hasMany(models.Adesivo, { foreignKey: 'user_id', as: 'users_adesivos' });  
  }
  
}

module.exports = User;