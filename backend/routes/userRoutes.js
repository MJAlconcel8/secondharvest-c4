const express = require('express');
const { registerUser, loginUser, getUserById, updateUser, deleteUser} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
module.exports = router;
