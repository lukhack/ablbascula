
import { Router, Request, Response } from 'express';
import path = require("path");
import Server from '../class/server';
import { Socket } from 'socket.io';
import { json } from 'body-parser';
import { usrcontroller } from '../sockets/sockets';
const router = Router();

router.get('/', ( req: Request, res: Response  ) => {

    res.sendFile(path.join(__dirname,'..','..','www','index.html'));

});
/*
setInterval(()=>{
    console.log("emitiendo");
    const payload={de:"data",mensaje:"prueba"}
    const server = Server.instance;
    //in es para enviar un mensaje a un canal en particular
    server.io.emit('messageEvent', payload);
},1000)
*/

export default router;


