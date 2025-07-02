export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      console.log('GET foi chamado');
      return res.end();
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      console.log(req.body);
      return res.end();
    },
  },
];
