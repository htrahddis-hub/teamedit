import { createClient } from 'redis';

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT?process.env.REDIS_PORT:'')
  }
});

// console.log(client);


export async function saveRedis(key: string, value: string): Promise<string> {
  try {
    const isClient = client.isReady;
    if (isClient) {
      const data = await client.set(key, value);
      console.log(data);
      if (data)
        return data;
      else
        return 'failure';
    } else {
      await client.on('error', err => console.log('Redis Client Error', err)).connect();
      const data = await client.set(key, value);
      console.log(data);
      if (data)
        return data;
      else
        return 'failure';
    }
  } catch (err) {
    console.log(err);
    return 'failure';
  }
}

export async function fetchRedis(key: string): Promise<string> {
  try {
    const isClient = client.isReady;
    if (isClient) {
      const data = await client.get(key);
      console.log(data);
      if (data)
        return data;
      else
        return 'failure';
    } else {
      await client.on('error', err => console.log('Redis Client Error', err)).connect();
      const data = await client.get(key);
      console.log(data);
      if (data)
        return data;
      else
        return 'failure';
    }
  } catch (err) {
    console.log(err);
    return 'failure';
  }
}

