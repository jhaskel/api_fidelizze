const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const User = require('../models/User');
const Role = require('../models/Role');
const UserRoles = require('../models/User_roles');
const Store = require('../models/Store');


const Resgate = require('../models/Resgate');
const Card = require('../models/Cards');
const Adesivo = require('../models/Adesivo');



const connection = new Sequelize(dbConfig);


User.init(connection);
Role.init(connection);
UserRoles.init(connection);
Store.init(connection);

Resgate.init(connection);
Card.init(connection);

Adesivo.init(connection);


User.associate(connection.models);
Role.associate(connection.models);
UserRoles.associate(connection.models);
Store.associate(connection.models);

Resgate.associate(connection.models);
Card.associate(connection.models);

Adesivo.associate(connection.models);

module.exports = connection;