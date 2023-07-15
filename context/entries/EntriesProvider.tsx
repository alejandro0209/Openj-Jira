import React, { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';



export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};


interface Props {
    children?: React.ReactNode | undefined;
}


export const EntriesProvider: FC<Props>  = ({ children }) => {

    const { enqueueSnackbar } = useSnackbar();
    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );


    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] Add-Entry', payload: data });
    }


    const updateEntry = async( { _id, description, status }: Entry, showSnackbar= false  ) =>{

        try {

            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });

            dispatch({ type: '[Entry] Entry-Updated', payload: data });
        } catch (error) {
            console.log(error);
        }

        if( showSnackbar ){
            enqueueSnackbar('Tarea actualizada con exito!!!', {
                variant: 'success',
                autoHideDuration: 1500,
            });
        }

    }


    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    const deleteEntry = async( {_id }: Entry ) => {
        
        const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);

        dispatch({type: '[Entry] Entry - Delete', payload: data} );

        enqueueSnackbar('Tarea eliminada correctamente', {
            variant: 'info',
            autoHideDuration: 1500,
        });
    }


    useEffect(() => {
        refreshEntries();
    }, [])
    


    return (
        <EntriesContext.Provider value={{
             ...state,

             //Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    );
}