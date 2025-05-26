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


/* <---------- SNAKE QUIZ ----------> */

//Liaison des balises avec le js
let zoneQuiz = document.getElementById("zoneQuiz");
let question = document.getElementById("question");
let cptRebourd = document.getElementById("compteRebourd");
let proposition = document.getElementById("proposition");
let reponse = document.getElementById("reponses");
let coeur = document.getElementById("vies");

let compteur = 0;
let nbBonneReponse = 0;
let vies = 3;
let intervalId = null;

function minuteur (data) {
    //Réinitialise le minuteur
    clearInterval(intervalId);

    let temps = 10;
    cptRebourd.textContent = temps;

    intervalId = setInterval(() => {
        temps--;
        cptRebourd.textContent = temps;

        if (temps === 0) {
            clearInterval(intervalId);
            reponse.textContent = "Temps écoulé !";
            compteur++;
            vies--;
            setTimeout(() => afficherQuestion(data), 1000);
        }
    }, 1000);
}

function afficherQuestion (data) {
    //On efface au préalable le contenu de reponse et de proposition
    proposition.innerHTML = "";
    reponse.textContent = "";

    //On affiche les vies
    coeur.textContent = vies;

    if (vies === 0) {
        question.textContent = `Game over ! Score : ${nbBonneReponse} / ${data.length}`
        cptRebourd.textContent = ""
        return;
    }

    //Si le nombre de questions posées = nb questions dans tableau
    if (compteur === data.length) {
        question.textContent = `Fin du quiz ! Score : ${nbBonneReponse} / ${data.length}`;
        cptRebourd.textContent = ""
        return;
    }

    //On récupère UN des objets
    let QCM = data[compteur];

    //On récupère et affiche la question
    question.textContent = QCM.question;

    //On récupère le tableau de réponse
    let tableReponse = QCM.answers;
    console.log(tableReponse);
    
    //On récupère la réponse correct
    let correctReponse = tableReponse[QCM.correct];
    console.log(correctReponse);
    
    //On mélange le tableau
    let tableMelanger = tableReponse.sort(() => Math.random() - 0.5);

    //On récupère l'index de la réponse correct après mélange
    let correctIndex = tableMelanger.indexOf(correctReponse);

    //On boucle le tableau de réponse pour les afficher
    tableMelanger.forEach((element, index) => {
        let boutonReponse = document.createElement("button");
        boutonReponse.textContent = element;
        proposition.appendChild(boutonReponse);

        boutonReponse.addEventListener("click", () => {
            clearInterval(intervalId);

            if (index === correctIndex) {
                reponse.textContent = "Bonne réponse !";
                nbBonneReponse++;
            } else {
                reponse.textContent = "Mauvaise réponse !";
                vies--;
            }

            compteur++;
            setTimeout(() => afficherQuestion(data), 1000);
        })
    });
    minuteur(data);
}

fetch("questions.json")
.then(response => response.json())
.then(data => {
        
    afficherQuestion(data);
    console.log("Test1000");   
})