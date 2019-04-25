const {expect} = require('chai');
const db = require('../../models');
const {FindCourse, CreateCourse} = require('../../Services/Courses/Course_DB');

describe('course test suite', ()=>{
    it('should return a course based on a search of course id', async ()=>{
        const user = await CreateDummyUser();
        const dummy_course = await CreateDummyCourse(user.id);

        const course = await FindCourse({id:dummy_course.id});
        await DestroyDummyUser(user);
        await DestroyDummyCourse(course);

        expect(course).to.be.an('object');
        expect(course).to.have.property('user_id');
        expect(course).to.have.property('title');
        expect(course).to.have.property('description');
        expect(course).to.have.property('status');
        expect(course.title).to.equal('test title');
        expect(course.description).to.equal('test description');
        expect(course.status).to.equal('draft');
    });
    it('should return a course based on a search of  title', async ()=>{
        const user = await CreateDummyUser();
        const dummy_course = await CreateDummyCourse(user.id);

        const course = await FindCourse({title:dummy_course.title});
        await DestroyDummyUser(user);
        await DestroyDummyCourse(course);

        expect(course).to.be.an('object');
        expect(course).to.have.property('user_id');
        expect(course).to.have.property('title');
        expect(course).to.have.property('description');
        expect(course).to.have.property('status');
        expect(course.title).to.equal('test title');
        expect(course.description).to.equal('test description');
        expect(course.status).to.equal('draft');
    });
    it('should return null based on a search of  title', async ()=>{
        const user = await CreateDummyUser();
        const dummy_course = await CreateDummyCourse(user.id);

        const course = await FindCourse({title:'gobldy gook'});
        await DestroyDummyUser(user);
        await DestroyDummyCourse(dummy_course);

        expect(course).to.be.null;
    });

    it('should return a newly created course object', async ()=>{
        const user = await CreateDummyUser();
        const courseInfo = {
            user_id: user.id,
            title: 'test title',
            description: 'test description',
            status: 'draft'
        };
        const course = await CreateCourse(courseInfo);
        await DestroyDummyUser(user);
        await DestroyDummyCourse(course);
        expect(course).to.be.an('object');
        expect(course).to.have.property('user_id');
        expect(course.user_id).to.equal(user.id);
        expect(course).to.have.property('title');
        expect(course.title).to.equal(courseInfo.title);
        expect(course).to.have.property('description');
        expect(course.description).to.equal(courseInfo.description);
        expect(course).to.have.property('status');
        expect(course.status).to.equal(courseInfo.status);
    });

    it('should throw an error because no user_id is passed to CreateCourse', async()=>{
        const courseInfo = {
            title: 'test title',
            description: 'test description',
            status: 'draft'
        };
        try{
            const course = await CreateCourse(courseInfo);
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('{"user_id":["User id can\'t be blank"]}');
        }
    });

    it('should throw an error because no user_id or status is passed to CreateCourse', async()=>{
        const courseInfo = {
            title: 'test title',
            description: 'test description',
        };
        try{
            const course = await CreateCourse(courseInfo);
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('{"user_id":["User id can\'t be blank"],"status":["Status can\'t be blank"]}');
        }
    })

    it('should throw an error because no user_id is passed to CreateCourse and status is invalid', async()=>{
        const courseInfo = {
            title: 'test title',
            description: 'test description',
            status:'sdfasdfa'
        };
        try{
            const course = await CreateCourse(courseInfo);
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('{"user_id":["User id can\'t be blank"],"status":["Status sdfasdfa must be either draft, published, or unpublished"]}');
        }
    })

});

async function CreateDummyCourse(user_id){
        return await db.course.create({
            user_id,
            title: 'test title',
            description: 'test description',
            status: 'draft'
        })
}

async function DestroyDummyCourse(course){
    return await course.destroy({force:true});
}

async function CreateDummyUser(){
    return await db.user.create({
        first_name: 'test',
        last_name: 'test',
        username: 'test_test',
        password: 'test_test',
        email: 'test@test.com',
        permission_id : 1
    });
}

async function DestroyDummyUser(user){
    return await user.destroy({ force: true });
}