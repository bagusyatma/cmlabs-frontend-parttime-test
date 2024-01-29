// NOT USED THIS FILE FOR SIMPLIFYING SETUP THE PROJECT

import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;
  const { ingredient } = req.query;

  if (!ingredient) {
    return res.status(400).json({ message: 'Missing ingredient!' });
  }

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = response.data.meals;

        return res.status(200).json(data);
      } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || {};

        return res.status(status).json(data);
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} not allowed!`);
  }
}
