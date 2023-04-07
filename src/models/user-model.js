const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,30]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            validate: {
                len: [3,30]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8,30],
                isAlphanumeric: true
            }
        },
        deletedBy: {
            type: DataTypes.INTEGER
        },
        fullname: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.first_name + " " + this.last_name}`
            }
        }
    }, {
        paranoid: true
    })
    User.addHook('beforeCreate', async (user) => {
        user.password = await bcrypt.hash(user.password, 10)
    });

    User.prototype.valdiatePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    }

    return User;
}