import pool from "@/app/lib/mysql";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM your_table');
    const count = rows[0].count;

    return res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}