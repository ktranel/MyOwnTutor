const {expect} = require('chai');
const User = require('../../Services/Users/User_Service');

describe('User Test Suite', ()=>{
    it('should see if a user already exists on non existent user', async ()=>{
        //mock data
        const mock = {
            UsernameExists: function(username){
                return new Promise(resolve => resolve(null));
            },
            EmailExists: function(email){
                return new Promise(resolve => resolve(null));
            }
        }
        const ValidateUserExists = User.ValidateUserExistsFacotry(mock);
        const user = await ValidateUserExists('test', 'test@test.com');
         expect(user).to.be.null;
    });

    it('should see if a user already exists on an existent username', async ()=>{
        //mock data
        const mock = {
            UsernameExists: function(username){
                return new Promise(resolve => resolve({test:"test"}));
            },
            EmailExists: function(email){
                return new Promise(resolve => resolve(null));
            }
        }
        const ValidateUserExists = User.ValidateUserExistsFacotry(mock);
        const user = await ValidateUserExists('test_test', 'test@test.com');
        expect(user).to.be.an('object');
    });

    it('should see if a user already exists on an existent email', async ()=>{
        const mock = {
            UsernameExists: function(username){
                return new Promise(resolve => resolve(null));
            },
            EmailExists: function(email){
                return new Promise(resolve => resolve({test:"test"}));
            }
        }
        const ValidateUserExists = User.ValidateUserExistsFacotry(mock);
        const user = await ValidateUserExists('test_test', 'test@test.com');
        expect(user).to.be.an('object');
    })

    it('should throw an error because no args were passed to see if user exists', async ()=>{
        try{
            const ValidateUserExists = User.ValidateUserExistsFacotry({});
            await ValidateUserExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid number of args passed. Please pass username and email');
        }
    });

    it('should throw an error because 1 arg was passed to see if user exists', async ()=>{
        try{
            const ValidateUserExists = User.ValidateUserExistsFacotry({});
            await ValidateUserExists('test_test');
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid number of args passed. Please pass username and email');
        }
    });
});