import { GraphQLResponse } from "./graphql-response";

export interface GraphQLRequest {
  request(query: string): Promise<GraphQLResponse>
}