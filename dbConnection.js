const mysql = require('mysql');
const fs = require('fs');
const ini = require('ini');
const path = require('path');

const configFilePath = path.resolve('./config.ini');
const config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'))

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : config.database.user,
    password : config.database.password,
    database : config.database.database
  });

  module.exports = connection;