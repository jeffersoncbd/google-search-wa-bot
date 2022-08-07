import http from 'http'

if (!process.env.SERVER_PORT) {
  throw new Error('Defina a variável SERVER_PORT no arquivo .env')
}

interface ServerRequest extends http.IncomingMessage {
  body: any
}

type Handler = (request: ServerRequest, response: http.ServerResponse) => void

export class Server {
  private server: http.Server

  constructor() {
    this.server = http.createServer()
  }

  addRequestHandler(handler: Handler) {
    this.server.on('request', (request, response) => {
      request.on('data', (chunk) => {
        const body = JSON.parse(chunk.toString('utf8'))
        handler({ ...request, body } as ServerRequest, response)
      })

      response.writeHead(200)
      response.end()
    })
  }

  start() {
    this.server.listen(Number(process.env.SERVER_PORT))
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
  }
}
