const mongoose = require("mongoose")

const connectDb = async() => {
    try {
        const connect=await mongoose.connect("mongodb+srv://Habeeb:Ademola1234@habeeb.pal57xa.mongodb.net/techNotesDB?retryWrites=true&w=majority")
        if (connect) {
            console.log("you have successfully connected to the DB")
        } else {
            console.log("there is an error")
            
        }
    } catch (error) {
        console.log(error)
        
    }
}



module.exports= {connectDb}