const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);

// make connection to database
const sequelize = new Sequelize('user_post_comment', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})


// check database is connected or not
const connection = async () => {
    await sequelize.authenticate()
}


const db = {};

db.connection = connection;
db.sequelize = sequelize;
db.Sequelize = Sequelize;


//  -----------first way to import model files ------------------

// db.role = require('./role-model')(sequelize);
// db.users = require('./user-model')(sequelize);
// db.posts = require('./post-model')(sequelize);
// db.comments = require('./comment-model')(sequelize);

// -----------second way to import model files --------------------


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' 
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });


// relations between tables

db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

db.post.hasMany(db.comment);
db.comment.belongsTo(db.post);

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.sequelize.sync()
    .then(() => { console.log('models synced successfully') })
    .catch((err) => { console.log(err.message) })


module.exports = db;