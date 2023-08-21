import { EntityTarget, Repository, ObjectLiteral } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

//Base service es de tipo genérico porque ejecuta cada entidad por cada modulo que tenemos, por lo que se necesita que sea genérico para reutilizar en cada uno de los modulos.
export class BaseServise<T extends BaseEntity> extends ConfigServer {

    public execRepository: Promise<Repository<T>>
    constructor( private getEntity: EntityTarget<T> ) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>>{
        const getConn = await this.initConnect;
        return getConn.getRepository(entity);
    }
}