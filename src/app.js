const express = require('express');
const app = express();
app.get('/test', (req, res) => {
    res.send('Hello World!');
}
);
app.post('/test', (req, res) => {
    res.send('Hello World!');
});
app.use("/tests", (req, res) => {
    res.send("Hello World hi man ");
});
app.delete('/testdelete', (req, res) => {
    res.send('Hello World! Delete');
});
app.listen(3000, () => {console.log('Server is running on port 3000');   
});
  