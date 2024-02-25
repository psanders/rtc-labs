# Happy hacking!

To start the service, use the following command:

```bash
# Remember to replace the Docker Host Address with your own
DOCKER_HOST_ADDRESS=192.168.1.3 docker compose up
```

> Wait for all the services to be "healthy". 

Then, you will need to register with Routr from a softphone like Zoiper.

The access information is as follows:

Domain: sip.local
Username: 1001
Password: 1234

After this, you can make a call to Asterisk using sip:asterisk@routr as the address of record.