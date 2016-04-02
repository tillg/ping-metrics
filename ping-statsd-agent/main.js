
var fs = require('fs');
var ping = require('net-ping');
var SDC = require('statsd-client');
var dns = require('dns');
var microtime = require('microtime');

// Last data to print info if config has changed
var lastdatastring = "";

// This contains the most recent config, updated by interval timers
var globaldata = null;

var statsd = null;
var globaltimer = null;
var configfile = process.argv.slice(2)[0];

if (!configfile) {
	console.error("Pass config json as first argument");
	process.exit(1);
}


console.log("Loading config from " + configfile);


// Session factory is used to construct ping sessions with unique configuration (like ttl, packet size etc)
var sessions = {};
function sessionFactory(options) {
	var id = JSON.stringify(options);
	if (sessions[id]) {
		return sessions[id];
	} 

	sessions[id] = ping.createSession(options);

	return sessions[id];
}

function loadConfig(filename, cb) {

	fs.readFile(filename, "utf8", function (err, str) {
		if (err) {
			console.err("Error on reading file " + filename + ": err" + err);
			return;
		}

		var data = null;
		try {
			data = JSON.parse(str);
			if (str != lastdatastring) {
				console.log("New config", data);
			}
			lastdatastring = str;
		} catch (e) {
			console.error("JSON syntax error: " + e + " from file " + filename);
		}

		if (data) {
			cb(null, data);
		}
	});
}

// Starts asynchronous ping operations on all hosts. Assumes this is called on regular intervals
function pingHosts(data) {
	if (data == null || data["hosts"] == null) {
		return;
	}

	for (var i in data.hosts) {
		pingHost(data.hosts[i]);
	}
}

function pingHost(host) {
	var options = {
	    networkProtocol: ping.NetworkProtocol.IPv4,
	    packetSize: host.packetsize || 32,
	    retries: host.retries || 0,
	    timeout: host.timeout || 1000,
	    ttl: host.ttl || 32
	};

	if (host.family && host.family == 6) {
		options.networkProtocol = ping.NetworkProtocol.IPv6;
	}

	var session = sessionFactory(options);
	var start = microtime.now();
	session.pingHost(host.ip, function (error, target, sent, rcvd) {
		if (error) {
			if (error instanceof ping.RequestTimedOutError) {
				statsd.increment("ping." + host.host + ".timeout");
			} else {
				console.error(target + ": " + error.toString());
			}
		} else {
			var end = microtime.now();
			var ms = (end - start) / 1000;
			statsd.timing("ping." + host.host + ".timing", ms);
		}
	});
}

function initConfiguration(filename) {
	loadConfig(configfile, function(err, data) {

		var next = function() {
			statsd = new SDC(data.statsd);	
			globaldata = data;
			if (globaltimer == null) {
				console.log("Setting timer")
				globaltimer = setInterval(function() {
					pingHosts(globaldata);
				}, data.interval || 1000);			
			}			
		};

		(function iter(i) {
			if (i < 0) {
				next();
				return;
			}

			if (data.hosts[i].host) {
				dns.lookup(data.hosts[i].host, 4, function onLookup(err, address, family) {
					if (err) {
						console.error("Could not resolve " + data.hosts[i].host + "due to", err);
					} else {
						data.hosts[i].ip = address;
						data.hosts[i].family = family;					
					}
					iter(i - 1);
				});				
			} else {
				iter(i - 1);
			}


		})(data.hosts.length - 1);
	});
}

fs.watch(configfile, function (event, filename) {
	console.log("file event:", event);
	initConfiguration(configfile);
});

setInterval(function() {
	initConfiguration(configfile);
}, 10 * 1000);

initConfiguration(configfile);
