

import { SERVER_PORT } from './../global/environment';
import express from 'express';
import http from 'http'

import * as socket from '../sockets/sockets';
import SocketIO from 'socket.io';
import * as serial from '../class/serial'
import ReadSerialPort from './serial';

const ios = require('socket.io')(80)
export default class Server{
    private static _intace: Server;
    public app:express.Application;
    public port:number;
    public io: SocketIO.Server;
    private httServer:http.Server;
    private socketPort:ReadSerialPort;       

    private constructor(){
        this.app = express();
       
        this.port = SERVER_PORT;
        this.httServer = new http.Server(this.app);
        
        this.socketPort= ReadSerialPort.getInstance("COM254",9600,true);
       

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
            //socket.mensaje(cliente, this.io);

            const pesovl = (peso:number)=>{
                this.io.emit("pesoBascula",{peso});
                console.log("emitido evento");
            }
            
        });

        
    }

    start(callback: any ){
       
        //this.httServer.listen(this.port, "192.168.1.57", callback);
        this.httServer.listen(this.port, "localhost", callback);

        const pt = ReadSerialPort.getInstance("COM254",9600,true);
        
        let valueOld:number=0;
        let value:number=0;
        const dt = ReadSerialPort._intace;
        console.log("emitiendo escucha:");

        pt.port.on("open",()=>{
                setInterval(()=>{
                    pt.port.write("$");
                    value = Number(pt.port.read()?.toString())
                    //if(valueOld !== value){
                        console.log("port:",value)
                        valueOld=value;
                        this.io.emit("pesoBascula",value);
                    //}
                                            
                },500);
            });
        }
    }
    
}