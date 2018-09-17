'use strict';

const express    = require('express');
const swagger    = require('./lib/swagger');
const bodyParser = require('body-parser');
const db         = require('./app/models');
const config     = require('./lib/config')();
const app        = express();

const os=require('os');
const interfaces=os.networkInterfaces();
for(var k in interfaces){for(var k2 in interfaces[k]){var address = interfaces[k][k2];if(address.family === 'IPv4' && !address.internal){var objIpServer = JSON.parse(JSON.stringify([{address}]));}}}

function dateHour(){const data=new Date();const dia=data.getDate();const mes=data.getMonth();const ano=data.getFullYear();const hora=data.getHours();const min=data.getMinutes();const seg=data.getSeconds();const str_data=ano+'-'+(mes+1)+'-'+dia;const str_hora=hora+':'+ min+':'+seg;const dthrRegisterFormat=str_data + ' ' + str_hora;return dthrRegisterFormat;}

app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', config.api.port);

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization, Referer');
  next();
});

// init swagger
if (config.environment === 'local' || config.environment === 'dev') {swagger(app);}

// database
db.sequelize.sync({ false : config.db.wipe }).then(() => {console.log("   DATABASE SYNCED:\x1b[32m\x1b[1m",config.db.wipe ? ' data it\'s wiped & schema recreated' : '',"\x1b[24m\x1b[0m");});

// init server
app.listen(config.api.port, () => { console.log("   SERVIDOR ONLINE EM PORTA:\x1b[32m\x1b[1m",config.api.port,"\x1b[24m\x1b[0m");});

// painel info ws
console.log("");
console.log("\x1b[32m\x1b[1m*--------------------------METHODOS WS--------------------------*\x1b[24m\x1b[0m");
console.log("");
console.log("   STATUS WS:\x1b[32m\x1b[1m ONLINE\x1b[22m\x1b[0m        DT HR ATIVAÇÃO:\x1b[32m\x1b[1m",dateHour(),"\x1b[22m\x1b[0m");
console.log("");
console.log("   IP SERVER:\x1b[32m\x1b[1m",objIpServer[0].address.address,"\x1b[22m\x1b[0m   PORT:\x1b[32m\x1b[1m ",config.api.port,"\x1b[22m\x1b[0m");
console.log("");
console.log("\x1b[32m\x1b[1m*--------------------------METHODOS WS--------------------------*\x1b[24m\x1b[0m");
console.log("");
console.log("");
console.log("\x1b[32m\x1b[1m*--------------------------METHODOS DB--------------------------*\x1b[24m\x1b[0m");
console.log("");
console.log("   STATUS DB:\x1b[32m\x1b[1m ONLINE\x1b[22m\x1b[0m        DT HR CONEXÃO:\x1b[32m\x1b[1m",dateHour(),"\x1b[22m\x1b[0m");
console.log("");
console.log("   DB HOST:\x1b[32m\x1b[1m",config.db.host,"\x1b[22m\x1b[0m   DATABASE:\x1b[32m\x1b[1m",config.db.database,"\x1b[22m\x1b[0m");
console.log("");
console.log("\x1b[32m\x1b[1m*--------------------------METHODOS DB--------------------------*\x1b[24m\x1b[0m");
console.log("");

// load API routes
require('./app/controllers')(app);
