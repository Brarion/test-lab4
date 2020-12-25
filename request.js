module.exports = async (options) => {
    const http = options.port === 443 ? require('https') : require('http')

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            const body = []

            res.on('data', (chunk) => body.push(chunk))

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(Buffer.concat(body).toString())
                } else {
                    reject(new Error(res.statusMessage))
                }
            })
        })

        req.on('error', (error) => reject(error))

        req.end()
    })
}