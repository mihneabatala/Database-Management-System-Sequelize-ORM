import { DataTypes } from "sequelize";
import sequelize from  "../database/database.js"

const Subscriber = sequelize.define('Subscriber',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // Specify the table name (assuming your table is named 'subscribers')
    tableName: 'subscriber',
    // Specify that Sequelize should not try to create the table
    freezeTableName: true,
    // Disable the timestamps (createdAt and updatedAt) columns
    timestamps: false,
  })

  export default Subscriber