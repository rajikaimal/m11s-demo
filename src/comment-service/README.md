# post-service

## Install

```
$ npm i
$ PORT=XXX dbConnection=XXX node index.js
```

### Docker

```
$ docker build -t post-service
$ docker run -d -it -p 80:PORT post-service
```
