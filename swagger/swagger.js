const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "NaARa API",
            description: "NaARa API description...",
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.js", "./server.js"]
}

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs }