import { GraphQLClient, GraphQLResponse } from "graphql-request"

export class GraphQlClientAdapter {
  private readonly graphqlClient: GraphQLClient;

  constructor (
    public readonly endpoint: string,
    public readonly headers: HeadersInit
  ) {
    this.graphqlClient = new GraphQLClient(this.endpoint, { headers: this.headers });
  }

  async request(query: string): Promise<GraphQLResponse<object> | unknown> {
    try {

      return await this.graphqlClient.request(query).then(resp => resp).catch(error => error);
    } catch (error: any) {
      return {
        result: error.response?.data || null,
        status: error.response?.status || 500,
      };
    }
  }
}