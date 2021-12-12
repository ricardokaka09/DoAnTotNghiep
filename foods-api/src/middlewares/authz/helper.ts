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
export const checkScope = ({ scopes, requiredScopes }) => {
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
