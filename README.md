
<!-- link: https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/ -->

# Reactjs nodejs docker

## Build:
- Client:
`cd client`
`docker build -f Dockerfile -t client .`
`docker run -it -p 4001:3000 client`

- Server:
`cd client`
`docker build -f Dockerfile -t server .`
`docker run -it -p 4002:3001 server`

## Rum docker compose:
`docker-compose up --build`


## Open:

client: localhost:3050
database: localhost:8000

