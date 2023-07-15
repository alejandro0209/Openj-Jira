import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    entries: Entry[];

    //Methods
    addNewEntry: ( description: string ) => void;
    updateEntry: ( entry: Entry, showSnackbar?: boolean ) => void;
    deleteEntry: ( entry: Entry ) => void;
}


export const EntriesContext = createContext({} as ContextProps );