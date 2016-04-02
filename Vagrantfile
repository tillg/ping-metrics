# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  
  config.vm.define "graphserver" do |graphserver|
    graphserver.vm.hostname = "graphserver"
    graphserver.vm.network "forwarded_port", guest: 3000, host: 3000
    graphserver.vm.provider "virtualbox" do |v|
      v.memory = 512
      v.cpus = 1
    end
    graphserver.vm.provision "ansible" do |ansible|
      ansible.playbook = "graphserver.yml"
      ansible.sudo = true
    end
  end
  
  config.vm.define "pingcollector" do |pingcollector|
    pingcollector.vm.hostname = "pingcollector"
    pingcollector.vm.provider "virtualbox" do |v|
      v.memory = 512
      v.cpus = 1
    end
    pingcollector.vm.provision "ansible" do |ansible|
      ansible.playbook = "pingcollector.yml"
      ansible.sudo = true
    end
    
  end
end
