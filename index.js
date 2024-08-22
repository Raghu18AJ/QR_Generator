const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { qrImage: null });
});

app.post('/generate', (req, res) => {
    const urlInput = req.body.urlInput;
    if (urlInput) {
        const qrImage = qr.imageSync(urlInput, { type: 'png' });
        res.render('index', { qrImage: `data:image/png;base64,${qrImage.toString('base64')}` });
    } else {
        res.render('index', { qrImage: null });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
