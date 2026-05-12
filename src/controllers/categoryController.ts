import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

//1. menampilkan data category
export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};

//2. menyimpan data category
export const createCategory = (req: Request, res: Response) => {
    const { name } = req.body;

    //validasi jika name kosong
        if (!name ) {
            return res.status(500).json({ 
                message: "Nama harus diisi", 
            });
        }
    
        //mapping data category
        const newCategory: Category = {
            id: Date.now(),
            name: name
        };
    
        //simpan datannya
        categories.push(newCategory);
    
        //jika berhasil disimpan
        res.status(201).json(newCategory);
};

//3. mengambil data category berdasarkan id
export const showCategoryById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = categories.find((c) => c.id === id);

    //Jika data tidak ada
    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }
    //jika ada
    res.json(category);
};

//4. mengupdate data category berdasarkan id 
export const updateCategory = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    // Tambahkan validasi 
    if (!name) {
        return res.status(400).json({ message: "Nama kategori harus diisi" });
    }

    categories[index] = {
        id: categories[index]!.id,
        name: name
    };

    res.json(categories[index]);
};

//5. menghapus data category berdasarkan id
export const deleteCategory = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    categories.splice(index, 1);
    res.json({ message: "Category berhasil dihapus" });
};