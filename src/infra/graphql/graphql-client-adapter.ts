export class GraphQlClientAdapter {
  constructor (
    public readonly endpoint: string,
    public readonly headers: object
  ) {}

  async request(query: string) {
    Promise.resolve({
      data: {
        result: `${query}`
      }
    })
  }
}