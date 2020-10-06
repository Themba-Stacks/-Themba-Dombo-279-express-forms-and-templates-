const supertest = require('supertest');
const Visitor = require('../models/newVisitor');
const finishTestcase = require('jasmine-supertest');

describe("Routing for the server", ()=>{
    let server;
    beforeEach(()=>{
        delete require.cache[require.resolve('../app')];
        server = require('../app');
    });
    afterEach((done)=>{
        server.close(done);
    });

    it('should give error if unspecified route is loaded',(done)=>{
        const app = supertest(server);
        app.get('/').expect(404).end(finishTestcase(done));
    });

    it('should give error if unspecified route is loaded',(done)=>{
        const app = supertest(server);
        app.get('/name').expect(404).end(finishTestcase(done));
    });

    it('/new_visitor should load successfully',(done)=>{
        const app = supertest(server);
        app.get('/new_visit').expect(200).end(finishTestcase(done));
    });

    it('/save should load successfully',(done)=>{
        const app = supertest(server);
        app.post('/save').expect(200).end(finishTestcase(done));
    });
});

describe('POST /save', function() {
    let server;
    beforeEach(()=>{
        delete require.cache[require.resolve('../app')];
        server = require('../app');
        
    });
    afterEach((done)=>{
        server.close(done);
    });

    it("should send data to db and recieve data back from db", async ()=>{
        const dataTest = {
            name: 'Gloria',
            assistedBy: 'Maria',
            age: '24',
            dateOfVisit: '10/01/2019',
            timeOfVisit: '11:11',
            comments: 'fetch my keyboard'
        }

        await supertest(server)
            .post('/save')
            .send(dataTest)
            .expect(200)
            .then( async ()=> {
                const post = await Visitor.findOne({name:'Gloria'})
                expect(post._id).toBeTruthy()
                expect(post.name).toBe('Gloria')
                expect(post.assistedBy).toBe('Maria')
                expect(post.age).toBe('24')
                expect(post.dateOfVisit).toBe('10/01/2019')
                expect(post.timeOfVisit).toBe('11:11')
                expect(post.comments).toBe('fetch my keyboard')
                
            })
    })
  });