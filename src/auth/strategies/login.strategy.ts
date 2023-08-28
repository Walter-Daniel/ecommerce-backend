import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { UserEntity } from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utilities/passport.use';

const authservice: AuthService = new AuthService();

export class LoginStrategy {
    async validate(
        userName: string,
        password: string,
        //Función que va a ejecutar el middleware, si es correcta dejará ingresar
        done: any
    ): Promise<UserEntity>{
        const user = await authservice.validateUser(userName, password);
        if(!user){
            return done(null, false, {message: 'Invalidat credentials'})
        }
        return done(null, user)
    }
    get use(){
        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            'login', LocalStrategy, {
                userNameField: 'userName',
                passwordField: 'password'
            }, this.validate
        )
    }
}