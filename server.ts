//arquivo de inicialização da aplicação/servidor
import { app } from "./src/app";

app.listen(3000, () => { console.log('Server online!')})