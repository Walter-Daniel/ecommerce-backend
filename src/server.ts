import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.routes';

class Server {
    public app: express.Application = express();
    private port : number = 8000;

    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers())
        this.listen()
    }

    routers(): Array<express.Router>{
        return [new UserRouter().router]
    }

    public listen() {
        this.app.listen( this.port, () => {console.log('\x1b[33m%s\x1b[0m',`Server listening on port ${this.port}`)});
    }
}

new Server();