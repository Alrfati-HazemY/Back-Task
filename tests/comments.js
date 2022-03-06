let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Comments API", () => {
  // Test the GET route
  describe("GET /api/v1/comments", () => {
    it("It should get all the comments", (done) => {
      chai
        .request(server)
        .get("/api/v1/comments")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should not get all the comments", (done) => {
      chai
        .request(server)
        .get("/api/v1/comment")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET (By id) route
  describe("GET /api/v1/comments/:id", () => {
    it("It should get a comment by ID", (done) => {
      const commentId = 4;
      chai
        .request(server)
        .get(`/api/v1/comments/${commentId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should not get a comment by ID", (done) => {
      const commentId = 3954;
      chai
        .request(server)
        .get(`/api/v1/comments/${commentId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the POST route

  describe("POST /api/v1/comments", () => {
    it("It should POST a new comment", (done) => {
      const post = {
        title: "Travel",
        content: "Nice",
        userId: 8,
        postId: 4,
      };
      chai
        .request(server)
        .post("/api/v1/comments")
        .send(post)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
