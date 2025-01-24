import { faker } from "@faker-js/faker"
import { GraphQlClientAdapter } from "./graphql-client-adapter"

describe("GraphQlClientAdapter", () => {
  it("Should call request with the correct query", () => {
    const query = faker.lorem.sentence()
    const graphql = new GraphQlClientAdapter()

    const requestSpy = jest.spyOn(graphql, "request");

    graphql.request(query)

    expect(requestSpy).toHaveBeenCalledWith(query)

    requestSpy.mockRestore();
  })
})