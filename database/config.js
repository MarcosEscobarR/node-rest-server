require('colors')
const mongoose = require('mongoose')

const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database Connected'.green)
    } catch (e) {
        console.log(e)
        throw new Error('ERROR TO CONNECT DATABASE'.red)
    }
}

module.exports = {
    databaseConnect
}