const HttpRepository = require('./http-repository')
const Service = require('./service')

const main = async () => {
    const repositories = new HttpRepository({
        host: 'api.github.com',
        port: 443,
    })

    const service = new Service(repositories)

    console.log(await service.getRepositories())
}

main()