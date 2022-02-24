const mongoose = require('mongoose');
const ConnectionDataBase = () => { 
    mongoose.connect(process.env.DATABASE_REMOTE, {
        useNewUrlParser: true,
    }).then(() => { console.log('connected DataBases') }).catch(err => {
        console.log('connected DataBases error', err.message);
     });
}
module.exports = ConnectionDataBase;