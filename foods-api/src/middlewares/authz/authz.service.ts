/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CanActivate, Injectable } from '@nestjs/common';
import { checkScope } from './helper';

@Injectable()
export class Scopes implements CanActivate {
  requiredScopes: any;
  personalKey = 'personalScopes';
  getRolesKey = 'roles';
  getPersonalScope: (scopes, requireScopes) => boolean;
  getFirstGroupScopes: (accessWithScopes, requiredScopes) => any;

  constructor(requiredScopes) {
    this.requiredScopes = requiredScopes;
    // tslint:disable-next-line:no-shadowed-variable
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

    // tslint:disable-next-line:no-shadowed-variable
    this.getFirstGroupScopes = (accessWithScopes, requiredScopes) => {
      let hasFirstGroupScopes = false;
      const firstGroupIDs = [];
      if (!accessWithScopes || !Object.keys(accessWithScopes).length) {
        return {
          hasFirstGroupScopes,
          firstGroupIDs,
        };
      }
      for (const access in accessWithScopes) {
        if (!accessWithScopes[access]) {
          continue;
        }
        hasFirstGroupScopes = checkScope({
          scopes: accessWithScopes[access],
          requiredScopes,
        });
        if (!hasFirstGroupScopes) {
          continue;
        }
        firstGroupIDs.push(access);
      }
      return {
        hasFirstGroupScopes: firstGroupIDs.length ? true : false,
        firstGroupIDs,
      };
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
    // tslint:disable-next-line:no-string-literal
    const roles = user['roles'];

    if (roles.includes(0)) {
      req.user.isAdmin = true;
      return true;
    }
    const personalScopes = user[`personalScopes`] || [];
    const firstScopes = user[`firstScopes`] || [];
    const hasPersonalScopes = this.getPersonalScope(
      personalScopes,
      requiredScopes,
    );
    const { hasFirstGroupScopes, firstGroupIDs } = this.getFirstGroupScopes(
      firstScopes,
      requiredScopes,
    );
    req.user.hasPersonalScopes = hasPersonalScopes;
    req.user.hasFirstScopes = hasFirstGroupScopes;
    // tslint:disable-next-line:no-string-literal
    req.user['storeIDs'] = firstGroupIDs;

    if (hasPersonalScopes || hasFirstGroupScopes) {
      return true;
    }
    return false;
  }
}
