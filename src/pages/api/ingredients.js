// NOT USED THIS FILE FOR SIMPLIFYING SETUP THE PROJECT

import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
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
