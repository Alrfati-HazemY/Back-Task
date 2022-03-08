import chai from 'chai'
import chaiHttp from 'chai-http'
import {server} from '../src/index.mjs';

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Users API", () => {
  // Test the GET route
  describe("GET /api/v1/users", () => {
    it("It should get all the users", (done) => {
      chai
        .request(server)
        .get("/api/v1/users")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should not get all the users", (done) => {
      chai
        .request(server)
        .get("/api/v1/user")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET (By id) route
  describe("GET /api/v1/users/:id", () => {
    it("It should get a user by ID", (done) => {
      const userId = 1;
      chai
        .request(server)
        .get(`/api/v1/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should not get a user by ID", (done) => {
      const userId = 3954;
      chai
        .request(server)
        .get(`/api/v1/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the POST route

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
          done();
        });
    });

    it("It should not POST a new user", (done) => {
      const user = {
        email: "khaled@gmail.com",
        password: "asdasdasd123",
      };
      chai
        .request(server)
        .post("/api/v1/users")
        .send(user)
        .end((err, response) => {
          response.text.should.be.eq(
            "notNull Violation: users.username cannot be null"
          );
          done();
        });
    });
  });
});
