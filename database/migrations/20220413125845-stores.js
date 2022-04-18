'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      nick: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },  
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
          
      logo: {
        type: Sequelize.TEXT,
        allowNull: false,
      }, 
      isopen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }, 
      isativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stores');
  }
};