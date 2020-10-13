const express = require('express');

const app = express();

app.use(express.static('./dist/montecarlo'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/montecarlo/'}),
);

app.listen(process.env.PORT || 8080);