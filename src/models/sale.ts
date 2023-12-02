import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';
import Product from './product';
import Supplier from './supplier';

interface SaleAttributes {
  id: number;
  date: Date;
  total: GLfloat;
  productId: number;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SaleCreationAttributes extends Optional<SaleAttributes, 'id'> { }

class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
  public id!: number;
  public date!: Date;
  public total!: GLfloat;
  public productId!: number;
  public supplierId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.INTEGER,
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
    modelName: 'Sale',
  },
);

Sale.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Sale.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Product.hasMany(Sale, { foreignKey: 'productId', as: 'sales' });

export default Sale;