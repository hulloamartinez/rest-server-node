 const  mongoose = require('mongoose')



const dbConnection = async() => {


    try {

        await mongoose.connect( process.env.MONGODB_CNN);

        console.log('base de datos en línea');


        
    } catch (error) {
        console.log(error)
        throw new Error('Error en el proceso de BD: ')
    }


}

module.exports = {
    dbConnection
}