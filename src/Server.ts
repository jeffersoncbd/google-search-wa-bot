import http from 'http'

type RequestCallback = (body: any) => Promise<void>

export function startServer(requestCallback: RequestCallback) {
  if (!process.env.SERVER_PORT) {
    throw new Error('Defina a variável SERVER_PORT no arquivo .env')
  }

  const server = http.createServer((request, response) => {
    request.on('data', (body) => {
      const parsedBody = JSON.parse(body.toString('utf8'))
      requestCallback(parsedBody)
    })
    response.writeHead(200)
    response.end()
  })

  server.listen(Number(process.env.SERVER_PORT))
  console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
}
