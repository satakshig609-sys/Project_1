const express = require("express");
const app = express();
const PORT = 3000;

// app.grt("/sample", (req, res) => {
//     let age = parseInt(req.params.age) //requesting age from frountend
//     if (age < 18) {
//         throw new Error("You are not eligible to vote")//when ever erroe will come server will crash

//     } else {
//         res.send("You are eligible to vote")
//     }
// })

// app.listen(POST, () => console.log("server is running on port 300"));


//better approch with try catch

app.get("/age-check/:age", (req, res,next) => {
    let age = parseInt(req.params.age)
    try {
        if (age < 18) {
            throw new Error("You are not eligible to vote")
        } else {
            res.send("You are eligible to vote")
        }
    }catch(error){
        // res.status(500).json({success:false,message:"Age is less than 18"})
        next(error);
    }
})

app.use((err,req,res,next)=>{
    res.status(500).json({success:false,message:err.message});
})



app.use((req,res)=>{//invalid route middleware => agr route nahi mila toh middleware handle kre ga error ko
    //use to handile request from route that does not exist in the application

    res.status(404).json({success:false,message:"Route not found"})
})

app.listen(PORT, () => console.log("server is running on port 3000"));

