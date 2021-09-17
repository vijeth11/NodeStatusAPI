const express = require('express');
const xml = require('xml');
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

app.use('/api/xml/:status',(req,res,next) => {
    let status = req.params.status || 400;
    console.log("Error Message API sample for xml with status "+ status + " time "+ new Date());
    res.set('Content-Type', 'text/xml');
    if(+status >= 200 && +status <= 210){
        res.status(200).send(xml({issueCount:2},{ declaration: { standalone: 'yes', encoding: 'UTF-16' }}));
    }else{    
    res.status(+status).send(xml([{errorMessage:"Something broken"},{devMessage:"dev for testing purpose this error "},{issueCount:0}],{ declaration: { standalone: 'yes', encoding: 'UTF-16' }}));
    }
})

app.use('/api/object/:type',(req,res,next) => {
    let type = req.params.type || 'null'
    if(type.toString().toLowerCase() == 'null'){
        console.log("Error Message API sample for null"+ " time "+ new Date() );
        res.status(200).send(null);
    }

    if(type.toString().toLowerCase() == 'empty'){
        console.log("Error Message API sample for empty"+ " time "+ new Date() );
        res.status(200).send("");
    }
})

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
