import { DataTypes } from "sequelize";
import sequelize from  "../database/database.js"

const Newspaper = sequelize.define('Newspaper',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // Specify the table name (assuming your table is named 'subscribers')
    tableName: 'newspaper',
    // Specify that Sequelize should not try to create the table
    freezeTableName: true,
    // Disable the timestamps (createdAt and updatedAt) columns
    timestamps: false,
  })

  export default Newspaper