const { Model, DataTypes } = require('sequelize');

class UserRoles extends Model {
  static init(sequelize) {
    super.init({
      user_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,      
    }, {
      sequelize
    })
  }
  static associate(models) {    
    this.belongsToMany(models.Role, {foreignKey: 'user_id', through: 'user_roles', as: 'roles' });
    this.belongsToMany(models.User, {foreignKey: 'role_id', through: 'user_roles', as: 'users' });
  }

  
}

module.exports = UserRoles;