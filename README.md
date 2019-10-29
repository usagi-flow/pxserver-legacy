<div style="text-align:center"><img alt="pxserver" src="https://bitbucket.org/eti_pixel/pxserver/raw/b7b895f0f7f60c1c85aa350281cee358cd2ef8f9/assets/pxserver.png"/></div>


## ![](https://raw.githubusercontent.com/google/material-design-icons/master/maps/1x_web/ic_directions_run_black_18dp.png) Getting started

You'll need [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

In the project directory:
```
docker-compose up --build
```

To start as a daemon, and show logs:
```
docker-compose up --build -d && docker-compose logs -f
```

## ![](https://raw.githubusercontent.com/google/material-design-icons/master/action/1x_web/ic_build_black_18dp.png) Building and running locally

### Building

Building requires [Node](https://nodejs.org) and [Yarn](https://yarnpkg.com).

In the project directory:

```
( cd backend && yarn install && yarn run build && cd .. && mv app app.backend && cd app.backend && ln -s ../backend/node_modules node_modules )
( cd frontend && yarn install && yarn run build && cd .. && mv app app.frontend && cd app.frontend && ln -s ../frontend/node_modules node_modules )
```

The build output can be found in the `app.backend` and `app.frontend` directories.

### Running

Start a [redis](https://redis.io) instance and configure a socket (see `unixsocket` in `redis/redis.conf`).

In the project directory, execute in parallel:
```
( export SOCKET=path/to/the/redis.sock && cd app.backend && yarn run start; cd .. )
( export SOCKET=path/to/the/redis.sock && cd app.frontend && yarn run start; cd .. )
```