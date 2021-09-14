const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use('/api/singlestring/:status',(req,res,next)=> {
    let status = req.params.status || 400;
    console.log("Error Message API sample for status "+ status + " time "+ new Date());
    if(+status >= 200 && +status <= 210){
        res.status(200).send({issueCount:2});
    }else{
    res.status(+status).send("Something is broken");
    }
});

app.use('/api/:status',(req,res,next)=> {
    let status = req.params.status || 400;
    console.log("Error Message API sample for status "+ status + " time "+ new Date());
    if(+status >= 200 && +status <= 210){
        res.status(200).send({issueCount:2});
    }else{
    res.status(+status).send({errorMessage:"Something broken",devMessage:"dev for testing purpose this error ",issueCount:0});
    }
});

app.get('/',(req,res,next)=>{
    res.send("Use /api /api/singlestring");
});

app.listen(PORT,()=>{
    console.log(`listen to port ${PORT}`);
});