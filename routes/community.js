const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Collections
const Communities = require("../models/communities");
const Comments = require("../models/comments");

mongoose.connect("mongodb://localhost/naara", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 상담게시글 board 페이지
/**
 * @swagger
 * paths:
 *  /community/clinics:
 *      get:
 *          tags: [ 커뮤니티 ]
 *          summary: "Get a clinics board page"
 *          description: 상담 게시판
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.get("/clinics", async (req, res) => {
    const page = Number(req.query.page || 1); // default page is 1, query는 String이므로 Number로 형변환 필요
    const perPage = 5;
    try {
        const total = await Communities.countDocuments({ is_deleted: false, community: "clinics" }); // 총 게시글 개수
        const postings = await Communities.find({ is_deleted: false, community: "clinics" })
                                            .sort({ created_at: -1 }) // 최신 글이 먼저 보이도록 함
                                            .skip(perPage * (page - 1)) // 검색에서 제외할 데이터 개수
                                            .limit(perPage); // 가져올 포스팅 개수
        const totalPages = Math.ceil(total / perPage);

        if (req.session.user) {
            console.log(req.session.user);
            res.send({ category: "clinics", postings: postings, total: total, totalPages: totalPages, user: req.session.user['id'] });
        } else {
            res.send({ category: "clinics", postings: postings, total: total, totalPages: totalPages });
        }
    } catch (error) {
        console.log("*** " + error);
    }
});

// 특정 상담게시글 페이지
/**
 * @swagger
 * paths:
 *  /community/clinics/{posting_id}:
 *      get:
 *          tags: [ 커뮤니티 ]
 *          summary: "Get a specific clinics posting page"
 *          description: 특정 상담 게시글
 *          parameters:
 *          -   name: "id"
 *              in: "path"
 *              description: 가져올 특정 게시글의 ObjectId
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.get("/clinics/:id", async (req, res) => {
    if (true) {
        try {
            const posting = await Communities.findById(req.params.id);
            const comments = await Comments.find({ posting: req.params.id }).sort({ _id: -1 });
            if (req.session.user) {
                res.send({ category: "clinics", posting: posting, comments: comments, user: req.session.user['id'] });
            }
            else{
                res.send({ category: "clinics", posting: posting, comments: comments});
            }
        } catch (error) {
            console.log("*** " + error);
        }
    } else {
        res.status(404).send("not found");
    }
});

// 상담게시글 작성 페이지
// 상담게시글 작성 페이지
/**
 * @swagger
 * paths:
 *  /community/clinics-write:
 *      get:
 *          tags: [ 커뮤니티 ]
 *          summary: "Get a wrtie page"
 *          description: 상담 게시글 작성 페이지
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.get("/clinics-write", async (req, res) => {
    if (req.session.user) {
        res.send({ category: "clinics", user: req.session.user['id'] });
    } else {
        res.status(404).send("not found");
    }
});

// 상담게시글 등록 처리
/**
 * @swagger
 * paths:
 *  /community/clinics-write:
 *      post:
 *          tags: [ 커뮤니티 ]
 *          summary: "Create a new clinics posting in database"
 *          description: 상담 게시글 작성
 *          parameters:
 *          -   name: "writer"
 *              in: "formData"
 *              description: 게시글 작성자의 ObejctId
 *              required: true
 *              type: "string"
 *          -   name: "inputTitle"
 *              in: "formData"
 *              description: 게시글 제목
 *              required: true
 *              type: "string"
 *          -   name: "description"
 *              in: "formData"
 *              description: 게시글 내용
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.post("/clinics-write", async (req, res) => {
    if (req.session.user) {
        try {
            let posting = new Communities();
            posting.writer = req.body.writer;
            posting.title = req.body.inputTitle;
            posting.description = req.body.inputDescription;
            posting.community = "clinics";
            posting.created_at = new Date();

            posting = await posting.save();
            res.redirect("/community/clinics");
        } catch (error) {
            res.send({text: "게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."});
            console.log("*** DB 저장 문제: " + error);
        }
    } else {
        res.status(404).send("not found");
    }
});

// 상담게시글 댓글 등록 처리
/**
 * @swagger
 * paths:
 *  /community/clinics/comment:
 *      post:
 *          tags: [ 커뮤니티 ]
 *          summary: "Create a new comment in database"
 *          description: 특정 상담 게시글에 댓글 작성
 *          parameters:
 *          -   name: "writer"
 *              in: "formData"
 *              description: 게시글 작성자의 ObejctId
 *              required: true
 *              type: "string"
 *          -   name: "posting_id"
 *              in: "formData"
 *              description: 게시글 제목의 ObejctId
 *              required: true
 *              type: "string"
 *          -   name: "description"
 *              in: "formData"
 *              description: 게시글 내용
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.post("/clinics/comment", async(req, res) => {
    if (req.session.user) {
        try {
            let comment = new Comments();
            comment.writer = req.body.writer;
            comment.posting = req.body.posting_id;
            comment.created_at = new Date();
            comment.description = req.body.description;

            comment = await comment.save();
            res.send({text: "댓글이 작성되었습니다."})
        } catch (error) {
            res.send({text: "게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."});
            console.log("*** DB 저장 문제: " + error);
        }
    } else {
        res.status(404).send("not found");
    }
});

// 질문게시글 board 페이지
/**
 * @swagger
 * paths:
 *  /community/questions:
 *      get:
 *          tags: [ 커뮤니티 ]
 *          summary: "Get a questions board page"
 *          description: 질문 게시판
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.get("/questions", async (req, res) => {
    const page = Number(req.query.page || 1); // default page is 1, query는 String이므로 Number로 형변환 필요
    const perPage = 5;
    try {
        const total = await Communities.countDocuments({ is_deleted: false, community: "questions" }); // 총 게시글 개수
        const postings = await Communities.find({ is_deleted: false, community: "questions" })
            .sort({ created_at: -1 }) // 최신 글이 먼저 보이도록 함
            .skip(perPage * (page - 1)) // 검색에서 제외할 데이터 개수
            .limit(perPage); // 가져올 포스팅 개수
        const totalPages = Math.ceil(total / perPage);
        
        if (req.session.user) {
            res.send({ category: "questions", postings: postings, total: total, totalPages: totalPages, user: req.session.user['id'] });
        }
        else {
            res.send({ category: "questions", postings: postings, total: total, totalPages: totalPages});
        }
        
    } catch (error) {
        console.log("*** " + error);
    }
});

// 특정 질문게시글 페이지
/**
 * @swagger
 * paths:
 *  /community/questions/{posting_id}:
 *      get:
 *          tags: [ 커뮤니티 ]
 *          description: 특정 질문 게시글
 *          summary: "Get a specific questions posting page"
 *          parameters:
 *          -   name: "id"
 *              in: "path"
 *              description: 가져올 특정 게시글의 ObjectId
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.get("/questions/:id", async (req, res) => {
    try {
        const posting = await Communities.findById(req.params.id);
        const comments = await Comments.find({ posting: req.params.id }).sort({ _id: -1 });
        if (req.session.user) {
            res.send({ category: "questions", posting: posting, comments: comments, user: req.session.user['id'] });
        }
        else{
            res.send({ category: "questions", posting: posting, comments: comments });
        }
    } catch (error) {
        console.log("*** " + error);
    }
});

// 질문게시글 작성 페이지
/**
 * @swagger
 * paths:
 *  /community/questions-write:
 *      get:
 *          tags: [ 커뮤니티 ]
 *          summary: "Get a wrtie page"
 *          description: 질문 게시글 작성 페이지
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.get("/questions-write", async (req, res) => {
    res.send({ category: "questions", user: req.session.user['id'] });
});

// 질문게시글 등록 처리
/**
 * @swagger
 * paths:
 *  /community/questions-write:
 *      post:
 *          tags: [ 커뮤니티 ]
 *          summary: "Create a new questions posting in database"
 *          description: 상담 게시글 작성
 *          parameters:
 *          -   name: "writer"
 *              in: "formData"
 *              description: 게시글 작성자의 ObejctId
 *              required: true
 *              type: "string"
 *          -   name: "inputTitle"
 *              in: "formData"
 *              description: 게시글 제목
 *              required: true
 *              type: "string"
 *          -   name: "description"
 *              in: "formData"
 *              description: 게시글 내용
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.post("/questions-write", async (req, res) => {
    try {
        let posting = new Communities();
        posting.writer = req.body.writer;
        posting.title = req.body.inputTitle;
        posting.description = req.body.inputDescription;
        posting.community = "questions";
        posting.created_at = new Date();

        posting = await posting.save();
        res.redirect("/community/questions");
    } catch (error) {
        res.send({text: "게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."});
        console.log("*** DB 저장 문제: " + error);
    }
});

// 질문게시글 댓글 등록 처리
/**
 * @swagger
 * paths:
 *  /community/questions/comment:
 *      post:
 *          tags: [ 커뮤니티 ]
 *          summary: "Create a new comment in database"
 *          description: 특정 상담 게시글에 댓글 작성
 *          parameters:
 *          -   name: "writer"
 *              in: "formData"
 *              description: 게시글 작성자의 ObejctId
 *              required: true
 *              type: "string"
 *          -   name: "posting_id"
 *              in: "formData"
 *              description: 게시글 제목의 ObejctId
 *              required: true
 *              type: "string"
 *          -   name: "description"
 *              in: "formData"
 *              description: 게시글 내용
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.post("/questions/comment", async (req, res) => {
    try {
        let comment = new Comments();
        comment.writer = req.body.writer;
        comment.posting = req.body.posting_id;
        comment.created_at = new Date();
        comment.description = req.body.description;

        comment = await comment.save();
        res.send({text: "댓글이 작성되었습니다."})
    } catch (error) {
        res.send(`<script>alert("게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
        console.log("*** DB 저장 문제: " + error);
    }
});

// 댓글 삭제 (질문게시판과 상담게시판 통합)
/**
 * @swagger
 * paths:
 *  /community/{comment_id}:
 *      delete:
 *          tags: [ 커뮤니티 ]
 *          summary: "Delete a comment in database"
 *          description: 특정 상담 게시글에 댓글 작성
 *          parameters:
 *          -   name: "comment_id"
 *              in: "path"
 *              description: 삭제할 댓글의 ObejctId
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.delete("/:id", async (req, res) => {
    if (req.session.user || req.session.admin) {
        try {
            await Comments.findByIdAndUpdate(req.params.id, { is_deleted: true });
            res.send({text: "성공"});
        } catch (error) {
            res.send({text: "게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."});
            console.log("*** 댓글 삭제 문제: " + error);
        }
    }
});

module.exports = router