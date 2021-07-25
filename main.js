const express = require('express')
const os = require('os')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(os)
})

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/view/" + "main.html" );
})

app.get('/FileFolderSystem', function (req, res) {
  res.sendFile(__dirname + "/view/" + "FFS.html");
})

app.get('/demo/monaco-script-demo.html', function (req, res) {
  res.sendFile( __dirname + "/view/" + "monaco-script-demo.html" );
})

// app.get('/path/:path([0-9a-zA-Z\/\%]+)', function (req, res) {
//   res.send(req.params)
//   console.log("[test]", req.params);
// })

var routes = require('./api/routes/FFSystemRoutes');
routes(app);


app.use('/node_modules', express.static( __dirname + "/" + "node_modules" ));

app.listen(port, () => {
  console.log(`[System] listening at http://localhost:${port}`)
})