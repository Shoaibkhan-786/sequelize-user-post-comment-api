const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Post = sequelize.define('post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,50]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,300]
            }
        },
        deletedBy: DataTypes.INTEGER,
    }, {
        paranoid: true
    })
    return Post
}