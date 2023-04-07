require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const db = require('../models');
const User = db.user;
const Role = db.role;



passport.use('login', new localStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    email
                },
                include: {
                    model: Role
                }
            });
            // console.log(JSON.stringify(user))
            if (!user) throw createError.Unauthorized("User not Found")

            const matchPassword = await user.valdiatePassword(password);
            if (!matchPassword) throw createError.Unauthorized("Password not match");

            const payload = { userid: user.id, role: user.role.name };
            const token = jwt.sign(payload, process.env.token_secret, { expiresIn: '6000s' });

            return done(null, token);

        } catch (error) {
            done(error, false);
        }

    }
))


passport.use('auth', new jwtStrategy(
    {
        secretOrKey: process.env.token_secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (JwtPayload, done) => {
        try {
            const { userid } = JwtPayload;
            const isUser = await User.findByPk(userid);
            if (!isUser) throw createError.Unauthorized('Unauthorized');
            return done(null, JwtPayload);
        } catch (error) {
            done(error)
        }
    }
))