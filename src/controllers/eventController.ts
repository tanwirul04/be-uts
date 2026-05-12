import { Request, Response } from "express";
import { Event } from "../types/event";

let events: Event[] = [];

//1. menampilkan data event
export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};

//2. menyimpan data event
export const createEvent = (req: Request, res: Response) => {
    const { name, category, tanggal, deskripsi } = req.body;
    
    //validasi jika name kosong
    if (!name || !category || !tanggal) {
        return res.status(500).json({ 
            message: "Nama, category atau tanggal event harus diisi", 
        });
    }

    //mapping data event
    const newEvent: Event = {
        id: Date.now(),
        name: name,
        category: category,
        tanggal: tanggal,
        deskripsi: deskripsi
    };

    //simpan datannya
    events.push(newEvent);

    //jika berhasil disimpan
    res.status(201).json(newEvent);
};

//3. mengambil data event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = events.find((e) => e.id === id);

    //Jika data tidak ada
    if (!event) {
        return res.status(404).json({
            message: "Event tidak ditemukan",
        });
    }
    //jika ada
    res.json(event);
};

//4. mengupdate data event berdasarkan id 
export const updateEvent = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, category, tanggal, deskripsi } = req.body;

    const index = events.findIndex((e) => e.id === id);

    //cek apakah data ada
    if (index === -1) {
        return res.status(404).json({
            message: "Event tidak ditemukan",
        });
    }

    //validasi input
    if (!name || !category || !tanggal) {
        return res.status(400).json({
            message: "Nama, category atau tanggal event harus diisi",
        });
    }

    //update data
    events[index] = {
        id: events[index]!.id,
        name: name,
        category: category,
        tanggal: tanggal,
        deskripsi: deskripsi
    };

    //response hasil update
    res.json(events[index]);    
};

//5. menghapus data event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = events.findIndex((e) => e.id === id);

    //cek apakah data ada
    if (index === -1) {
        return res.status(404).json({
            message: "Event tidak ditemukan",
        });
    }

    //hapus data
    events.splice(index, 1);

    //response berhasil
    res.json({
        message: "Event berhasil dihapus",
    });
};