import http from 'http'

if (!process.env.SERVER_PORT) {
  throw new Error('Defina a variável SERVER_PORT no arquivo .env')
}

interface ServerRequest extends http.IncomingMessage {
  body: any
}
interface ServerResponse {
  statusCode: number
}

type Handler = (
  request: ServerRequest,
  response: http.ServerResponse
) => ServerResponse

export class Server {
  private server: http.Server

  constructor() {
    this.server = http.createServer()
  }

  addRequestHandler(handler: Handler) {
    this.server.on('request', (request, response) => {
      let body: any
      request.on('data', (body) => {
        body = JSON.parse(body.toString('utf8'))
      })

      const serverResponse = handler(
        { ...request, body } as ServerRequest,
        response
      )

      response.writeHead(serverResponse.statusCode)
      response.end()
    })
  }

  async start() {
    this.server.listen(Number(process.env.SERVER_PORT))
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
  }
}
