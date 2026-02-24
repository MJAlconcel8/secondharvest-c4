const pool = require('../config/userConfig');

const createEvent = async (req, res) => {
    const { userId, eventName, eventImage, eventType, description, hostName, eventDate } = req.body;

    try {
        const newEvent = await pool.query(
                        `INSERT INTO events (user_id, event_name, event_image, event_type, description, host_name, event_date)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING
               id,
                             user_id AS "userId",
               event_name AS "eventName",
               event_image AS "eventImage",
               event_type AS "eventType",
               description,
               host_name AS "hostName",
               event_date AS "eventDate",
               created_at AS "createdAt"`,
                        [userId, eventName, eventImage, eventType, description, hostName, eventDate]
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
               event_image AS "eventImage",
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
               event_image AS "eventImage",
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
    const { userId, eventName, eventImage, eventType, description, hostName, eventDate } = req.body;

    try {
        const updatedEvent = await pool.query(
            `UPDATE events
             SET user_id = $1,
                 event_name = $2,
                 event_image = $3,
                 event_type = $4,
                 description = $5,
                 host_name = $6,
                 event_date = $7
             WHERE id = $8
             RETURNING
               id,
               user_id AS "userId",
               event_name AS "eventName",
               event_image AS "eventImage",
               event_type AS "eventType",
               description,
               host_name AS "hostName",
               event_date AS "eventDate",
               created_at AS "createdAt"`,
            [userId, eventName, eventImage, eventType, description, hostName, eventDate, id]
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