import { createClient } from 'redis';

const client = createClient({
  username: 'server',
  password: 'A66GUi!r38@MxH3',
  socket: {
    host: 'redis-10079.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 10079
  }
});

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

