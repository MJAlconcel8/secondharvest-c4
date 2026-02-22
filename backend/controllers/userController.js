const pool = require('../config/userConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET and JWT_REFRESH_SECRET environment variables are required');
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const token = jwt.sign({ id: newUser.rows[0].id, email }, JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: newUser.rows[0].id, email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.json({ user: newUser.rows[0], token, refreshToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.rows[0].id, email }, JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.rows[0].id, email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.json({ user: user.rows[0], token, refreshToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (user.rows.length > 0) {
            res.json(user.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};  

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [username, email, hashedPassword, id]
        );

        if (updatedUser.rows.length > 0) {
            res.json(updatedUser.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        
        if (deletedUser.rows.length > 0) {
            res.json(deletedUser.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const refreshTokenHandler = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const newToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token: newToken });
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: 'Invalid refresh token' });
    }
}       

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    refreshTokenHandler
};
