require('dotenv').config();
const express = require('express');
const { ValidationError } = require('express-validation');
const db = require('./models');
const indexRouter = require('./routes/index-route');


const app = express();
const port = parseInt(process.env.PORT) || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(indexRouter);


app.use((err, req, res, next) => {
    const { statusCode } = err;
    if (err instanceof ValidationError) {
        return res.status(statusCode).json({ err: err.details.body[0].message });
    }
    else {
        const { status = 500, message = "something went wrong" } = err;
        res.status(status).json({ message });
    }
})


db.connection()
    .then(() => {
        console.log('database connected')
        app.listen(port, () => {
            console.log(`server is up and running on ${port}`)
        })
    }).catch((err) => {
        console.log('something went wrong while connecting database', err)
    })

