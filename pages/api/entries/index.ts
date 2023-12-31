import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    { message: string }
    | IEntry[]
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);

        case 'POST':
            return addEntry( req, res );

        case 'PUT':
            return addEntry(req, res);


        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}


const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconect();

    res.status(200).json(entries);
}

const addEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { description = '' } = req.body;
    
    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });

    try {

        await db.connect();
        await newEntry.save();
        await db.disconect();

        return res.status(200).json( newEntry );
        
    } catch (error) {
        await db.disconect();
        console.log(error);
        return res.status(500).json({ message: 'Algo salió mal'});
    }
    
    
    
    
}