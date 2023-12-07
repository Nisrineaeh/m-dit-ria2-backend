import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any): Promise<User> {
        console.log('validate');

        //extraction du username du payload du JWT
        const { username } = payload;

        // Recherche de l'utilisateur dans la base de données par son username
        const user: User = await this.userRepository.findOneBy({ username });

        //si user pas trouvé 
        if (!user) throw new UnauthorizedException();

        //si user valide 
        return user;
    }
}
