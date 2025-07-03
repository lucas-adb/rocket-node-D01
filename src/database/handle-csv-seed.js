import { parse } from 'csv-parse';
import fs from 'fs';

const csvPath = new URL('./seed.csv', import.meta.url);

async function csvToArray() {
  const records = [];

  const parser = fs.createReadStream(csvPath).pipe(parse());

  for await (const record of parser) {
    if (record[0] !== 'title') {
      records.push(record);
    }
  }

  return records;
}

async function handleCSVSeed() {
  const arrayOfTasks = await csvToArray();

  for await (const task of arrayOfTasks) {
    const response = await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task[0],
        description: task[1],
      }),
    });

    if (!response.ok) {
      throw new Error('Fetch failed');
    }
  }
}

handleCSVSeed();
