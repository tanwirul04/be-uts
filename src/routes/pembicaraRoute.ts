import{
    getPembicara,
    createPembicara,
    getPembicaraById,
    updatePembicara,
    deletePembicara
} from '../controllers/pembicaraController.js';

import express from "express";
const router = express.Router();

router.get("/", getPembicara); //menampilkan data 
router.post("/", createPembicara); //menyimpan data 
router.get("/:id", getPembicaraById); //menampilkan berdasarkan id
router.put("/:id", updatePembicara); //mengupdate data berdasarkan id
router.delete("/:id", deletePembicara); //menghapus data berdasarkan id

export default router;
