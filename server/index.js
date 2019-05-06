const express = require("express"); 
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const config = require("./config/def");
const fakedb = require("./Fake-db")



const rentalRoutes = require("./routes/rental");
const userRoutes = require("./routes/user");

const options = {
    useNewUrlParser: true,
}

mongoose.connect(config.DB_URI,options).then(()=>{
    const fakeob = new fakedb();
    fakeob.seedDB();
});

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/rental',rentalRoutes);
app.use('/api/v1/users',userRoutes);



const PORT = process.env.PORT || 3001;



app.listen(PORT, function(){
    console.log("App is running....");
    
});