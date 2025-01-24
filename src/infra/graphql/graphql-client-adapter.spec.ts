import { faker } from "@faker-js/faker"
import { GraphQlClientAdapter } from "./graphql-client-adapter"

type SutTypes = {
  graphql: GraphQlClientAdapter
}

const makeSut = (endpoint = faker.internet.url()): SutTypes => {
  const graphql = new GraphQlClientAdapter(endpoint)
  return {
    graphql
  }
}

describe("GraphQlClientAdapter", () => {
  it("Should call request with the correct query", () => {
    const query = faker.lorem.sentence()
    
    const { graphql } = makeSut()

    const requestSpy = jest.spyOn(graphql, "request");

    graphql.request(query)

    expect(requestSpy).toHaveBeenCalledWith(query)

    requestSpy.mockRestore();
  })

  it("Should correctly set the endpoint when instantiating GraphQlClientAdapter", () => {
    const endpoint = faker.internet.url()

    const { graphql } = makeSut(endpoint)

    expect(graphql.endpoint).toBe(endpoint)
  })
})