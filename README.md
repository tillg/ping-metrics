# ping-metrics

A complete setup to measure ping times over longer periods (days, months, years) and visualize them. By "complete setup" we mean virtual machines including scripts to create them, spin them up, provision them. 

Stack used:
- Probably the [ping-statsd-agent](https://github.com/garo/ping-statsd-agent)
- [statsd](https://github.com/etsy/statsd)
- Telegraf
- InfluxDB
- Grafana

Includes:
- All scripts
- A guide to set up a complete tool chain including the virtual machines
- A test/demo environment to show what it looks like

Literature 
- [Getting Started with Sending StatsD Metrics to Telegraf & InfluxDB](https://influxdata.com/blog/getting-started-with-sending-statsd-metrics-to-telegraf-influxdb/): A good explanation of how things work and should be configured
- [Grafana and ping](https://hveem.no/visualizing-latency-variance-with-grafana): This guy did something similar, although his setup is all on one box. 
