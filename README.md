## web-server-status-monitor
A program that can be used to monitor statistics detailing how web servers are currently performing and store those statistics in a database.

# Installation instructions
* Assumpations
  * `node` and `npm` is installed on your machine.
  * `MySQL` database and `Apache web server` is installed and set up

> Steps to follow

1. Open your terminal.
2. Clone the repo.
```
git clone https://github.com/Nirav1210/web-server-status-monitor.git
``` 

3. Go into the directory.
```
cd web-server-status-monitor
```

4. install dependencies
```
npm install
```

5. You will need a **MySQL** database with 2 tables:

```sql
CREATE TABLE `server` (
  `server_id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `httpd` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `port` int(11) unsigned NOT NULL,
  PRIMARY KEY (`server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `server` (`name`, `httpd`, `address`, `port`)
VALUES
  ('Server 1', 'nginx', '23.21.188.7', 8080),
  ('Server 2', 'apache', '23.21.188.7', 8180),
  ('Server 3', 'lighttpd', '23.21.188.7', 8280);

CREATE TABLE `server_status` (
  `time` int(11) unsigned NOT NULL,
  `server_id` int(11) unsigned NOT NULL,
  `total_requests` int(11) unsigned NOT NULL,
  `total_kbytes` int(11) unsigned NOT NULL,
  `active_connections` int(11) unsigned NOT NULL,
  KEY `server_id` (`server_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

6. Database configuration
> Database `user`, `password` and `database name` are stored in a `config.ini` file. which you will have to configure for your project. example of the content inside config.ini file :

```
[database]
user = root
password = ''
database = web_server_status_monitor 
```
7. Run the application
```
npm start
```

8. The database table (`server_status`) will be populated with the data and a message will appear in the terminal saying `{n} record added`.

> Note - The script is implemented to run only for one type (**Apache** web sever) of the format of their `server-status` page. An example is shown below.

# Apache server-status format example for localhost

```
localhost
ServerVersion: Apache/2.4.33 (Unix) OpenSSL/1.0.2o PHP/7.2.5 mod_perl/2.0.8-dev Perl/v5.16.3
ServerMPM: prefork
Server Built: May  9 2018 09:43:38
CurrentTime: Friday, 15-Jun-2018 21:21:55 EDT
RestartTime: Thursday, 14-Jun-2018 00:07:38 EDT
ParentServerConfigGeneration: 1
ParentServerMPMGeneration: 0
ServerUptimeSeconds: 162857
ServerUptime: 1 day 21 hours 14 minutes 17 seconds
Load1: 2.39
Load5: 2.29
Load15: 2.36
Total Accesses: 163
Total kBytes: 651
CPUUser: 7.64
CPUSystem: 2.54
CPUChildrenUser: 0
CPUChildrenSystem: 0
CPULoad: .00625088
Uptime: 162857
ReqPerSec: .00100088
BytesPerSec: 4.09331
BytesPerReq: 4089.72
BusyWorkers: 2
IdleWorkers: 8
Scoreboard: ____W_..K.___...................................................................................................................................................................................................................................................
TLSSessionCacheStatus
CacheType: SHMCB
CacheSharedMemory: 512000
CacheCurrentEntries: 0
CacheSubcaches: 32
CacheIndexesPerSubcaches: 88
CacheIndexUsage: 0%
CacheUsage: 0%
CacheStoreCount: 0
CacheReplaceCount: 0
CacheExpireCount: 0
CacheDiscardCount: 0
CacheRetrieveHitCount: 0
CacheRetrieveMissCount: 0
CacheRemoveHitCount: 0
CacheRemoveMissCount: 0
```