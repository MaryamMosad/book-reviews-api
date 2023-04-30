import { GraphQLError } from "graphql";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator
} from "graphql-query-complexity";

export const graphqlQueryComplexity = async () => {
  const maxComplexity = 15;

  return {
    async didResolveOperation({ request, document, schema }) {
      const complexity = getComplexity({
        schema,
        operationName: request.operationName,
        query: document,
        variables: request.variables,
        estimators: [
          fieldExtensionsEstimator(),
          simpleEstimator({ defaultComplexity: 1 })
        ]
      });

      if (complexity > maxComplexity) {
        throw new GraphQLError(
          `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`
        );
      }
      console.log("Used query complexity points:", complexity);
    }
  };
};
