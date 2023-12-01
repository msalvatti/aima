import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';

const secretKey = process.env.JWT_SECRET as Secret | undefined;

export const authenticate = async (req: Request, res: Response): Promise<Response> => {
    const { login, password } = req.body;

    if (!login || !password)
        return res.status(403).send('403 Forbidden.');

    try {
        const user = await User.findOne({ where: { login } });

        if (user && secretKey) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: user.id, username: user.login }, secretKey, {
                    expiresIn: parseInt(process.env.JWT_EXPIRES || '180000'),
                });

                return res.json({ token });
            } else {
                return res.status(401).send('401 Unauthorized.');
            }

        } else {
            return res.status(401).send('401 Unauthorized.');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};