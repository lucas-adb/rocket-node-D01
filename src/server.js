import http from 'node:http';
import { routes } from './routes/routes.js';
import { json } from './middlewares/json.js';
import { handleQueryParams } from './utils/handle-query-params.js';

const PORT = 3333;

const app = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? handleQueryParams(query) : {};
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

app.listen(PORT, () => {
  console.log('Its Alive ⚡');
});
