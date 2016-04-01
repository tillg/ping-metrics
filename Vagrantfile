# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.define "influx1" do |machine|
    machine.vm.hostname = "influx1"
    machine.vm.provider "virtualbox" do |v|
      v.memory = 512
      v.cpus = 1
    end
    machine.vm.provision "ansible" do |ansible|
      ansible.playbook = "influx-grafana.yml"
      ansible.sudo = true
    end
  end
end
