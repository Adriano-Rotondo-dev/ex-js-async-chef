//TODO: SNACK 1
/*
//* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
. Questa funzione accetta un id di una ricetta e deve:
. Recuperare la ricetta da https://dummyjson.com/recipes/{id}
. Estrarre la proprietà userId dalla ricetta
. Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
. Restituire la data di nascita dello chef
//* Note 
. Scrivi la funzione getChefBirthday(id), che deve:
. Essere asincrona (async).
. Utilizzare await per chiamare le API.
. Restituire una Promise con la data di nascita dello chef.
. Gestire gli errori con try/catch
*/
//TODO: 🎯 Bonus 1 ✔
// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

//TODO: 🎯 Bonus 2
//Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.

import dayjs from "dayjs";

async function getChefBirthday(id) {
  try {
    const getRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!getRecipe) throw new Error("errore recupero ricetta");
    const recipe = await getRecipe.json();

    const userId = recipe.userId;
    if (!userId) throw new Error("Errore recupero id user");
    const getUserId = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!getUserId) throw new Error("Errore recupero dati dello user");
    const userInfo = await getUserId.json();
    // return userInfo.birthDate;
    const formatBirthDate = dayjs(userInfo.birthDate).format("DD/MM/YYYY");
    return formatBirthDate;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

getChefBirthday(1)
  .then((birthday) => console.log("Data di Nascita dello chef :", birthday))
  .catch((error) => console.error(error));
