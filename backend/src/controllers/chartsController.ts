import { Request, Response } from 'express';
import sequelize from '../models';

const getCharts = async (req: Request, res: Response) => {
  try {
    const [results, metadata] = await sequelize.query('SELECT * FROM charts');
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getCharts };
