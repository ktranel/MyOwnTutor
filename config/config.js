require('dotenv').config();

const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;
const session_secret = process.env.SESSION_SECRET;

const config = {
    dev:{
        db:{
           username,
           password,
           database,
           host
        },
        session_secret
    },
    test:{},
    prod:{}
};

module.exports = config[node_env];