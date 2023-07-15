import mongoose  from "mongoose";



const mongoConnection  = {
    isConected: 0
}

export const connect = async() => {

    if (mongoConnection.isConected){
        console.log('Estamos conectados');
        return;
    }

    if( mongoose.connections.length > 0 ){
        mongoConnection.isConected = mongoose.connections[0].readyState;

        if( mongoConnection.isConected === 1){
            console.log('Usando conexion anterior')
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect( process.env.MONGO_URL || '' );
    mongoConnection.isConected = 1;

    console.log('Conectado a MongoDB', process.env.MONGO_URL)
}

export const disconect = async() => {
    
    if ( mongoConnection.isConected === 0 ) return;
    await mongoose.disconnect();

    mongoConnection.isConected = 0;
    console.log('Desonectado de MongoDB');
}