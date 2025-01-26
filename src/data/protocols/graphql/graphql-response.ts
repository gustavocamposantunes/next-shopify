export interface GraphQLSuccessResponse {
  data: object
}

export interface GraphQLErrorResponse {
  result: any
  status: number
}

export type GraphQLResponse = GraphQLSuccessResponse | GraphQLErrorResponse
