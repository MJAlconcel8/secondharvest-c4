const pool = require('../config/userConfig');

const createEvent = async (req, res) => {
    const {name, date, location, description} = req.body;

    try {
        const newEvent = await pool.query(
            'INSERT INTO events (name, date, location, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, date, location, description]
        );

        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await pool.query('SELECT * FROM events');
        res.json(events.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

        if (event.rows.length > 0) {
            res.json(event.rows[0]);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, location, description } = req.body;

    try {
        const updatedEvent = await pool.query(
            'UPDATE events SET name = $1, date = $2, location = $3, description = $4 WHERE id = $5 RETURNING *',
            [name, date, location, description, id]
        );

        if (updatedEvent.rows.length > 0) {
            res.json(updatedEvent.rows[0]);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

        if (deletedEvent.rows.length > 0) {
            res.json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}