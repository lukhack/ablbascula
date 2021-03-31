import router  from './routes/router';
import Server from "./class/server";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

//Body parser 

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

server.app.all('/', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

server.app.use(cors({credentials: false, origin: true}))
server.app.use('/', router);

export default server