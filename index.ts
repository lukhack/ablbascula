import app from './app';

async function main(){
  await app.start(()=>{
        console.log(`servidor correindo en el puerto  ${app.port}`)
    })
    console.log('server port 40000');
}

main();