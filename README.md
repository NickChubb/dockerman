# DockerMan(ager) (Inactive 🚫)

A simple server-side docker controller made with React.  Useful as a web backend for serving up containers.

**🛠️ Tech Stack: JavaScript, React.js, Express.js, Node.js, Docker.js, SQLite**

I am currently no longer working on this project, as I have moved to using [Vercel](https://vercel.com/home) for hosting my personal portfolio website and other projects.

## Photos

### Home

![Container View](https://i.imgur.com/7I1RGFl.png)

### Config Options

![Config screen](https://i.imgur.com/TDxDVSc.png)

### Activity Log Screen

![Log Screen](https://i.imgur.com/E3zizY1.png)

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

- Additional security features (Email to admin on unsuccessful login attempt, etc.)
- Deploy programs as containers based on Docker scripts
- Updating config screen to be more user friendly
- Display more server information (memory, storage, etc.)
- Demo dockerman app
