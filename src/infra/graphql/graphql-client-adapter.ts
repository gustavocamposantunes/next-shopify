import { GraphQLRequest, GraphQLResponse, GraphQLSuccessResponse } from "@/data/protocols/graphql";
import { GraphQLClient } from "graphql-request"

export class GraphQlClientAdapter implements GraphQLRequest {
  private readonly graphqlClient: GraphQLClient;

  constructor (
    public readonly endpoint: string,
    public readonly headers: HeadersInit
  ) {
    this.graphqlClient = new GraphQLClient(this.endpoint, { headers: this.headers });
  }

  async request(query: string): Promise<GraphQLResponse> {
    try {
      const response = await this.graphqlClient.request(query);
      return { data: response } as GraphQLSuccessResponse;
    } catch (error: any) {
      return {
        result: error.response?.data || null,
        status: error.response?.status || 500,
      };
    }
  }
}