import { faker } from "@faker-js/faker"
import { jest } from "@jest/globals"
import { GraphQlClientAdapter } from "./graphql-client-adapter"

type SutTypes = {
  graphql: GraphQlClientAdapter
}

const makeSut = (
  endpoint = faker.internet.url(),
  headers: HeadersInit = {
    'token': '',
    'contentType': ''
  }
): SutTypes => {  
  const graphql = new GraphQlClientAdapter(endpoint, headers)
  
  return {
    graphql
  }
}

describe("GraphQlClientAdapter", () => {
  it("Should call request with the correct query", () => {
    const query = faker.lorem.sentence()
    
    const { graphql } = makeSut()

    const requestSpy = jest.spyOn(graphql, "request")

    graphql.request(query)

    expect(requestSpy).toHaveBeenCalledWith(query)

    requestSpy.mockRestore();
  })

  it("Should correctly set the endpoint when instantiating GraphQlClientAdapter", () => {
    const endpoint = faker.internet.url()

    const { graphql } = makeSut(endpoint)

    expect(graphql.endpoint).toBe(endpoint)
  })

  it("Should correctly set headers when instantiating GraphQlClientAdapter", () => {
    const headers = {
      'token': '',
      'contentType': ''
    }

    const { graphql } = makeSut("", headers)

    expect(graphql.headers).toBe(headers)
  })

  it("Should return the correct response on success graphql.request", async () => {
    const query = faker.lorem.sentence()

    const { graphql } = makeSut()

    jest.spyOn(graphql, "request").mockResolvedValueOnce({ result: query })

    const response = await graphql.request(query)

    expect(response).toEqual({ result: query })
  })
})