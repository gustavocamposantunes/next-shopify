import { faker } from "@faker-js/faker"
import { jest } from "@jest/globals"
import { GraphQlClientAdapter } from "./graphql-client-adapter"
import { gql } from "graphql-request"

type SutTypes = {
  graphql: GraphQlClientAdapter
}

const makeSut = (): SutTypes => {  
  const graphql = new GraphQlClientAdapter()
  
  return {
    graphql
  }
}

describe("GraphQlClientAdapter", () => {
  it("Should call request with the correct values", () => {
    const url = faker.internet.url()
    const document = gql`{
      document: ${ faker.lorem.sentence() }
    }`
    const RequestHeaders = {
      'token': '',
      'contentType': ''
    }
    
    const { graphql } = makeSut()

    const requestSpy = jest.spyOn(graphql, "request")

    const requestParams = { url, document, RequestHeaders }
    graphql.request(requestParams)

    expect(requestSpy).toHaveBeenCalledWith(requestParams)

    requestSpy.mockRestore();
  })

  it("Should return the correct response on success graphql.request", async () => {
    const url = faker.internet.url()
    const document = gql`{
      document: ${ faker.lorem.sentence() }
    }`

    const { graphql } = makeSut()

    jest.spyOn(graphql, "request").mockResolvedValueOnce({ result: document, status: 200 })

    const response = await graphql.request({ url, document })

    expect(response).toEqual({ result: document, status: 200 })
  })

  it("Should throw the correct error on graphql.request", async () => {
    const url = faker.internet.url()
    const document = gql`{
      document: ${ faker.lorem.sentence() }
    }`

    const { graphql } = makeSut()

    const mockError = { result: document, status: 404 }
    jest.spyOn(graphql, "request").mockRejectedValueOnce(mockError)

    expect(graphql.request({ url, document} )).rejects.toEqual(mockError)
  })
})