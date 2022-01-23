interface Access {
  [key: string]: string;
}
const checkAndAddScopesToAccess = ({
  accessAndScopes = {},
  accessKey,
  accessScopes,
}: any) => {
  if (!accessKey || !accessScopes) {
    return accessAndScopes;
  }
  if (!accessAndScopes[accessKey]) {
    accessAndScopes[accessKey] = accessScopes;
    return accessAndScopes;
  }
  accessAndScopes[accessKey] = accessAndScopes[accessKey].concat(
    ...accessScopes,
  );
  return accessAndScopes;
};
export const getRolesScopes = (
  accesses: Access[],
  rolesWithScopes: any,
  roleName = 'roleName',
) => {
  const roles = [];
  const personalScopes = [];
  let firstScopes = {};
  if (!accesses || !accesses.length) {
    return {
      roles,
      personalScopes,
      firstScopes,
    };
  }
  for (const access of accesses) {
    if (!access) {
      continue;
    }
    roles.push(access[roleName]);
    switch (true) {
      case !!access[`storeID`]:
        firstScopes = checkAndAddScopesToAccess({
          accessAndScopes: firstScopes,
          accessKey: access[`storeID`],
          accessScopes: rolesWithScopes[access[roleName]],
        });
        continue;
      default:
        personalScopes.push(...rolesWithScopes[access[roleName]]);
        continue;
    }
  }
  return {
    roles,
    personalScopes,
    firstScopes,
  };
};
