import { pow, mean, sqrt } from 'mathjs';
import { PorterStemmer } from 'natural';
import { getCosineSimilarityRowVector, sortByScore } from './common';
PorterStemmer.attach();

function predictWithCfUserBased(
  ratingsGroupedByUser,
  ratingsGroupedByProduct,
  userId,
) {
  const { userItem } = getMatrices(
    ratingsGroupedByUser,
    ratingsGroupedByProduct,
    userId,
  );
  const { matrix, productIDs, userIndex } = userItem;

  const matrixNormalized = meanNormalizeByRowVector(matrix);
  const userRatingsRowVector = matrixNormalized[userIndex];

  const cosineSimilarityRowVector = getCosineSimilarityRowVector(
    matrixNormalized,
    userIndex,
  );

  const predictedRatings = userRatingsRowVector.map((rating, productIndex) => {
    const productID = productIDs[productIndex];

    const productRatingsRowVector = getProductRatingsRowVector(
      matrixNormalized,
      productIndex,
    );

    let score;
    if (rating === 0) {
      score = getPredictedRating(
        productRatingsRowVector,
        cosineSimilarityRowVector,
      );
    } else {
      score = rating;
    }

    return { score, productID };
  });

  return sortByScore(predictedRatings);
}

function getPredictedRating(ratingsRowVector, cosineSimilarityRowVector) {
  const N = 5;
  const neighborSelection = cosineSimilarityRowVector
    .map((similarity, index) => ({
      similarity,
      rating: ratingsRowVector[index],
    }))
    .filter((value) => value.rating !== 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, N);

  const numerator = neighborSelection.reduce((result, value) => {
    return result + value.similarity * value.rating;
  }, 0);

  const denominator = neighborSelection.reduce((result, value) => {
    return result + pow(value.similarity, 2);
  }, 0);

  return numerator / sqrt(denominator);
}

function getProductRatingsRowVector(userBasedMatrix, productIndex) {
  return userBasedMatrix.map((userRatings) => {
    return userRatings[productIndex];
  });
}

function meanNormalizeByRowVector(matrix) {
  return matrix.map((rowVector) => {
    return rowVector.map((cell) => {
      return cell !== 0 ? cell - getMean(rowVector) : cell;
    });
  });
}

function getMean(rowVector) {
  const valuesWithoutZeroes = rowVector.filter((cell) => cell !== 0);
  return valuesWithoutZeroes.length ? mean(valuesWithoutZeroes) : 0;
}

export function getMatrices(
  ratingsGroupedByUser,
  ratingsGroupedByProduct,
  uId,
) {
  const userItem = Object.keys(ratingsGroupedByUser).reduce(
    (result, userId, userIndex) => {
      const rowVector = Object.keys(ratingsGroupedByProduct).map(
        (productID) => {
          return getConditionalRating(ratingsGroupedByUser, userId, productID);
        },
      );

      result.matrix.push(rowVector);

      if (userId === uId) {
        result.userIndex = userIndex;
      }

      return result;
    },
    {
      matrix: [],
      productIDs: Object.keys(ratingsGroupedByProduct),
      userIndex: null,
    },
  );

  return { userItem };
}

function getConditionalRating(value, primaryKey, secondaryKey) {
  if (!value[primaryKey]) {
    return 0;
  }

  if (!value[primaryKey][secondaryKey]) {
    return 0;
  }

  return value[primaryKey][secondaryKey].rating;
}

function recommendationProducts([productMetaData, productKeywords, ratings]) {
  const uuid = '3343';
  const { PRODUCTS_BY_ID, PRODUCTS_IN_LIST } = prepareProducts(
    productMetaData,
    productKeywords,
  );

  const ME_USER_RATINGS = [
    addUserRating(uuid, 'ao dai ha noi', '4.0', PRODUCTS_IN_LIST),
    addUserRating(uuid, 'ca', '3.0', PRODUCTS_IN_LIST),
    addUserRating(uuid, 'ao dai 6', '4.0', PRODUCTS_IN_LIST),
    addUserRating(uuid, 'ao dai', '4.0', PRODUCTS_IN_LIST),
    addUserRating(uuid, 'trai cay', '1.0', PRODUCTS_IN_LIST),
    addUserRating(uuid, 'thit heo', '1.0', PRODUCTS_IN_LIST),
  ];

  const { ratingsGroupedByUser, ratingsGroupedByProduct } = prepareRatings([
    ...ME_USER_RATINGS,
    ...ratings,
  ]);

  const UserBasedRecommendation = predictWithCfUserBased(
    ratingsGroupedByUser,
    ratingsGroupedByProduct,
    uuid,
  );

  console.log(
    'UserBasedRecommendation',
    sliceAndDice(UserBasedRecommendation, PRODUCTS_BY_ID, 4),
  );

  return sliceAndDice(UserBasedRecommendation, PRODUCTS_BY_ID, 4);
}

