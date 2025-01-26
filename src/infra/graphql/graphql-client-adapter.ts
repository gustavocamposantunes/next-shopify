import { GraphQLRequest, GraphQLRequestParams, GraphQLResponse, GraphQLSuccessResponse } from "@/data/protocols/graphql";
import { request } from "graphql-request"

export class GraphQlClientAdapter implements GraphQLRequest {

  async request(params: GraphQLRequestParams): Promise<GraphQLResponse> {
    try {
      const response = await request(params.url, params.document);
      return { data: response } as GraphQLSuccessResponse;
    } catch (error: any) {
      return {
        result: error.response?.data || null,
        status: error.response?.status || 500,
      };
    }
  }
}