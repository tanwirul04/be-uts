import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicara: Pembicara[] = [];

//1. menampilkan data 
export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
};

//2. menyimpan data
export const createPembicara = (req: Request, res: Response) => {
    const { name, role } = req.body;

    //validasi jika name kosong
        if (!name || !role) {
            return res.status(500).json({ 
                message: "Nama dan role harus diisi", 
            });
        }
    
        //mapping data
        const newPembicara: Pembicara = {
            id: Date.now(),
            name: name,
            role: role
        };
    
        //simpan datannya
        pembicara.push(newPembicara);
    
        //jika berhasil disimpan
        res.status(201).json(newPembicara);
};

//3. mengambil data pembicara berdasarkan id
export const showPembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const Pembicara = pembicara.find((e) => e.id === id);

    //Jika data tidak ada
    if (!Pembicara) {
        return res.status(404).json({
            message: "Pembicara tidak ditemukan",
        });
    }
    //jika ada
    res.json(Pembicara);
};

//4. mengupdate data pembicara berdasarkan id 
export const updatePembicara = (req: Request, res: Response) => {};

//5. menghapus data pembicara berdasarkan id
export const deletePembicara = (req: Request, res: Response) => {};