let options = {
    swaggerDefinition: {
        info: {
            description: 'A ToDo server writen in NodeJS \\w Express & Mongoose',
            title: 'ToDo Server',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '',
        produces: [
            "application/x-www-form-urlencoded",
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname, 
    files: ['./routes/**/*.js'] 
}

module.exports = options