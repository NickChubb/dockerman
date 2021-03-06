# DockerMan(ager)

A simple server-side docker controller made with React.  Useful as a web backend for serving up containers.

![Container View](https://i.imgur.com/FtDWSMN.png)

## Features

Updating frequently.

### 1. Docker Controls

- Start/Stop/Restart containers
- Easily forward a port from docker to the web

### 2. Docker Images Controls

- View all images
- Prune unused images to free up space.

### 3. Password Protected

- Admin username and password required to log in for security
- Config screen to simply change configuration settings
- Custom timeouts for too many incorrect login attempts

## Config

### auth

- **username:** Admin login username
- **password:** Admin login password

### domain

- **domainName:** Root domain name the app is being hosted on

### security

- **alertIncorrectLogin:** Send email to admin email address (emailAddress) upon unsuccessful login attempt
- **alertSuccessfulLogin:** Send email to admin email address (emailAddress) upon successful login attempt
- **emailAddress:** Email address to be alerted with updates
- **maxLoginAttempts:** Maximum incorrect login attempts before timing out login
- **loginTimeout:** Length of time in seconds (s) to timeout upon exceeding maxLoginAttempts

## Coming Soon (when I have time)

- Additional security features (Email to admin on unsuccessful login attempt, timeouts after too many login attempts, etc.)
- Deploy programs as containers based on Docker scripts
- Updating config screen to be more user friendly
- Display more server information (memory, storage, etc.)
- Major React refactors to make different screens work consistently
- Demo dockerman app
