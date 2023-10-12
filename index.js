require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas')


const main = async() => {
    console.log('Este es un nuevo cambio');

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

     do {
       opt = await inquirerMenu();
       console.log({ opt });
            
       switch (opt){
        case '1':
            // crear opcion
             const desc = await leerInput('Descripción: ');

             const a = await tareas.crearTarea( desc )
             console.log(a);
        break;

        case '2':
        tareas.listadoCompleto();
        break; 

        case '3':
            tareas.listarPendientesCompletadas(true);
        break;

        case '4':
            tareas.listarPendientesCompletadas(false);
            break;

        case '5':
            const ids = await mostrarListadoChecklist(tareas.listadoArr);
            tareas.toggleCompletadas(ids);
            break;

        case '6':
            const id = await listadoTareasBorrar(tareas.listadoArr);
            if (id !== '0'){
                const ok = await confirmar('¿Esta seguro?');
                if (ok) {
                    tareas.borrarTarea(id);
                    console.log('La tarea ha sido borrada');
                }
            }
            break;
    }
    
    
    guardarDB( tareas.listadoArr );

        await pausa();

     } while( opt !== '0');

}


main();



