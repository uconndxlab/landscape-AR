## First Time Deployment Notes/Steps
#### The following are notes taken when first deploying a development environment of the LA-AR WebApi to the dxdev info box VM. These steps can be replicated to redeploy the API on another VM.

1. Installed .NET 7 SDK (which includes the runtime) by running the following command: ```sudo apt-get install -y dotnet-sdk-7.0```
2. As of now, did not run this command (which installs a bunch of libraries that usually are automatically installed when using a package manager, but I want to keep this command here: ```sudo apt install -y libc6 libgcc1 libgcc-s1 libgssapi-krb5-2 libicu70 liblttng-ust1 libssl3 libstdc++6 libunwind8 zlib1g```
3. Created a new file at: ```/etc/systemd/system/landscape-architecture-WebAPI.service``` with the following contents:
```
[Unit]
Description=LandscapeArchitectureWebApi

[Service]
WorkingDirectory=/var/www/LAAR-WebApi.dxgdev.info
ExecStart=/usr/bin/dotnet /var/www/LAAR-WebApi.dxgdev.info/landscape-architecture.WebAPI.dll
Restart=always
RestartSec=10
SyslogIdentifier=LandscapeArchitectureWebApi
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Debug
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=true

[Install]
WantedBy=multi-user.target
```
4. Since this file represents a service, and we want the service to automatically restart if the VM reboots, I ran this command: ```sudo systemctl enable landscape-architecture-WebAPI.service```
5. Ran the following command to make a directory to store the project: ```sudo mkdir /var/www/LAAR-WebApi.dxgdev.info```
6. Next, created a server file for the nginx project using the command: ```sudo nano /etc/nginx/sites-enabled/LAAR-WebApi.dxgdev.info```. The contents of the file currently are as follows:
```
server {
        root /var/www/LAAR-WebApi.dxgdev.info/;
        index index.html index.htm index.nginx-debian.html;
        server_name LAAR-WebApi.dxgdev.info;

        location / {
                proxy_pass http://localhost:5000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection keep-alive;
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```
7. Setup and configured mysql server
8. Deployment completed by Github Actions Workflow to achive an automated CI/CD pipeline.

