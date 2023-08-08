import * as dotenv from 'dotenv';

//inicializar una clase abstracta, no se puede instanciar. se puede extender como herencia.

export abstract class ConfigServer {
    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv,
        });
    }

    public getEnvironment(key: string): string | undefined {
        //El argumento va a estar dinamicamnte. Cuando se le pase el string, va a poder leer la variable de entorno
        return process.env[key] //process.env['PORT']
    }
    //lee la variable de entorno y define un número
    public getNumberEnv(key:string): number {
        return Number(this.getEnvironment(key))
    }

    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || '';
    }

    //Se configura la app para leer determinado path dependiendo de la variable de entorno que se use.
    public createPathEnv(path: string): string {
        const arrEnv: Array<string> = ['env']
        if(path.length > 0){
            const stringToArray = path.split('.');
            arrEnv.unshift(...stringToArray)
        }
        return '.' + arrEnv.join('.')
    }
}