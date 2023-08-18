import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.routes';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';

class Server extends ConfigServer {
    public app: express.Application = express();
    private port : number = this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.dbConnect();

        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers())
        this.listen()
    }

    routers(): Array<express.Router>{
        return [new UserRouter().router]
    }

    async dbConnect(): Promise<void> {
        try {
            await new DataSource(this.typeORMConfig).initialize();
            console.log('\x1b[36m%s\x1b[0m', 'Database Connected'); 
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', 'Database Connection Error: ${error}' );
        }
    }

    public listen() {
        this.app.listen( this.port, () => {console.log('\x1b[35m%s\x1b[0m',`Server listening on port ${this.port}`)});
    }
}

new Server();