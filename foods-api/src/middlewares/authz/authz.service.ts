/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CanActivate, Injectable } from '@nestjs/common';
import { checkScope } from './helper';

@Injectable()
export class Scopes implements CanActivate {
  requiredScopes: any;
  personalKey = 'personalScopes';
  getRolesKey = 'roles';
  getPersonalScope: (scopes, requireScopes) => boolean;

  constructor(requiredScopes) {
    this.requiredScopes = requiredScopes;
    this.getPersonalScope = (scopes, requiredScopes) => {
      if (!scopes || !requiredScopes) {
        return false;
      }

      const hasPersonalScopes = checkScope({
        scopes,
        requiredScopes,
      });
      return hasPersonalScopes;
    };
  }
  canActivate(context) {
    const requiredScopes = this.requiredScopes;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user.roles);
    if (!requiredScopes || !requiredScopes.length) {
      req.user.isPublic = true;
      return true;
    }
    if (!user) {
      return false;
    }
    const roles = user['roles'];

    if (roles.includes(0)) {
      req.user.isAdmin = true;
      return true;
    }
    const personalScopes = user[`roles`] || [];
    const hasPersonalScopes = this.getPersonalScope(
      personalScopes,
      requiredScopes,
    );
    req.user.hasPersonalScopes = hasPersonalScopes;

    if (hasPersonalScopes) {
      return true;
    }
    return false;
  }
}
