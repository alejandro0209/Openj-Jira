import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'
import { Layout } from "@/components/layouts";
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Entry, EntryStatus } from "@/interfaces";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "@/utils";



const validStatus: EntryStatus[] = ['pending' , 'in-progress' , 'finished'];

interface Props {
    entry: Entry;
}

export const EntryPage: FC<Props> = ( { entry } ) => {

    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status );
    const [touched, setTouched] = useState(false);

    const { updateEntry, deleteEntry } = useContext( EntriesContext );
    const router = useRouter();

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched , [ inputValue, touched ]);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {

        if( inputValue.trim().length === 0) return;

        const upadatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }
        
        updateEntry( upadatedEntry, true ); 

        router.push('/');
    }

    const onDelete = () => {

        const entryToDelete: Entry = {
            ...entry
        }

        deleteEntry(entryToDelete);
        router.push('/');
    }
 

  return (
    <Layout title={ inputValue.substring( 0, 20 ) + '...'}>

        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2}}
        >

            <Grid
                item
                xs={ 12 } sm={ 10 } md={ 6 }
            >
                <Card>
                    <CardHeader 
                        title={`Entrada:`}
                          subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ).toLowerCase() }`}
                     />

                     <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            fullWidth
                            placeholder="Nueva entrada"
                            multiline
                            label= "Nueva entrada"
                            value={ inputValue }
                            onChange={ onTextFieldChange }
                            onBlur={ () => setTouched(true) }
                              helperText={ isNotValid  && 'Ingrese texto' } 
                              error={isNotValid }
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                sx={{ marginLeft: 4}}
                                value={ status }
                                onChange={ onStatusChanged }
                            >
                                {
                                      validStatus.map( s => (

                                        <FormControlLabel 
                                            key={ s }
                                            value={ s }
                                            control={ <Radio/>}
                                            label = { capitalize(s) }
                                        />
                                      ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon/>}
                                variant='contained' 
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>
                     </CardContent>
                </Card>
            </Grid>
        </Grid>

        <IconButton
            sx={{ 
                position: "fixed",
                bottom: 30,
                right: 30,
                backgroundColor: 'red'
            }} 
              onClick={onDelete}
        >
              <DeleteOutlineOutlinedIcon/>
        </IconButton>

    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string };
    const entry = await dbEntries.getEntryById(id);

    if ( !entry ){
        return{
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;
