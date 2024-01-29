// NOT USED THIS FILE FOR SIMPLIFYING SETUP THE PROJECT

import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing id meal!' });
  }

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
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
