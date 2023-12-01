import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

interface SupplierAttributes {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SupplierCreationAttributes extends Optional<SupplierAttributes, 'id'> { }

class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
  public id!: number;
  public name!: string;
  public contactPerson!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Supplier',
  }
);

export default Supplier;
