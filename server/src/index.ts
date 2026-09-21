import express from 'express';
import router from "./routes/index.js";
import { errorHandler } from './middleware/error.js';

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});