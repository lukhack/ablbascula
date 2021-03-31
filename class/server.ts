

import { SERVER_PORT } from './../global/environment';
import express from 'express';
import http from 'http'
import socketIO from 'socket.io'
import { Socket } from 'socket.io';

import * as socket from '../sockets/sockets';
import SocketIO from 'socket.io';

const ios = require('socket.io')(80)
export default class Server{
    private static _intace: Server;
    public app:express.Application;
    public port:number;
    public io: SocketIO.Server;
    private httServer:http.Server;

    private constructor(){
        this.app = express();
       
        this.port = SERVER_PORT;
        this.httServer = new http.Server(this.app);
        
       

        this.io = require("socket.io")(this.httServer, {
           
            allowEIO3: true,  
            function(req:any,res:any){

                // Set CORS headers
                //res.setHeader('Access-Control-Allow-Origin', '192.168.1.57:*');
                res.setHeader('Access-Control-Request-Method', '*');
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
                res.setHeader('Access-Control-Allow-Headers', '*');
                if ( req.method === 'OPTIONS' || req.method === 'GET' ) {
                    res.writeHead(200);
                    res.end();
                    return;
                        }
            
            }
          });

        this.listenSockets();
    }

    public static get instance(){
            return this._intace || (this._intace = new this());
    }

    private listenSockets(){
        console.log("escuchando conexiones");
        this.io.on('connection', cliente  => {           
            console.log("cliente conectado");            
            //desconectar            
            socket.mensaje(cliente, this.io);

        });

        
    }

    start(callback: any ){
       

        //this.httServer.listen(this.port, "192.168.1.57", callback);
        this.httServer.listen(this.port, "localhost", callback);
    }
    
}