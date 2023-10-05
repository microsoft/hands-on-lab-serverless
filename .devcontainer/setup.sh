#!/bin/sh 

## Grab the latest version of the Ubuntu package repository
RUN sudo apt-get update 

## Install the curl client
RUN su vscode -c "sudo apt-get install curl"

# Prepare static web app assets
npm install -g @azure/static-web-apps-cli
