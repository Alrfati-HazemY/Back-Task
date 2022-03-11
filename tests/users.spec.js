import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app.mjs";
import { PostModel } from "./../src/dataAccess/models/postModel.mjs";
import { UserModel } from "./../src/dataAccess/models/userModel.mjs";
import { expect } from "chai";

// Assertion Style
chai.should();
chai.use(chaiHttp);
chai.expect();

const tableTruncate = () => {
  UserModel.destroy({ where: {}, truncate: true });
}

const createUser = () => {
  UserModel.create({
    id      : 1,
    username: "testtttt",
    email: "test@test.com",
    password: "tesssssssssst",
  });
}

const createPost = () => {
  PostModel.create({
    title: "testtttt",
    content: "testtestcom",
    userId  : 1
  })
}

describe("Users API", () => {

  before((done) => {
    tableTruncate();
    done();
  });

  beforeEach( async (done)=>{
    createUser();
    done();
  })

  afterEach((done) => {
    tableTruncate();
    done();
  });

  describe("GET /api/v1/users", () => {
    it("it should get all users", (done) => {
      chai
        .request(server)
        .get("/api/v1/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("if the table is empty it will return empty array ", (done) => {
      tableTruncate();
      chai
        .request(server)
        .get("/api/v1/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.should.be.empty;
          done();
        });
    });
  });

  describe("GET /api/v1/users/:id", () => {
    it("It should get a user by ID", (done) => {
      chai
        .request(server)
        .get("/api/v1/users/1")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("if the table is empty it will return empty object", (done) => {
      tableTruncate();
      const id = 3954;
      chai
        .request(server)
        .get(`/api/v1/users/${id}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.empty;
          done();
        });
    });
  });

  describe("POST /api/v1/users", () => {
    it("It should POST a new user", (done) => {
      const user = {
        username: "Khaled",
        email: "khaled@gmail.com",
        password: "asdasdasd123",
      };
      chai
        .request(server)
        .post("/api/v1/users")
        .send(user)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.to.have.property("username").eql(user.username);
          response.body.should.to.have.property("email").eql(user.email);
          response.body.should.to.have.property("password").eql(user.password);
          done();
        });
    });

    it("if have errors in the data return error message with status code 400", (done) => {
      const user = {
        email: "khaled@gmail.com",
        password: "asdasdasd123",
      };
      chai
      .request(server)
      .post("/api/v1/users")
      .send(user)
      .end((err, response) => {
          response.text.should.be.equal('"username" is required');
          response.status.should.be.equal(400)
          done();
        });
    });

});

  describe("PUT /api/v1/users/:id" , ()=>{
    it("it should update the data", (done) => {
      const id = 1;
      const userNewData = {
        username: "hazemfsacz",
        email: "hazem@test.com",
        password: "hazemsadsa",
      }
      chai
      .request(server)
      .put(`/api/v1/users/${id}`)
      .send(userNewData)
      .end((err,response)=>{
        response.body.should.have.property('id').eql(id);
        response.body.should.have.property('username').eql(userNewData.username);
        response.body.should.have.property('email').eql(userNewData.email);
        response.body.should.have.property('password').eql(userNewData.password);
        response.status.should.be.equal(200)
        done();
      })
    })
     
  })

  describe("Delete /api/v1/users/:id" , ()=>{
    it("it should delete the user", (done) => {
      const id = 1;
      chai
      .request(server)
      .delete(`/api/v1/users/${id}`)
      .end((err,response)=>{
        response.status.should.be.equal(204)
        done();
      })
    })
  })

  describe("GET /api/v1/users/:id/posts" , ()=>{
    it("it should get all posts for the user", (done) => {
      const id = 1;
      createUser();
      createPost();
      chai
      .request(server)
      .get(`/api/v1/users/${id}/posts`)
      .end((err,response)=>{
        response.status.should.be.equal(200)
        response.body.should.be.a("object")
        response.body.should.be.have.property("posts").a("array");
        done();
      })
    })
  })
});