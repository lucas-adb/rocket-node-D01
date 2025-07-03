import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.js';
import { handleRoutePath } from '../utils/handle-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: handleRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const filter = search ? { title: search, description: search } : null;

      const data = database.select('tasks', filter);
      return res.end(JSON.stringify(data));
    },
  },
  {
    method: 'POST',
    path: handleRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: 'Title and description are required' })
          );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      };

      database.insert('tasks', task);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: handleRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: 'Title and description are required' })
          );
      }

      const tasks = database.select('tasks');
      const task = tasks.find((task) => task.id === id);

      if (!task) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task not found' }));
      }

      database.update('tasks', id, {
        ...task,
        title,
        description,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: handleRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const tasks = database.select('tasks');
      const task = tasks.find((task) => task.id === id);

      if (!task) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task not found' }));
      }

      database.update('tasks', id, {
        ...task,
        completed_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: handleRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const tasks = database.select('tasks');
      const task = tasks.find((task) => task.id === id);

      if (!task) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task not found' }));
      }

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
];
