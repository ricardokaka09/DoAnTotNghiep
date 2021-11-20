import {
  Between,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';

export interface FindByPrice {
  fromPrice: string;
  toPrice: string;
}

export const buildUrlQuery = (params): string => {
  let url = '';

  if (!params) {
    return url;
  }

  const keys = Object.keys(params);

  const query = [];

  if (!keys || !keys.length) {
    return url;
  }

  keys.forEach((key) => {
    if (params[key]) {
      query.push(`${key}=${params[key]}`);
    }
  });

  if (!query.length) {
    return url;
  }

  url = query.join('&');

  return url;
};

export const buildFindingQuery = ({ query }) => {
  const { sortBy, limit, cursor, sortDirection, offset, ...findingQuery } =
    query;
  const validDirection: number = sortDirection === 'ASC' ? 1 : -1;
  const hasPage = !!limit;
  const sortingCondition = { [sortBy]: validDirection };

  for (const key in findingQuery) {
    if (!key) {
      continue;
    }

    if (Array.isArray(findingQuery[key]) && findingQuery[key].length) {
      findingQuery[key] = In(findingQuery[key]);

      continue;
    }

    if (findingQuery[key] === 'null') {
      findingQuery[key] = IsNull();
    }
  }

  const findAllQuery = { ...findingQuery };

  if (!limit) {
    return {
      findingQuery,
      sortingCondition,
      hasPage,
      findAllQuery,
    };
  }

  if (!cursor) {
    return {
      sortingCondition,
      findingQuery,
      findAllQuery,
      hasPage,
    };
  }

  if (offset && Number(offset) > 0) {
    return {
      sortingCondition,
      findingQuery,
      findAllQuery,
      hasPage,
    };
  }

  const condition: any = validDirection === 1 ? MoreThan : LessThan;
  findingQuery[sortBy] = condition(cursor);

  return {
    sortingCondition,
    findingQuery,
    findAllQuery,
    hasPage,
  };
};

export const buildRegexQuery = ({ query, regexFields }) => {
  if (!regexFields || !regexFields.length) {
    return query;
  }

  for (const key of regexFields) {
    if (!query[key]) {
      continue;
    }
    query[key] = Like(`%${query[key]}%`);
  }

  return query;
};

export const findPriceQuery = ({ fromPrice, toPrice }: FindByPrice) => {
  const query: any = {};

  switch (true) {
    case !Number(fromPrice) && !!Number(toPrice):
      query.price = LessThanOrEqual(Number(toPrice));
      return query;

    case !!Number(fromPrice) && !Number(toPrice):
      query.price = MoreThanOrEqual(Number(fromPrice));
      return query;

    case !!Number(toPrice) && !!Number(fromPrice):
      query.price = Between(Number(fromPrice), Number(toPrice));
      return query;

    default:
      return query;
  }
};
