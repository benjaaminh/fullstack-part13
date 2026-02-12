const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            author: {
                type: DataTypes.TEXT,
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        })
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                },
                allowNull: false,
                allowEmpty: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                allowEmpty: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}