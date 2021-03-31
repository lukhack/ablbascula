import { Usuario } from "../class/usuarios";

export class UsuariController{
   private lista: Usuario[] = [];

   constructor(){}

   public agregar(Usuario:Usuario){
     this.lista.push(Usuario);
     console.log(this.lista);
     return Usuario;
   }

   public udpateNombre(id:string, nombre:string){
        const usr = this.lista.find(x=>x.id==id);
        if(usr!==undefined)
                usr.nombre= nombre;
        console.log("======= actulizando usuairo =====");
        console.log(this.lista);

   }


   public getLista(){
     return this.lista.filter(usuario=> usuario.nombre!=="sin-nombre");
   }

   public get(id:string){
       return this.lista.find(usuario=> usuario.id ===id);
   }


   public getEnSala(sala:string){
        return this.lista.filter(usuario=> usuario.sala===sala);
   }


   //borrar un usuario

   public remove(id:string){
      const tempUsuario = this.get(id);
      this.lista = this.lista.filter(usuairo=> usuairo.id !== id);
      return tempUsuario;
   }



}
