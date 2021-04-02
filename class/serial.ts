import { timeStamp } from 'node:console';
import SerialPort  from 'serialport';

export default class ReadSerialPort{
    public static _intace:ReadSerialPort;
    public portSerial:string;
    public baudios?:number;   
    public port!:SerialPort;
    private autoOpen:boolean;
    
    constructor(portSerial:string, autoOpen:boolean, baudios?:number){
        this.portSerial=portSerial;
        this.baudios=baudios;
        this.autoOpen=autoOpen;
        this.createPort();
    }

    public createPort(){
        this.port = new SerialPort(this.portSerial, 
        { 
            autoOpen: this.autoOpen, 
            baudRate:this.baudios,  
            
        });
    }

    
    

    public static getInstance(portSerial:string, baudios:number, autoOpen:boolean){
        return this._intace || (this._intace = new this(portSerial,autoOpen,baudios));
            
    }
} 


