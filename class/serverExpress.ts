import express = require("express");

export default class Server{
    public app: express.Application;

    constructor(private port: number){
        this.app=express();
    }

    start(callBack?:any){
        this.app.listen(this.port,"192.168.1.57", callBack);
    }

    static init(port:number) : Server{
        return new Server(port);
    }
}