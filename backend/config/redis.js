const redis = require('redis')

const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});

client.on('connect', () => {
    console.log('Connected to redis');
})

client.on('ready', () => {
    console.log('Ready to use');
})

client.on('error', (err) => {
    console.log(err.message);
})

client.on('end', (err) => {
    console.log('Disconnected from redis');
})

process.on('SIGINT', () => {
    client.quit()
})

module.exports = client