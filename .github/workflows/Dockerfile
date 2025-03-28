#This Dockerfile is used while testing github actions using nektos/act
FROM catthehacker/ubuntu:act-latest
ARG DEBIAN_FRONTEND=noninteractive

RUN curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

#ENV PATH="/usr/bin/az:$PATH"

WORKDIR /app

CMD ["/bin/bash", "-c", "echo 'Azure CLI version:' && az --version && which az && echo PATH=$PATH"]
