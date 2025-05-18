/* <---------- MAIN ----------> */

/* <---------- MEMORY CARD ----------> */

let allCard = document.querySelectorAll(".card");
let firstCard;
let secondCard;
let lockBoard = false;
let score = 0;
let boucleInfinie = true;


// Gestion du score et pour recommencer

let jsP = document.getElementById("paragraphe");
jsP.textContent = `Score : ${score} / ${allCard.length / 2}`;

let jsButton = document.getElementById("restart");
jsButton.addEventListener("click", () => location.reload());


// Pour générer les cartes dans un ordre aléatoire
function reroll() {
    let cards = Array.from(allCard);

    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition;
    })
}

reroll();

// Pour vérifier et changer la valeur des cartes lorsqu'on clique dessus

allCard.forEach(myCard => {
    myCard.addEventListener("click", () => {
        let couleurCard = myCard.getAttribute("data-color");

        if (lockBoard || myCard.classList.contains("flipped")) return;

        myCard.classList.add("flipped");
        myCard.style.backgroundColor = couleurCard;

        if (firstCard) {
            secondCard = myCard;
        } else {
            firstCard = myCard;
        }

        let firstCardColor = firstCard.getAttribute("data-color");
        let secondCardColor = secondCard.getAttribute("data-color");

        lockBoard = true;

        if (firstCard && secondCard) {
            if (firstCardColor == secondCardColor) {
                setTimeout(() => {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");

                    score++;
                    jsP.textContent = `Score : ${score} / ${allCard.length / 2}`;


                    // Code pour l'affichage si le jeu est terminé

                    if (score == allCard.length / 2) {
                        console.log("Le score est bon");
                        jsP.textContent += " Félicitations !";
                        allCard.forEach(cardFinish => {
                            cardFinish.classList.remove("matched");
                        })

                        setInterval(() => {
                            reroll();
                        }, 1500);
                    }

                    firstCard = undefined;
                    secondCard = undefined;
                    lockBoard = false;
                }, 500);

            } else {
                setTimeout(() => {
                    firstCard.style.backgroundColor = "white";
                    secondCard.style.backgroundColor = "white";

                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    firstCard = undefined;
                    secondCard = undefined;
                    lockBoard = false;

                }, 500);

            }
        }

    })
});


/* <---------- CALCULATRICE ----------> */

let jsCalculatrice = document.querySelectorAll(".chiffre");
let jsEgal = document.getElementById("resultat");
let jsReset = document.getElementById("reset");
let jsAffichage = document.getElementById("affichage");

console.log(jsCalculatrice);

jsCalculatrice.forEach(bouton => {
    bouton.addEventListener("click", () => {
        jsAffichage.textContent += bouton.textContent;
    })
});

jsEgal.addEventListener("click", () => {
    jsAffichage.textContent = eval(jsAffichage.textContent);
});

jsReset.addEventListener("click", () => {
    jsAffichage.textContent = null;
})


/* <---------- GESTIONNAIRE ----------> */

let jsGestionnaireInput = document.getElementById("saisie");
let jsGestionnaireAjouter = document.getElementById("gesAjouter");
let jsGestionnaireTaskList = document.getElementById("taskList");


// Avec le tableau tasks

let tasks = [];

function afficherTaches () {
    jsGestionnaireTaskList.innerHTML = "";

    tasks.forEach((saisie, index) => {
        let jsDivTache = document.createElement("div");
        jsDivTache.classList.add("ligneTaches");

        let jsPTache = document.createElement("p");
        jsPTache.textContent = saisie;

        let jsButtonSupprimer = document.createElement("button");
        jsButtonSupprimer.classList.add("supprimer");
        jsButtonSupprimer.textContent = "Supprimer";

        let jsButtonModifier = document.createElement("button");
        jsButtonModifier.classList.add("modifier");
        jsButtonModifier.textContent = "Modifier";

        jsGestionnaireTaskList.appendChild(jsDivTache);
        jsDivTache.appendChild(jsPTache);
        jsDivTache.appendChild(jsButtonSupprimer);
        jsDivTache.appendChild(jsButtonModifier);


        jsButtonSupprimer.addEventListener("click", () => {
            tasks.splice(index, 1);
            afficherTaches();
        });

        jsButtonModifier.addEventListener("click", () => {
            let modification = prompt(`Modifier la tâche : ${saisie}`);

            // on vérifie que modification n'est pas vide avant d'utiliser
            // le .trim() pour éviter des erreurs

            if (modification && modification.trim() !== "") {
                tasks[index] = modification.trim();
                afficherTaches();
            }
        })
    });
}

jsGestionnaireAjouter.addEventListener("click", () => {
    if (jsGestionnaireInput.value.trim() == "") return;
    tasks.push(jsGestionnaireInput.value.trim());

    // .trim() signifie que les espaces inutiles 
    // de la chaîne de caractère sont enlevés
    // "    Bonjour    " devient "Bonjour"

    afficherTaches();
    
    jsGestionnaireInput.value = null;
})


// Sans le tableau tasks

// jsGestionnaireAjouter.addEventListener("click", () => {
//     const saisie = jsGestionnaireInput.value;

//     if (saisie == "") return;

//     let jsDivTache = document.createElement("div");
//     jsDivTache.classList.add("ligneTaches");

//     let jsPTache = document.createElement("p");
//     jsPTache.textContent = saisie;

//     let jsButtonSupprimer = document.createElement("button");
//     jsButtonSupprimer.classList.add("supprimer");
//     jsButtonSupprimer.textContent = "Supprimer";

//     let jsButtonModifier = document.createElement("button");
//     jsButtonModifier.classList.add("modifier");
//     jsButtonModifier.textContent = "Modifier";

//     jsGestionnaireTaskList.appendChild(jsDivTache);
//     jsDivTache.appendChild(jsPTache);
//     jsDivTache.appendChild(jsButtonSupprimer);
//     jsDivTache.appendChild(jsButtonModifier);


//     jsButtonSupprimer.addEventListener("click", () => {
//         jsGestionnaireTaskList.removeChild(jsDivTache);
//     })

//     jsGestionnaireInput.value = null;
// })