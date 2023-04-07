const { DataTypes, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
    const Comment = sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,300]
            }
        },
        deletedBy: {
            type: DataTypes.INTEGER
        }
    }, {
        paranoid: true
    })
    
    return Comment
}