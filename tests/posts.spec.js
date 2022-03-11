import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app.mjs";
import { PostModel } from "./../src/dataAccess/models/postModel.mjs";
import { UserModel } from "./../src/dataAccess/models/userModel.mjs";
import { CommentModel } from "../src/dataAccess/models/commentModel.mjs";
import { expect } from "chai";

// Assertion Style
chai.should();
chai.use(chaiHttp);
chai.expect();

const tableTruncate = () => {
  PostModel.destroy({ where: {}, truncate: true });
}

const createUser = () => {
  UserModel.create({
    id      : 10,
    username: "testtest",
    email: "test@test.com",
    password: "test123456",
  });
}

const createPost = () => {
  PostModel.create({
    id   : 1,
    title: "post1",
    content: "Hello World",
    userId  : 10
  })
}

const createComment = () => {
  CommentModel.create({
    id : 1,
    title : "comment title one",
    content : "comment content one",
    userId  : 10,
    postId : 1
  })
}

describe("Posts API", () => {

  before((done) => {
    tableTruncate();
    createUser();
    done();
  });

  beforeEach( (done)=>{
    createPost();
    done();
  })

  afterEach((done) => {
    tableTruncate();
    done();
  });

  describe("GET /api/v1/posts", () => {

    it("It should get all the posts", (done) => {
      chai
        .request(server)
        .get("/api/v1/posts")
        .end((err, response) => {
          response.body.should.be.a("array");
          response.should.have.status(200);
          done();
        });
    });

    it("if the table is empty it will return empty array", (done) => {
      tableTruncate();
      chai
        .request(server)
        .get("/api/v1/posts")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.should.be.empty;
          done();
        });
    });
  });

  describe("GET /api/v1/posts/:id", () => {
    it("It should get a post by ID", (done) => {
      const id = 1;
      chai
        .request(server)
        .get(`/api/v1/posts/${id}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("if the table is empty it will return empty object", (done) => {
      const postId = 3954;
      chai
        .request(server)
        .get(`/api/v1/posts/${postId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.empty;
          done();
        });
    });
  });

  describe("POST /api/v1/posts", () => {
    it("It should POST a new post", (done) => {
      const post = {
        title: "parkpark",
        content: "greatgreats",
        userId: 10,
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

    it("if have errors in the data return error message with status code 400", (done) => {
      const post = {
        title: "po",
        content: "Hello Post",
      };
      chai
      .request(server)
      .post("/api/v1/posts")
      .send(post)
      .end((err, response) => {
          response.text.should.be.equal('"title" length must be at least 3 characters long');
          response.status.should.be.equal(400)
          done();
        });
    });

    it("if have errors in the data in database will return error message", (done) => {
      const post = {
        title: "pooooooo",
        content: "Hello Post",
        userId: 999
      };
      chai
      .request(server)
      .post("/api/v1/posts")
      .send(post)
      .end((err, response) => {
          response.text.should.be.equal('"SQLITE_CONSTRAINT: FOREIGN KEY constraint failed"');
          response.status.should.be.equal(200)
          done();
        });
    });

  })

    describe("PUT /api/v1/posts/:id" , ()=>{
      it("it should update the data", (done) => {
        const id = 1;
        const postNewData = {
          title: "popopopopopo",
          content: "Hello Post",
        }
        chai
        .request(server)
        .put(`/api/v1/posts/${id}`)
        .send(postNewData)
        .end((err,response)=>{
          response.body.should.have.property('id').eql(id);
          response.body.should.have.property('title').eql(postNewData.title);
          response.body.should.have.property('content').eql(postNewData.content);
          response.status.should.be.equal(200)
          done();
        })
      })
    })

    describe("Delete /api/v1/posts/:id" , ()=>{
      it("it should delete the post", (done) => {
        const id = 1;
        chai
        .request(server)
        .delete(`/api/v1/posts/${id}`)
        .end((err,response)=>{
          response.status.should.be.equal(204)
          done();
        })
      })
    })

    describe("GET /api/v1/posts/:id/comments" , () => {
      it("it should get all comments for the post", (done) => {
        const id = 1;
        createComment();
        chai
        .request(server)
        .get(`/api/v1/posts/${id}/comments`)
        .end((err,response)=>{
          response.status.should.be.equal(200)
          response.body.should.be.a("object")
          response.body.should.be.have.property("comments").a("array");
          done();
        }) 
      })
    })

});