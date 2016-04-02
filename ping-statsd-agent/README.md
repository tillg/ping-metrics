# ping-statsd-agent

This is a simple script which pings remote hosts with ICMP ping and sends the latency (or error) into statsd for monitoring.

It's copied over from [here](https://github.com/garo/ping-statsd-agent). The git repo is not integrated, I just copied over the files (because Binh didn't want to help me).

##Installing & Running it
Go in the directory where the `main.js` and `hosts.json` files are

- `npm install`
- `node main.js hosts.json`
