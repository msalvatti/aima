import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

interface SaleAttributes {
  id: number;
}

interface SaleCreationAttributes extends Optional<SaleAttributes, 'id'> { }

class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
  public id!: number;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'Sale',
  }
);

export default Sale;