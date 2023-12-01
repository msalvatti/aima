import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

interface SupplierAttributes {
  id: number;
}

interface SupplierCreationAttributes extends Optional<SupplierAttributes, 'id'> { }

class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
  public id!: number;
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'Supplier',
  }
);

export default Supplier;
