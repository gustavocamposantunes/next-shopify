export class GraphQlClientAdapter {
  constructor (
    public readonly endpoint: string
  ) {}

  async request(query: string) {
    Promise.resolve({
      data: {
        result: `${query}`
      }
    })
  }
}