import { CanActivate, ExecutionContext } from '@nestjs/common';

export class Scopes implements CanActivate {
  requiredScopes: string[];
  getPersonalScopes: (scopes: string[], requiredScopes: string[]) => any;
  getFirstGroupScopes: (accessWithScopes: any, requiredScopes: any) => any;
  getRolesKey: any;
  personalScopes: any;
  constructor(requiredScopes, getPersonalScopes) {
    this.requiredScopes = requiredScopes;
    // tslint:disable-next-line:no-shadowed-variable
    this.getPersonalScopes = (scopes, requiredScopes) => {
      if (!scopes || scopes.length === 0) {
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
    if (getPersonalScopes) this.getPersonalScopes = getPersonalScopes;
  }
  canActivate(context: ExecutionContext) {
    const requiredScopes = this.requiredScopes;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!requiredScopes || !requiredScopes.length) {
      req.user.isPublic = true;
      return true;
    }
    if (!user) {
      return false;
    }
    const roles = user[this.getRolesKey];
    if (roles.includes('ADMIN')) {
      req.user.isAdmin = true;
      return true;
    }
    const hasPersonalScopes = this.getPersonalScopes(
      this.personalScopes,
      requiredScopes,
    );

    req.user.hasPersonalScopes = hasPersonalScopes;
    if (hasPersonalScopes) {
      return true;
    }
    return false;
  }
}
const hasScopeInScopeData = ({ scopeData, scopes }) => {
  if (!scopeData || !scopes) {
    return false;
  }
  for (const scope of scopes) {
    if (!scopeData.includes(scope)) {
      continue;
    }
    return true;
  }
  return false;
};

const checkScope = ({ scopes, requiredScopes }) => {
  if (!scopes || scopes.length === 0) {
    return false;
  }
  const hasScopes = requiredScopes.every((scopeData) =>
    hasScopeInScopeData({
      scopeData,
      scopes,
    }),
  );
  return hasScopes;
};

export const getIDsInObject = ({ data, keys }) => {
  const ids = [];
  for (const key of keys) {
    if (!data[key]) {
      continue;
    }
    ids.push(data[key]);
  }
  return ids;
};
