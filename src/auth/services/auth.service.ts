import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigServer } from '../../config/config';
import { UserService } from '../../user/services/user.services';
import { UserEntity } from '../../user/entities/user.entity';
import { PayloadToken } from '../interfaces/auth.iterface';

export class AuthService extends ConfigServer {
    constructor(
                private readonly userService: UserService = new UserService(),
                private readonly jwtInstance = jwt
    ){
        super();
    }
    public async validateUser(
        userName:string, 
        password:string
    ): Promise<UserEntity | null>{
        const userByEmail = await this.userService.findUserByEmail(userName)
        const userByUserName = await this.userService.findUserByUserName(userName)

        if(userByUserName){
            const isMatch = await bcrypt.compare(password, userByUserName.password);
            //Si existe el match retorna el dato del usuario
            isMatch && userByUserName;
        }
        if(userByEmail){
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            isMatch && userByEmail;
        }
        return null
    }

    //Crear función de firma
    sing(payload: jwt.JwtPayload, secret:any){
        return this.jwtInstance.sign(payload, secret)
    }

    public async generateJWT(user: UserEntity): Promise<{accessToken:string, user: UserEntity}>{
        const userConsult = await this.userService.findUserByRole( user.id, user.role );
        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: userConsult!.id
        };
        if(userConsult){ user.password = 'Not permission' };
        return {
            accessToken: this.sing(payload, this.getEnvironment('JWT_SECRET')),
            user
        }
    }
}