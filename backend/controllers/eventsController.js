const pool = require('../config/userConfig');

const createEvent = async (req, res) => {
    const { eventName, eventType, description, hostName, eventDate } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const newEvent = await pool.query(
                        `INSERT INTO events (user_id, event_name, event_type, description, host_name, event_date)
                         VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING
               id,
               user_id AS "userId",
               event_name AS "eventName",
               event_type AS "eventType",
               description,
               host_name AS "hostName",
               event_date AS "eventDate",
               created_at AS "createdAt"`,
                        [userId, eventName, eventType, description, hostName, eventDate]
        );

        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await pool.query(
            `SELECT
               id,
               user_id AS "userId",
               event_name AS "eventName",
               event_type AS "eventType",
               description,
               host_name AS "hostName",
               event_date AS "eventDate",
               created_at AS "createdAt"
             FROM events
             ORDER BY event_date ASC`
        );
        res.json(events.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await pool.query(
            `SELECT
               id,
               user_id AS "userId",
               event_name AS "eventName",
               event_type AS "eventType",
               description,
               host_name AS "hostName",
               event_date AS "eventDate",
               created_at AS "createdAt"
             FROM events
             WHERE id = $1`,
            [id]
        );

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
    const { eventName, eventType, description, hostName, eventDate } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const existingEvent = await pool.query(
            'SELECT user_id FROM events WHERE id = $1',
            [id]
        );

        if (existingEvent.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (existingEvent.rows[0].user_id !== userId) {
            return res.status(403).json({ error: 'Not authorized to edit this event' });
        }

        const updatedEvent = await pool.query(
            `UPDATE events
             SET event_name = $1,
                 event_type = $2,
                 description = $3,
                 host_name = $4,
                 event_date = $5
             WHERE id = $6
             RETURNING
               id,
               user_id AS "userId",
               event_name AS "eventName",
               event_type AS "eventType",
               description,
               host_name AS "hostName",
               event_date AS "eventDate",
               created_at AS "createdAt"`,
            [eventName, eventType, description, hostName, eventDate, id]
        );

        res.json(updatedEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const existingEvent = await pool.query(
            'SELECT user_id FROM events WHERE id = $1',
            [id]
        );

        if (existingEvent.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (existingEvent.rows[0].user_id !== userId) {
            return res.status(403).json({ error: 'Not authorized to delete this event' });
        }

        await pool.query('DELETE FROM events WHERE id = $1', [id]);
        res.json({ message: 'Event deleted successfully' });
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