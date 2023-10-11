require('colors');

const { guardarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
    pausa,
    leerInput
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas')


const main = async() => {
    console.log('Este es un nuevo cambio');

    let opt = '';
    const tareas = new Tareas();

     do {
       opt = await inquirerMenu();
       console.log({ opt });
            
       switch (opt){
        case '1':
            // crear opcion
             const desc = await leerInput('Descripción: ');
             tareas.crearTarea( desc )
        break;

        case '2':
            console.log( tareas.listadoArr );
        break; 
 }


 //guardarDB( tareas.listadoArr );


        await pausa();
     } while( opt !== '0');


    //pausa();

}


main();



