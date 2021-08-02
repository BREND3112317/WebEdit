const express = require('express')
const app = express();
const port = process.env.port || 3000

app.use(express.json());

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/view/" + "main.html" );
})

//todo: 整合同一個畫面顯示所有demo
app.get('/FileFolderSystem', function (req, res) {
  res.sendFile(__dirname + "/view/" + "FFS.html");
})

app.get('/FileView', function (req, res) {
  res.sendFile(__dirname + "/view/" + "FileView.html");
})

app.get('/MonacoDemo', function (req, res) {
  res.sendFile(__dirname + "/view/" + "MonacoDemo.html");
})

app.get('/demo/monaco-script-demo.html', function (req, res) {
  res.sendFile( __dirname + "/view/" + "monaco-script-demo.html" );
})

var routes = require('./api/routes/FFSystemRoutes');
routes(app);

app.use('/static', express.static( __dirname + "/static" ));
app.use('/node_modules', express.static( __dirname + "/" + "node_modules" ));
app.get('/favicon.ico', (req, res) => {
  res.sendFile( __dirname + "/" + "favicon.ico" );
})

app.listen(port, () => {
  console.log(`[System] listening at http://localhost:${port}`)
})