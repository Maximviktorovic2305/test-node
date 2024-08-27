import express from 'express';   
import cors from 'cors';
import dotenv from 'dotenv'

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 5112

app.get('/data', (req, res) => {
    const data = [
        { id: 1, name: 'Васька', age: 30 },
        { id: 2, name: 'Петька', age: 25 },
        { id: 3, name: 'Виталька', age: 35 },
    ];
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Application start on port ${PORT}`);
});