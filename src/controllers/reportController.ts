import { Op } from 'sequelize';
import { Request, Response } from 'express';

import Product from '../models/product';
import Sale from '../models/sale';
import { sequelize } from '../connection';

export const getRestockReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const minimumStockThreshold: number = parseInt(req.params.minimumStockThreshold, 10);

        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 30);

        const productsToRestock = await Product.findAll({
            include: [
                {
                    model: Sale,
                    attributes: [],
                    where: {
                        date: {
                            [Op.between]: [startDate, currentDate],
                        },
                    },
                    as: 'sales',
                    required: false,
                },
            ],
            attributes: [
                'id',
                'name',
                [
                    sequelize.fn('COALESCE', sequelize.literal('(SUM("sales"."total") / NULLIF(COUNT("sales"."total"), 0))'), 0),
                    'averageMonthlySales',
                ],
                'quantity',
            ],
            group: ['Product.id'],
            having: sequelize.literal(':minimumStockThreshold <= COALESCE(SUM("sales"."total"), 0) / NULLIF(COUNT("sales"."total"), 0)'),
            replacements: {
                minimumStockThreshold,
            },
        });

        res.json({ productsToRestock });
    } catch (error) {
        console.error('Error generating restock report:', error);
        res.status(500).send('500 Internal Server Error');
    }
};
