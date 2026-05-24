import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara.js";
import { prisma } from "../lib/db.js";

let pembicara: Pembicara[] = [];

//1. menampilkan data 
export const getPembicara = async (req: Request, res: Response) => {
    const AllSpeakers = await prisma.pembicara.findMany({
            orderBy: {
                createAt : "desc",
            },
        })

    res.json(AllSpeakers);
};

//2. menyimpan data
export const createPembicara = async (req: Request, res: Response) => {
    const { name, role } = req.body;

    //validasi jika name kosong
        if (!name || !role) {
        return res.status(400).json({ message: "Nama dan role pembicara harus diisi" });
    }

    const newPembicara = await prisma.pembicara.create({
        data: { name, role },
    });
    res.status(201).json(newPembicara);
};

//3. mengambil data pembicara berdasarkan id
export const getPembicaraById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const pembicara = await prisma.pembicara.findUnique({ where: { id } });
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    res.json(pembicara);
};

//4. mengupdate data pembicara berdasarkan id 
export const updatePembicara = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: "Nama dan role harus diisi" });
    }

    const pembicara = await prisma.pembicara.findUnique({ where: { id } });
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }

    const updated = await prisma.pembicara.update({
        where: { id },
        data: { name, role },
    });
    res.json(updated);
};
//5. menghapus data pembicara berdasarkan id
export const deletePembicara = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const pembicara = await prisma.pembicara.findUnique({ where: { id } });
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }

    const isPembicaraUsed = await prisma.event.findFirst({
        where: { pembicaraId: id }
    });

    if (isPembicaraUsed) {
        return res.status(400).json({ 
            message: "Gagal menghapus! Pembicara ini masih terdaftar di salah satu event aktif." 
        });
    }

    await prisma.pembicara.delete({ where: { id } });
    res.json({ message: "Pembicara berhasil dihapus" });
};