function sliceAndDice(recommendations, PRODUCTS_BY_ID, count) {
  recommendations = recommendations.filter(
    (recommendation) => PRODUCTS_BY_ID[recommendation.productID],
  );

  recommendations = recommendations.map((productRating) => ({
    product: PRODUCTS_BY_ID[productRating.productID],
    score: productRating.score,
  }));

  return recommendations.slice(0, count);
}

function prepareProducts(productsMetaData, productsKeywords) {
  let PRODUCTS_IN_LIST = zip(productsMetaData, productsKeywords);
  PRODUCTS_IN_LIST = withTokenizedAndStemmed(PRODUCTS_IN_LIST, 'description');
  PRODUCTS_IN_LIST = withTokenizedAndStemmed(PRODUCTS_IN_LIST, 'properties');
  PRODUCTS_IN_LIST = withTokenizedAndStemmed(PRODUCTS_IN_LIST, 'tag');
  PRODUCTS_IN_LIST = fromArrayToMap(PRODUCTS_IN_LIST, 'description');

  const PRODUCTS_BY_ID = PRODUCTS_IN_LIST.reduce(byId, {});

  return {
    PRODUCTS_BY_ID,
    PRODUCTS_IN_LIST,
  };
}

function prepareRatings(ratings) {
  const ratingCountsByProduct = getRatingCountsByProduct(ratings);
  const ratingCountsByUser = getRatingCountsByUser(ratings);

  const POPULARITY_THRESHOLD = {
    productRatings: 1,
    userRatings: 1,
  };

  const ratingsGroupedByUser = getRatingsGroupedByUser(
    ratings,
    ratingCountsByUser,
    POPULARITY_THRESHOLD,
  );

  const ratingsGroupedByProduct = getRatingsGroupedByProduct(
    ratings,
    ratingCountsByProduct,
    ratingCountsByUser,
    POPULARITY_THRESHOLD,
  );

  return {
    ratingsGroupedByUser,
    ratingsGroupedByProduct,
  };
}

function zip(productsMetaData, productsTag) {
  return Object.keys(productsMetaData).map((productID) => ({
    ...productsMetaData[productID],
    ...productsTag[productID],
  }));
}
/* used to NLK converted property to arr*/
function withTokenizedAndStemmed(array, property) {
  return array.map((each) => ({
    ...each,
    [property]: each[property] && each[property].tokenizeAndStem(),
  }));
}

export function byId(productsById, product) {
  productsById[product.productID] = product;
  return productsById;
}

function fromArrayToMap(array, property) {
  return array.map((each) => {
    const transformed = each[property]?.map((value) => ({
      id: value,
      name: value,
    }));
    return { ...each, [property]: transformed };
  });
}

/* Add user rating */
function getProductIndexByTitle(PRODUCTS_IN_LIST, query) {
  const index = PRODUCTS_IN_LIST.map((product) => product.name).indexOf(query);

  if (!index) {
    throw new Error('Product not found');
  }

  const { name, productID } = PRODUCTS_IN_LIST[index];
  return { index, name, productID };
}

function addUserRating(userID, searchTitle, rating, PRODUCTS_IN_LIST) {
  const { name, productID } = getProductIndexByTitle(
    PRODUCTS_IN_LIST,
    searchTitle,
  );

  return {
    userID,
    rating,
    productID,
    name,
  };
}
/*-------------X ------------X ---------*/

/*  process ratings data */
function getRatingsGroupedByProduct(
  ratings,
  ratingCountsByProduct,
  ratingCountsByUser,
  popularityThreshold,
) {
  const { productRatings, userRatings } = popularityThreshold;

  return ratings.reduce((result, value) => {
    const { userID, productID, rating } = value;

    if (
      ratingCountsByProduct[productID] < productRatings ||
      ratingCountsByUser[userID] < userRatings
    ) {
      return result;
    }

    if (!result[productID]) {
      result[productID] = {};
    }

    result[productID][userID] = { rating: Number(rating) };

    return result;
  }, {});
}

function getRatingsGroupedByUser(ratings, ratingCounts, popularity) {
  return ratings.reduce((result, value) => {
    const { userID, productID, rating } = value;

    if (ratingCounts[productID] < popularity.userRatings) {
      return result;
    }

    if (!result[userID]) {
      result[userID] = {};
    }

    result[userID][productID] = { rating: Number(rating) };

    return result;
  }, {});
}
function getRatingCountsByUser(ratings) {
  return ratings.reduce((result, value) => {
    const { userID } = value;

    if (!result[userID]) {
      result[userID] = 0;
    }

    result[userID]++;

    return result;
  }, {});
}

function getRatingCountsByProduct(ratings) {
  return ratings.reduce((result, value) => {
    const { productID } = value;

    if (!result[productID]) {
      result[productID] = 0;
    }

    result[productID]++;

    return result;
  }, {});
}
/* --------------- X ----------X-------- */

export default recommendationProducts;
