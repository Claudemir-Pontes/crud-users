//application/server startup file
import { app } from "./src/app";

app.listen(3000, () => { console.log('Server running...')})