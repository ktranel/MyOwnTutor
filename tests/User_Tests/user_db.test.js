const {expect} = require('chai');
const {UsernameExists, EmailExists} = require('../../Services/Users/User_DB');
const db = require('../../models');

describe('User DB Test Suite', ()=>{
    it('should see if a username already exists in db', async ()=>{
        const check = await UsernameExists('');
        expect(check).to.be.null;
        expect(check === undefined).to.be.false;
        expect(check === false).to.be.false;
    });

    it('should throw an error because no username was passed', async ()=>{
        try{
            const check = await UsernameExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('No username was passed as an argument');
        }

    });

    it('should create a user, see if username already exists, and fail', async ()=>{
        const test = await CreateDummyUser();

        const check = await UsernameExists('test_test');
        expect(check).to.be.an('object');

        await DestroyDummyUser(test);
    });

    it('should see if a email already exists in db', async ()=>{
        const check = await EmailExists('');
        expect(check).to.be.null;
        expect(check === undefined).to.be.false;
        expect(check === false).to.be.false;
    });

    it('should throw an error because no email was passed', async ()=>{
        try{
            const check = await EmailExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('No email was passed as an argument');
        }

    });

    it('should create a user, see if email already exists, and fail', async ()=>{
        const test = await CreateDummyUser();

        const check = await EmailExists('test@test.com');
        expect(check).to.be.an('object');

        await DestroyDummyUser(test);
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