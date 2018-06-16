const axios = require('axios');
const fs = require('fs');
let connection;

function getServerStatus(connectionObj) {
    connection = connectionObj;

    connection.query('SELECT * from server WHERE `httpd` = "apache"', (err, rows) => {
        if (err) {
            console.log('Error while performing Query.');
        } else {
            rows.forEach(element => {
                const address = element.address;
                const port = element.port;
                const serverId = element.server_id;
                const params = '/server-status?view=json&auto';
                const serverStatusUrl = 'http://' + address + ':' + port + params;
                axios.get(serverStatusUrl)
                    .then(response => {
                        // write response to a temp file
                        const tempFilePath = './temp/temp-' + address + '.txt';
                        fs.writeFileSync(tempFilePath, response.data);
                        // parse required data from a file
                        const parsedData = parseServerData(tempFilePath);
                        saveServerStatus(parsedData, serverId);
                    })
                    .catch(error => {
                        console.log('Error while getting response' + error);
                    });
            });
        }
    });
}

function parseServerData(tempFilePath) {
    const array = fs.readFileSync(tempFilePath).toString().split("\n");
    let accesses = 0;
    let kBytes = 0;
    let activeConnections = 0;
    for (i in array) {
        if (array[i].indexOf('Total Accesses') !== -1) {
            accesses = array[i].split(': ')[1];
        }
        if (array[i].indexOf('Total kBytes') !== -1) {
            kBytes = array[i].split(': ')[1];
        }
        if (array[i].indexOf('BusyWorkers') !== -1) {
            activeConnections = array[i].split(': ')[1];
        }
    }

    return { accesses, kBytes, activeConnections };
}

function saveServerStatus(parsedData, serverId) {
    const ts = Math.round((new Date()).getTime() / 1000);
    const accesses = parsedData.accesses;
    const kBytes = parsedData.kBytes;
    const activeConnections = parsedData.activeConnections;

    var values = [[serverId, ts, accesses, kBytes, activeConnections]];
    if(accesses && kBytes && activeConnections) {
        var sql = "INSERT INTO server_status (server_id, time, total_requests, total_kbytes, active_connections) VALUES ?";

        connection.query(sql, [values], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('1 record added');
            }
        })
    }
}

module.exports = getServerStatus;