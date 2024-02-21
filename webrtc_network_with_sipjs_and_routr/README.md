# WebRTC Network with SIP.js and Routr

This is a simple example of a WebRTC network using SIP.js and Routr. The network consists of a SIP proxy (Routr) and two WebRTC clients (John and Jane). The clients are able to make and receive calls from each other.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js >= 18.x.x](https://nodejs.org/en/)
- [Routr CTL](https://npmjs.com/@routr/ctl)

## Starting the network

To start the network, run the following command:

```bash
DOCKER_HOST_ADDRESS=192.168.1.7 docker compose up
```

Be sure to change the `DOCKER_HOST_ADDRESS` environment variable to the IP address of the host machine. This is necessary for both clients to be able to connect to the SIP proxy.

In addition to Routr, the previous command will start two WebRTC client at [http://localhost:8080](http://localhost:8080). You must open two different browsers to simulate two different clients.

## Configuring Routr

## Setting the clients

When ask for credentials, use the following:

For John Doe:

- Username: 1001
- Password: 1234
- Domain: sip.local
- Signal Server: `ws://localhost:5062`

For Jane Doe:

- Username: 1002
- Password: 1234
- Domain: sip.local
- Signal Server: `ws://localhost:5062`

## Making a call

To make a call please use the `Target AOR` field. For example, to call Jane, enter `sip:1002@sip.local` and click the call button.

## Getting help

If you have a bug report, please file an issue in this repository's Issue Tracker. For questions or feedback, please join Fonoster's community on [Discord](https://discord.gg/4QWgSz4hTC).
