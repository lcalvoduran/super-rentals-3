import Route from '@ember/routing/route';
//import {waitFor} from '@ember/test-helpers';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];
export default class IndexRoute extends Route {

/* Desde aquí hacemos el fetch de los datos... */

 async model(){ 
    
      let response = await fetch('../api/rentals.json');
      console.log("[STATUS]: " + response.status + ": " + response.statusText);
      console.log("... Awaiting data");
      let parsed = await response.json();
      console.log(parsed);
      await myFunction(1000);
      console.log("... Awaiting [waitFor]")    
      return parsed;
      
   
  }

}
function myFunction(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ================ ¿Qué es un promise? ================ 

/**
 * Una promesa (promise) es un objeto que representa la eventual finalización o fallo de una operación asíncrona y su valor resultante.
 * 
 * 1. ¡Prometo un resultado!
 * 2. *producing the code* este código puede llevar algún tiempo...
 * 3. *consumiendo código* este código debe esperar el resultado
 * 
 * Básicamente una promise es un objeto javascript que 
 * 
 **/
