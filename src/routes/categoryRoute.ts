import{
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';

import express from 'express';

const router = express.Router();

router.get("/", getCategories); //menampilkan data category
router.post("/", createCategory); //menyimpan data category
router.get("/:id", getCategoryById); //menampilkan category berdasarkan id
router.put("/:id", updateCategory); //mengupdate data category berdasarkan id
router.delete("/:id", deleteCategory); //menghapus data category berdasarkan id

export default router;

