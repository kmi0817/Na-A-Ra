const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "NaARa API",
            description: "NaARa API description...",
            termsOfService: "http://localhost:3000",
            contact: {
                email: "kmi0817@naver.com"
            }
        },
        tags: [
            {
                name: "관리자",
                description: "관리자 페이지에서 사용하는 API"
            },
            {
                name: "커뮤니티",
                description: "커뮤니티 페이지에서 사용하는 API"
            },
            {
                name: "마이페이지",
                description: "마이페이지 페이지에서 사용하는 API"
            },
            {
                name: "병원 리뷰",
                description: "병원 리뷰 페이지에서 사용하는 API"
            },
            {
                name: "검색",
                description: "검색 페이지에서 사용하는 API"
            },
            {
                name: "처리",
                description: "회원가입, 로그인, 로그아웃, 병원 신고 접수에서 사용하는 API"
            }
        ]
    },
    apis: ["./routes/*.js", "./server.js"]
}

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs }
