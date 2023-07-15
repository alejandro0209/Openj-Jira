import { NextPage } from "next";
import { Layout } from "@/components/layouts";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { EntryList, NewEntry } from "@/components/ui";



const HomePage: NextPage= () => {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 90px)'}}>
           <CardHeader title='Pendientes' /> 

            <NewEntry />
           <CardContent>
              {/* Agregar terea nueve */}
              <EntryList status='pending' />
           </CardContent>

          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title='En progreso' />

            <CardContent>
              {/* Agregar terea nueve */}
              <EntryList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title='Completadas' />

            <CardContent>
              {/* Agregar terea nueve */}
              <EntryList status='finished' />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;