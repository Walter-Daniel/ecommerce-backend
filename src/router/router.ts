import { Router } from 'express';

//Clase utilizada como bandera para extender clases, trabaja con genéricos.
//Cada una de las rutas trabajara con su respctivos middleware y constroladores, configuración y servicios.
//El génerico T es un controlador y el U es un Middleware.
export class BaseRouter<T> {
    public router: Router;
    public controller: T;
    //public middleware: U
    constructor(TController: { new(): T }){
        this.router = Router();
        //lo interpreta como una clase, y cuando lo declare dentro del Super, lo ejecuta.
        this.controller = new TController();
        this.routes()
    }
    routes(){}
}