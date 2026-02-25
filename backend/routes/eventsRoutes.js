const express = require('express');
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', verifyToken, createEvent);
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;