import { Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { ExecutionContext,ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserSelfGuard implements CanActivate {
    canActivate(context: ExecutionContext):boolean | Promise<boolean> | Observable<boolean>{
        const req = context.switchToHttp().getRequest();
        if(String(req.user.id) !== req.params.id) {
            throw new ForbiddenException({
                message: "You do not have permission to perform this action"
            })
        }
        return true
    }
}