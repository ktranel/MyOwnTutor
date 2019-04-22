const {expect} = require('chai');
const db = require('../../models');
const {FindCourse} = require('../../Services/Courses/Course_DB');

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