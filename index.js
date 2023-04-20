const express = require('express');
const xml = require('xml');
const xml2js = require('xml2js');
const app = express();
var xmlparser = require('express-xml-bodyparser');

const builder = new xml2js.Builder({
  renderOpts: { 'pretty': false }
});

app.use(express.json());

app.use('/api/singlestring/:status',(req,res,next)=> {
  let status = req.params.status || 400;
  console.log("Error Message API sample for status "+ status + " time "+ new Date());
  if(+status >= 200 && +status <= 210){
      res.status(200).send({issueCount:2});
  }else{
  res.status(+status).send("Something is broken");
  }
});

app.use('/api/xml/:status',xmlparser(),(req,res,next) => {
  let status = req.params.status || 400;
  console.log("Error Message API sample for xml with status "+ status + " time "+ new Date());
  res.set('Content-Type', 'text/xml');
  if(req.body && Object.keys(req.body).length !== 0){
    res.status(200).send(builder.buildObject(req.body));
  }else if(+status >= 200 && +status <= 210){
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


app.get('/*', (req, res) => {
    res.status(200).send("Welcome to the Custom API \n Use /api/object/:type \n /api/xml/:status \n /api/singlestring/:status \n (post)/* with body");
})

app.post('/*', (req, res) => {
    res.status(200).json(req.body);
})

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
module.exports = app;
