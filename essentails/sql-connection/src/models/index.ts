import { createConnection } from '../config/database';

const connection = createConnection();

export const getUsers = async () => {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
};

export const getUserById = async (id: number) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Additional model functions can be added here