const {expect} = require('chai');
const User_Db = require('../../Services/Users/User_DB');
const db = require('../../models');
const db_handler = User_Db(db);

describe('User DB Test Suite', ()=>{
    it('should see if a username already exists in db', async ()=>{
        const check = await db_handler.UsernameExists('');
        expect(check).to.be.null;
        expect(check === undefined).to.be.false;
        expect(check === false).to.be.false;
    });

    it('should throw an error because no username was passed', async ()=>{
        try{
            const check = await db_handler.UsernameExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('No username was passed as an argument');
        }

    });

    it('should create a user, see if username already exists, and fail', async ()=>{
        const test = await CreateDummyUser();

        const check = await db_handler.UsernameExists('test_test');
        expect(check).to.be.an('object');

        await DestroyDummyUser(test);
    });

    it('should see if a email already exists in db', async ()=>{
        const check = await db_handler.EmailExists('');
        expect(check).to.be.null;
        expect(check === undefined).to.be.false;
        expect(check === false).to.be.false;
    });

    it('should throw an error because no email was passed', async ()=>{
        try{
            const check = await db_handler.EmailExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('No email was passed as an argument');
        }

    });

    it('should create a user, see if email already exists, and fail', async ()=>{
        const test = await CreateDummyUser();

        const check = await db_handler.EmailExists('test@test.com');
        expect(check).to.be.an('object');

        await DestroyDummyUser(test);
    });

    it('should create a new user', async ()=>{
        const first_name = 'test';
        const last_name = 'test';
        const email = 'test@test.com';
        const password = 'test_test';
        const username = 'test_test';
        const permission_id = 1;

        const args = {first_name, last_name, email, password, username, permission_id};

        const user = await db_handler.CreateUser(args);

        //destroy user instance in database because it's a test
        await user.destroy({ force: true });

        expect(user).to.be.an('object');
        expect(user.first_name).to.equal(first_name);
        expect(user.last_name).to.equal(last_name);
        expect(user.username).to.equal(username);
        expect(user.email).to.equal(email);
        expect(user.password).to.equal(password);
        expect(user.permission_id).to.equal(permission_id);

    });

    it('should throw an error because no username is passed', async ()=>{
        try{
            const first_name = 'test';
            const last_name = 'test';
            const email = 'test@test.com';
            const password = 'test_test';
            const permission_id = 1;
            const user = await db_handler.CreateUser({first_name, last_name, email, password, permission_id});
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: username')
        }
    });

    it('should throw an error because no first_name is passed', async ()=>{
        try{
            const username = 'test_test';
            const last_name = 'test';
            const email = 'test@test.com';
            const password = 'test_test';
            const permission_id = 1;
            const user = await db_handler.CreateUser({last_name, email,username, password, permission_id});
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: first_name')
        }
    });

    it('should throw an error because no last_name is passed', async ()=>{
        try{
            const username = 'test_test';
            const first_name = 'test';
            const email = 'test@test.com';
            const password = 'test_test';
            const permission_id = 1;
            const user = await db_handler.CreateUser({first_name, email,username, password, permission_id});
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: last_name')
        }
    });

    it('should throw an error because no password is passed', async ()=>{
        try{
            const username = 'test_test';
            const first_name = 'test';
            const last_name = 'test';
            const email = 'test@test.com';
            const permission_id = 1;
            const user = await db_handler.CreateUser({first_name, last_name, email,username, permission_id});
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: password')
        }
    });

    it('should throw an error because no email is passed', async ()=>{
        try{
            const username = 'test_test';
            const first_name = 'test';
            const last_name = 'test';
            const password = 'test_test';
            const permission_id = 1;
            const user = await db_handler.CreateUser({first_name, last_name, password,username, permission_id});
        }catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: email')
        }
    });

    it('should create a user and assign them permission id of 2 as default', async ()=>{
            const username = 'test_test';
            const first_name = 'test';
            const last_name = 'test';
            const password = 'test_test';
            const email = 'test@test.com';
            const user = await db_handler.CreateUser({first_name, last_name, password,username, email});

        //destroy user instance in database because it's a test
        await user.destroy({ force: true });

        expect(user).to.be.an('object');
        expect(user.first_name).to.equal(first_name);
        expect(user.last_name).to.equal(last_name);
        expect(user.username).to.equal(username);
        expect(user.email).to.equal(email);
        expect(user.password).to.equal(password);
        expect(user.permission_id).to.equal(2);
    });

    it('should throw an error because an invalid permission_id is passed to create user', async ()=>{
        try{
            const username = 'test_test';
            const first_name = 'test';
            const last_name = 'test';
            const password = 'test_test';
            const email = 'test@test.com';
            const permission_id = 'sflkjflkdsj';
            const user = await db_handler.CreateUser({first_name, last_name, password,username, email, permission_id});
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: permission_id not found')
    }
    });

    it('should create a new user with a valid permission_id by lookup in the permission table', async()=>{
        const username = 'test_test';
        const first_name = 'test';
        const last_name = 'test';
        const password = 'test_test';
        const email = 'test@test.com';
        const permission_id = 1;
        const user = await db_handler.CreateUser({first_name, last_name, password,username, email, permission_id});

        //destroy user instance in database because it's a test
        await user.destroy({ force: true });

        expect(user).to.be.an('object');
        expect(user.first_name).to.equal(first_name);
        expect(user.last_name).to.equal(last_name);
        expect(user.username).to.equal(username);
        expect(user.email).to.equal(email);
        expect(user.password).to.equal(password);
        expect(user.permission_id).to.equal(1);
    });

    it('should return a user based on their id', async()=>{
        const user = await CreateDummyUser();

        const found = await db_handler.FindUser(user.id);

        await DestroyDummyUser(user);
        expect(found).to.be.an('object');
        expect(found).to.have.property('permission_id');
        expect(found.username).to.equal('test_test');
        expect(found.permission_id).to.equal(1);


    });

    it('should throw an error when finind a user by id , because no user_id is passed', async()=>{
        const user = await CreateDummyUser();
        try{
            await db_handler.FindUser();
        }catch(e){
            await DestroyDummyUser(user);
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: user_id');
        }
    });

    it('should return a user based on their username', async()=>{
        const user = await CreateDummyUser();

        const found = await db_handler.FindUser(user.username);

        await DestroyDummyUser(user);
        expect(found).to.be.an('object');
        expect(found).to.have.property('permission_id');
        expect(found.username).to.equal('test_test');
        expect(found.permission_id).to.equal(1);


    });
});

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