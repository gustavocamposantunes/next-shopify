export class GraphQlClientAdapter {
  async request(query: string) {
    Promise.resolve({
      data: {
        result: `${query}`
      }
    })
  }
}