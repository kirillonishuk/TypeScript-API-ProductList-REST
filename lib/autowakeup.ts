import * as http from 'http';

const options = {
    hostname: 'localhost',
    port: process.env.PORT || 8080,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export const wakeUp = () => {
    const request = http.request(options, response => {
        response.on('data', data => {
            console.log(response.statusCode)
        })
    })
    request.on('error', (error) => {
        console.error(error.message);
    });
    request.end();
}