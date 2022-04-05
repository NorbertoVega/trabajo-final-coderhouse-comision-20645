const server = require('./src/app');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
