import mongoose, { connect } from 'mongoose';

 const db_connect = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('Succesfully connected to database');
    }catch(error){
        console.log(`Error while connecting to database ${error}`);
    }
}

export default db_connect;