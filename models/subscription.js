import { DataTypes } from "sequelize";
import sequelize from  "../database/database.js"
import Newspaper from "./newspaper.js";
import Subscriber from "./subscriber.js";

const Subscription = sequelize.define('Subscription',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    // Specify the table name (assuming your table is named 'subscribers')
    tableName: 'subscription',
    // Specify that Sequelize should not try to create the table
    freezeTableName: true,
    // Disable the timestamps (createdAt and updatedAt) columns
    timestamps: false,
  })

    Subscription.belongsTo(Newspaper, { foreignKey: 'id_newspaper', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Subscription.belongsTo(Subscriber, { foreignKey: 'id_subscriber', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  export default Subscription