import{
    getCategories,
    createCategory,
    showCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController';

import express from 'express';

const router = express.Router();

router.get("/", getCategories); //menampilkan data category
router.post("/", createCategory); //menyimpan data category
router.get("/:id", showCategoryById); //menampilkan category berdasarkan id
router.put("/:id", updateCategory); //mengupdate data category berdasarkan id
router.delete("/:id", deleteCategory); //menghapus data category berdasarkan id

export default router;

