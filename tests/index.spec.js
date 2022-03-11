import chai from 'chai'
import chaiHttp from 'chai-http'
import {server} from '../src/app.mjs';

// Assertion Style
chai.should();
chai.use(chaiHttp);
let expect = chai.expect()

describe('app file', (done) => { 
    it('GET /' , ()=>
    chai
    .request(server)
    .get('/')
    .end((err,response)=>{
        response.text.should.be.equal("Welocme To Node API!");
        done();
    })
    )})