import { Request, Response } from "express";
import { Category } from "../types/category.js";
import { prisma } from "../lib/db.js";

let categories: Category[] = [];

//1. menampilkan data category
export const getCategories = async(req: Request, res: Response) => {
    const AllCategory = await prisma.category.findMany({
        orderBy: {
            createAt : "desc",
        },
    })
    res.json(AllCategory);
};

//2. menyimpan data category
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    //validasi jika name kosong
        if (!name ) {
            return res.status(400).json({ 
                message: "Nama harus diisi", 
            });
        }
    
        //mapping data category
        const newCategory = await prisma.category.create({
            data: {
                name: name
            },
        });

        res.status(201).json(newCategory);
};

//3. mengambil data category berdasarkan id
export const getCategoryById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
        where: { id: id },
    });

    // Jika data tidak ada
    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }

    res.json(category);
};

//4. mengupdate data category berdasarkan id 
export const updateCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Nama kategori harus diisi" });
    }

    const category = await prisma.category.findUnique({
        where: { id: id },
    });

    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    // Kalau lolos semua satpam, baru di-update
    const updatedCategory = await prisma.category.update({
        where: { id: id },
        data: { name: name },
    });

    res.json(updatedCategory);
};

//5. menghapus data category berdasarkan id
export const deleteCategory = async(req: Request, res: Response) => {
    const id = Number(req.params.id);

    // Cek ke database apakah datanya ada sebelum di-hapus
    const category = await prisma.category.findUnique({
        where: { id: id },
    });

    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    const isCategoryUsed = await prisma.event.findFirst({
        where: { categoryId: id }
    });

    if (isCategoryUsed) {
        return res.status(400).json({ 
            message: "Gagal menghapus! Kategori ini masih terikat dengan data event aktif." 
        });
    }

    // Kalau ada, langsung hapus
    await prisma.category.delete({
        where: { id: id },
    });

    res.json({ message: "Category berhasil dihapus" });
};