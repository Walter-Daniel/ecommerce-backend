import passport, { Strategy } from 'passport';

type TypeStrategy<T,U,X>={ new (params: U, Callback:X):T }

//Nos permite tipar por completo las estrategias. Nombre de la estratégia, su configuración, función verify que será el callback
export function PassportUse<T extends Strategy,U,X>(
    name:string, 
    Strategy: TypeStrategy<T,U,X>, 
    params:U, 
    callback:X
){
    passport.use(name, new Strategy(params, callback))
}