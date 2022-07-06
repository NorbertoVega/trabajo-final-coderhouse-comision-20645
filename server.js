import server from './src/app.js';
import config from './config.js'

server.listen(config.PORT, () => {
    console.log(`Listening at port ${config.PORT}`);
});
