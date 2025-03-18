import { createClient } from 'redis';

const redis =  await createClient({ url: process.env.REDIS_URL }).connect();
// const redis = await createClient().connect();

const initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes() {
  const data = await redis.hGetAll("notes");
  if (Object.keys(data).length == 0) {
    await redis.hSet("notes", initialData);
  }
  return await redis.hGetAll("notes")
}

export async function addNote(data) {
  const uuid = Date.now().toString();       
  // return;
  await redis.hSet("notes", uuid, data);
  return uuid
}

export async function updateNote(uuid, data) {
  await redis.hSet("notes", uuid, data);
}

export async function getNote(uuid) {
  return JSON.parse(await redis.hGet("notes", uuid));
}

export async function delNote(uuid) {
  return redis.hDel("notes", uuid)
}

export async function addUser(username, password) {
  await redis.hSet("users", [username], password);
  return {
    name: username,
    username
  }
}

export async function getUser(username, password) {
  const passwordFromDB = await redis.hget("users", username);
  if (!passwordFromDB) return 0;
  if (passwordFromDB !== password) return 1
  return {
    name: username,
    username
  } 
}

export default redis