import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from 'cors';
import * as helmet from 'helmet';
const PORT = process.env.PORT || 30000;

createConnection().then(async () => {

    // create express app
    const app = express();
    //midlewares
    app.use(cors());
    app.use(helmet());


    app.use(express.json());

    // start express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(error => console.log(error));
