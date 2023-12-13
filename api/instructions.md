1.Init project and structure:
-npm init -y; npm i express; npm i nodemon -D
-"scripts": {
    "start": "nodemon src/index.js"

2.Setup developer environment
3.Configure bodyparser:
-app.use(express.urlencoded({ extended: false }));