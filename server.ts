//arquivo de inicialização da aplicação/servidor
import { app } from "./src/app";

app.listen(3333, () => { console.log('Server online!')})