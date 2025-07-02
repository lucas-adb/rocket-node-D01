import { randomUUID } from "node:crypto";

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (_req, res) => {
      console.log('GET foi chamado');
      return res.end();
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      }

      return res.writeHead(201).end(JSON.stringify(task));
    },
  },
];
