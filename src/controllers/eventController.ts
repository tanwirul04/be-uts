import { Request, Response } from "express";
import { Event } from "../types/event.js";
import { prisma } from "../lib/db.js";

let events: Event[] = [];

//1. menampilkan data event
export const getEvents = async (req: Request, res: Response) => {
    const allEvents = await prisma.event.findMany({
        include: {
            category: true,   
            pembicara: true,  
        },
        orderBy: { createAt: "desc" },
    });
    res.json(allEvents);
};

//2. menyimpan data event
export const createEvent = async (req: Request, res: Response) => {
    const { name, location, dateEvent, description, categoryId, pembicaraId } = req.body;

    if (!name || !location || !dateEvent || !categoryId || !pembicaraId) {
        return res.status(400).json({ message: "Data event belum lengkap" });
    }

    const newEvent = await prisma.event.create({
        data: {
            name,
            location,
            dateEvent: new Date(dateEvent), 
            description,
            categoryId: Number(categoryId),   
            pembicaraId: Number(pembicaraId), 
        },
    });
    res.status(201).json(newEvent);
};

//3. mengambil data event berdasarkan id
export const getEventById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
        where: { id },
        include: { category: true, pembicara: true }
    });
    
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json(event);
};
//4. mengupdate data event berdasarkan id 
export const updateEvent = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, location, dateEvent, description, categoryId, pembicaraId } = req.body;

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    const updated = await prisma.event.update({
        where: { id },
        data: {
            name,
            location,
            dateEvent: dateEvent ? new Date(dateEvent) : undefined,
            description,
            categoryId: categoryId ? Number(categoryId) : undefined,
            pembicaraId: pembicaraId ? Number(pembicaraId) : undefined,
        } as any,
    });
    res.json(updated);
};

//5. menghapus data event berdasarkan id
export const deleteEvent = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event berhasil dihapus" });
};