
const dotenv = require('dotenv');
dotenv.config();

const a = process.env.HOST;
console.log(a);

module.exports = {

    dialect: 'mysql',   
    host :'gepron.com.br',
    username :'gepronco_haskel',
    password : 'Haskel00',
    database : 'gepronco_fidelizze',
    define: {
      timestamps: true,
      underscored: true,
    },    
    dialectOptions: {     
      options: {
        useUTC: false, // for reading from database
      },
    },
    timezone: "America/Sao_Paulo",
  };