import { GraphQLClient } from "graphql-request"

export class GraphQlClientAdapter {
  private readonly graphqlClient: GraphQLClient;

  constructor (
    public readonly endpoint: string,
    public readonly headers: HeadersInit
  ) {
    this.graphqlClient = new GraphQLClient(this.endpoint, { headers: this.headers });
  }

  async request(query: string) {
    return this.graphqlClient.request(query);
  }
}