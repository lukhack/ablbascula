import {Socket} from "socket.io";
import socketIO from 'socket.io';
import { Usuario } from '../class/usuarios';
import { UsuariController } from '../controller/UsuarioController';


export const usrcontroller = new UsuariController();

export const connectCliente=(client:Socket, io:socketIO.Server)=>{
    const usuario = new Usuario(client.id);
    usrcontroller.agregar(usuario);
    io.emit('usuarios-activos', usrcontroller.getLista())
}

export const desconectar = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on("disconnect", ()=>{
        console.log("cliente desconectado");
        usrcontroller.remove(cliente.id);
        
        
    
    })
    
}

export const mensaje = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on("messageEvent",(payload)=>{
            console.log("mensaje eminito", payload)


    })
}
