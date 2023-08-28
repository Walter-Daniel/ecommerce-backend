import { AuthService } from '../services/auth.service';
import { PayloadToken } from '../interfaces/auth.iterface';
import { PassportUse } from '../utilities/passport.use';
import { ExtractJwt, Strategy as JwtStr, StrategyOptions} from 'passport-jwt';

export class JwtStrategy extends AuthService{
    constructor(){
        super();
    }
    async validate(payload: PayloadToken, done:any) {
        return done(null, payload)
    }

    get use(){
        return PassportUse<
        JwtStr,
        StrategyOptions, 
        (payload: PayloadToken, done: any)=>Promise<PayloadToken>>(
            'jwt',
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment('JWT_SECRET')
            },
            this.validate
        )
    }
}