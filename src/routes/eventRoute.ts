import{
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/eventController';

import express from 'express';

const router = express.Router();

router.get("/", getEvents); //menampilkan data event
router.post("/", createEvent);//menyimpan
router.get("/:id", getEventById); //menampilkan event by id
router.put("/:id", updateEvent); //mengupdate data event berdasarkan id
router.delete("/:id", deleteEvent); //menghapus data event berdasarkan id

export default router;
