const { format } = require("date-fns")
const fsPromises = require("fs").promises
const fs = require("fs")
const path = require("path")
const {v4: uuid} = require('uuid')

const logEvents= async(message, logFileName) => {
    const dateTime =`${format(new Date(), 'yyyyMMhh\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid}\t${message}\n`
    

    try {
        if(!fs.existsSync(path.join(__dirname, "..", "logs"))){
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"))

        }
        await fs.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (error) {
        console.log(error)
        
    }
}

const loggers =(req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`)
    console.log(`${req.method}${req.path}`)
    next()
}



module.exports = {
    logEvents,
    loggers
}