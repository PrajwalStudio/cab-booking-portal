const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully!');

    const result = await client.query('SELECT NOW() as current_time');
    console.log('Current time from DB:', result.rows[0].current_time);

    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log('Existing tables:', tables.rows);
    
  } catch (error) {
    console.error('Connection failed:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();