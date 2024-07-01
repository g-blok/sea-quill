import { Request, Response } from 'express';
import sequelize from '../models';

const getDashboards = async (req: Request, res: Response) => {
  try {
    const [results, metadata] = await sequelize.query('SELECT * FROM dashboards');
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getDashboards };
