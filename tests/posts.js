let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Posts API", () => {
  // Test the GET route
  describe("GET /api/v1/posts", () => {
    it("It should get all the posts", (done) => {
      chai
        .request(server)
        .get("/api/v1/posts")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should not get all the posts", (done) => {
      chai
        .request(server)
        .get("/api/v1/post")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET (By id) route
  describe("GET /api/v1/posts/:id", () => {
    it("It should get a post by ID", (done) => {
      const postId = 4;
      chai
        .request(server)
        .get(`/api/v1/posts/${postId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should not get a post by ID", (done) => {
      const postId = 3954;
      chai
        .request(server)
        .get(`/api/v1/posts/${postId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the POST route

  describe("POST /api/v1/posts", () => {
    it("It should POST a new post", (done) => {
      const post = {
        title: "park",
        content: "great",
        userId: 8,
      };
      chai
        .request(server)
        .post("/api/v1/posts")
        .send(post)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
