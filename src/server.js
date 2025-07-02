import http from 'node:http';

const PORT = 3333;

const app = http.createServer();

app.listen(PORT, () => {
  console.log('Its Alive ⚡');
});
