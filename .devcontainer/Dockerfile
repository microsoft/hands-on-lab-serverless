FROM mcr.microsoft.com/devcontainers/dotnet:7.0-jammy

RUN sudo apt-get update 

## Install Redis client toolings
RUN su vscode -c "umask 0002 && sudo apt-get install redis-tools -y 2>&1"

## Install the curl client
RUN su vscode -c "sudo apt-get install curl"