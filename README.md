# ping-metrics

A complete setup to measure ping times over longer periods (days, months, years) and visualize them. By "complete setup" we mean virtual machines including scripts to create them, spin them up, provision them.

#Stack used
- [ping-statsd-agent](https://github.com/garo/ping-statsd-agent)
- [statsd](https://github.com/etsy/statsd)
- [Telegraf](https://github.com/influxdata/telegraf)
- InfluxDB
- Grafana

Those things work together as follows:

![ping-metrics-overview](https://www.lucidchart.com/publicSegments/view/da16a7d3-2adb-4094-b514-fdc8fde89fcf/image.png)


#Includes
The repo should contain (one day):
- All scripts
- A guide to set up a complete tool chain including the virtual machines
- A test/demo environment to show what it looks like

#Install & Run
###Pre requisites

- Installed Vagrant 
- Virtualbox installed

###Install & run

- `clone <this repo>`
- `cd <into the repo u just cloned>`
- `vagrant up` - Now 2 VMs should be created and installed.
    In case it fails, it often helps to re-run a `vagrant provision`, especially for the GraphServer. The command would then be `vagrant provision graphserver`
- Go to [http://localhost:3000/login](http://localhost:3000/login). Login is

#Literature
- [Getting Started with Sending StatsD Metrics to Telegraf & InfluxDB](https://influxdata.com/blog/getting-started-with-sending-statsd-metrics-to-telegraf-influxdb/): A good explanation of how things work and should be configured
- [Grafana and ping](https://hveem.no/visualizing-latency-variance-with-grafana): This guy did something similar, although his setup is all on one box.
- The [link](https://www.lucidchart.com/documents/edit/a8be9ce0-9252-4434-973a-cbef01bf6335#) to the LucidCharts document with the overview drawing
