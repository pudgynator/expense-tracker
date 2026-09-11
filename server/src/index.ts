import express from 'express';
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(router)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});