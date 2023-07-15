import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '@/context/entries';
import useReducer from 'react';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    const { setIsAddingEntry, isAddingEntry } = useContext( UIContext )

    const [inputValue, setInputValue] = useState('');

    const [touched, setTouched] = useState(false);

    const { addNewEntry }= useContext(EntriesContext)

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {

        if( inputValue.length === 0) return;
        addNewEntry( inputValue );

        setIsAddingEntry( false );
        setTouched( false );

      
        setInputValue('');
    }

    const onCancel = () => {
        setTouched(false);
        setIsAddingEntry( false );
        setInputValue('');
    }


    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingresa texto'}
                            error={ inputValue.length <= 0 && touched }
                            value={ inputValue }
                            onChange={ onTextFieldChange }
                            onBlur={ () => setTouched( true ) }
                        />

                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                onClick={ onCancel }
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />}
                                onClick={ onSave }
                            >
                                Guardar
                            </Button>
                        </Box> 

                    </>
                )
                : (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAddingEntry( true )}
                        >
                            Agregar Tarea
                        </Button>
                )

            }     
        </Box>
    )
}
