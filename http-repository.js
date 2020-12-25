const Repository = require('./repositories')
const request = require('./request')

class HttpRepository extends Repository {
    constructor(options) {
        super()
        this.options = options
    }

    async get() {
        const repositories = await request({
            ...this.options,
            method: 'get',
            path: `/users/Brarion/repos`,
        })

        return JSON.parse(repositories)
    }
}

module.exports = HttpRepository