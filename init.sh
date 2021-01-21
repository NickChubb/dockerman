#!/usr/bin/env bash

BASEDIR=$(pwd)

# Replace dockerman.service with current information
sed -i "/ExecStart=/c\ExecStart=$BASEDIR/server.ts" dockerman.service
sed -i "/WorkingDirectory=/c\WorkingDirectory=$BASEDIR" dockerman.service
sed -i "/User=/c\User=$USER" dockerman.service

# Copy dockerman.service to systemd
sudo cp dockerman.service /etc/systemd/system/

# Start dockerman.service
systemctl start dockerman