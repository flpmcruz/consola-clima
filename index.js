import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busqueda.js";

const main = async() => {
    let opt;

    const busquedas = new Busquedas()

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                
                //buscar los lugares
                const lugares  = await busquedas.ciudad(termino)
                
                //Seleccionar el lugar
                const id = await listarLugares(lugares)
                if(id === '0') continue

                //guardar en DB
                const lugarSel = lugares.find( lugar => lugar.id === id)
                busquedas.agregarHistorial(lugarSel.nombre)
    
                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
    
                //mostrar resultados
                console.clear()
                console.log('Informacion de la ciudad \n'.green)
                console.log('Ciudad: ', lugarSel.nombre.green)
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng: ', lugarSel.lng)
                console.log('Temperatura: ', clima.temp)
                console.log('Minima: ', clima.min)
                console.log('Maxima: ', clima.max)
                console.log('Como esta el clima: ', clima.desc.green)
    
                break;
            
            case 2: 
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${ lugar }`)
                })

            default:
                break;
        }

        await pausa()
    } while (opt !== 0);

}
main()