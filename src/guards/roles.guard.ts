import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) { }
    canActivate (context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>( 
            ROLES_KEY,
            [context.getHandler(),context.getClass()]
        )
        if(!requiredRoles) {
            return true
        }

        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException({message: "User not authorized"})
        }
        const bearer = authHeader.split(" ")[0];
        const token = authHeader.split(" ")[1];
        if(bearer !== "Bearer" || !token) {
            throw new UnauthorizedException({message: "User not authorized"})
        }
        
        let user: any;
        try {
            user = this.jwtService.verify(token);
        } catch (error) {
        throw new UnauthorizedException({message: "User not authorized"})
        }
        req.user = user
        const permission = user.roles.some((role:any)=> {
            requiredRoles.includes(role.value)
        })
        if(!permission) {
            throw new ForbiddenException({
                message: 'You do not have permission to perform this action'
            })
        }
        return true;
    }    
    
}