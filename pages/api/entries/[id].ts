import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
{message: string}
|IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if( !mongoose.isValidObjectId( id )){
        return res.status(400).json({ message: 'El id no es valido ' + id })
    }

    switch( req.method ){

        case 'PUT':
            return updateEntry( req, res, id );

        case 'GET':
            return getEntry(req, res, id);

        case 'DELETE':
            return deleteEntry(req, res, id);

        default:
            return res.status(400).json({ message: 'Metodo no existe.' });

    
    }

}


const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data>, selectedId: string | string[] | undefined) => {

    await db.connect();

        const entryToUpdate = await Entry.findById( selectedId );

        if( !entryToUpdate ){
            db.disconect();
            return res.status(400).json({ message: 'No hay entrada con ese Id' });
        }

        const { 
            description = entryToUpdate.description, 
            status = entryToUpdate.status
        } = req.body;

        try {
            const updatedEntry = await Entry.findByIdAndUpdate(selectedId, { description, status }, { runValidators: true, new: true });
            await db.disconect();

            res.status(200).json(updatedEntry!);
        } catch (error: any) {
            await db.disconect();
            res.status(400).json({ message: error.errors.status.message });
        }

}


const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data>, id: string | string[] | undefined ) => {

    await  db.connect();

    const entry = await Entry.findById( id );

    db.disconect();

    if( !entry ){
        return res.status(400).json({ message: 'No hay entrada con ese Id' })
    }
    
    res.status(200).json( entry );
}


const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string | string[] | undefined) =>{
    await db.connect();
    const entryTodelete = await Entry.findById( id );

    if ( !entryTodelete ) {
        db.disconect();
        return res.status(400).json({ message: 'No hay entrada con ese Id' });
    }  

    try {
        
        await Entry.findByIdAndDelete(id);
        res.status(200).json(entryTodelete);
        
    } catch (error) {
        await db.disconect();
        res.status(400).json({ message: 'Error al eliminar' });
    }
    
    await db.disconect();
}