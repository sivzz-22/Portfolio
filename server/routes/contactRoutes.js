import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// @route   POST /api/contact
router.post('/', submitContact);

export default router;
