const playerCardDisplayArea1 = document.querySelector('#playerCard1');
const playerCardDisplayArea2 = document.querySelector('#playerCard2');
const playerCardDisplayArea3 = document.querySelector('#playerCard3');

const playerCardTxtArea1 = document.querySelector('#playerCard1Text');
const playerCardTxtArea2 = document.querySelector('#playerCard2Text');
const playerCardTxtArea3 = document.querySelector('#playerCard3Text');

const dealerCardDisplayArea1 = document.querySelector('#dealerCard1');
const dealerCardDisplayArea2 = document.querySelector('#dealerCard2');
const dealerCardDisplayArea3 = document.querySelector('#dealerCard3');

const dealerCardTxtArea1 = document.querySelector('#dealerCard1Text');
const dealerCardTxtArea2 = document.querySelector('#dealerCard2Text');
const dealerCardTxtArea3 = document.querySelector('#dealerCard3Text');

const outcome = document.querySelector('#outcome');

flow = "begin";
deckId = "";
playerScore = 0;
dealerScore = 0;
score = "";
hasAce = false;

setCardImage = (img, imgElement, txtElement, txtValue) => {
    let cardImage = document.createElement('img');
    cardImage.setAttribute("src", img);
    cardImage.setAttribute("class", "img-fluid");
    imgElement.appendChild(cardImage);

    let desc = document.createElement('p')
    desc.setAttribute("class", "card-text");

    //desc.txtValue = txtValue;
    desc.innerHTML = txtValue;
    txtElement.appendChild(desc);
}

resetAll = () => {
    playerCardDisplayArea1.innerHTML ="";
    playerCardDisplayArea2.innerHTML ="";
    playerCardDisplayArea3.innerHTML ="";

    playerCardTxtArea1.innerHTML ="";
    playerCardTxtArea2.innerHTML ="";
    playerCardTxtArea3.innerHTML ="";
    
    dealerCardTxtArea1.innerHTML = "";
    dealerCardTxtArea2.innerHTML = "";
    dealerCardTxtArea3.innerHTML = "";

    dealerCardDisplayArea1.innerHTML ="";
    dealerCardDisplayArea2.innerHTML ="";
    dealerCardDisplayArea3.innerHTML ="";

    outcome.innerHTML ="";

    flow = "begin";
    deckId = "";

    playerScore = 0;
    dealerScore = 0;
    score = "";
    hasAce = false;
}

startblackjack = () => {
    let query = "https://deckofcardsapi.com/api/deck/new/draw/?count=4";

    resetAll();

    fetch(query, {
            method : 'GET',
            headers : {
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
                deckId = data.deck_id;
                data.cards.forEach(card => {
                console.log(card);
            })            
            

            setCardImage(data.cards[0].image, playerCardDisplayArea1, playerCardTxtArea1, 
                data.cards[0].value + ' of ' + data.cards[0].suit);
            setCardImage(data.cards[1].image, playerCardDisplayArea2, playerCardTxtArea2, data.cards[1].value + ' of ' + data.cards[1].suit);
            setCardImage(data.cards[2].image, dealerCardDisplayArea1, dealerCardTxtArea1, data.cards[2].value + ' of ' + data.cards[2].suit);
            setCardImage(data.cards[3].image, dealerCardDisplayArea2, dealerCardTxtArea2, data.cards[3].value + ' of ' + data.cards[3].suit);

            addToPlayerScore(data.cards[0].value);
            addToPlayerScore(data.cards[1].value);

            addToDealerScore(data.cards[2].value);
            addToDealerScore(data.cards[3].value);

            flow = "start";

            setOutcome();
        })
        .catch(err => console.log('Error ' + err));

}

addToPlayerScore = (cardValue) => {

    let value = 0 ;
    if (cardValue === "QUEEN")
        value = 10;
    else if (cardValue === "KING")
        value = 10;
    else if (cardValue === "JACK")
        value = 10;
    else if (cardValue === "ACE")
    {
        hasAce = true;
        if (playerScore + 11 > 21) 
            value = 1;
        else
            value = 11;
    }   
    else 
    {
        value = parseInt(cardValue);
    }

    playerScore = playerScore + value ;

    if (playerScore > 21 && hasAce === true)
    {
        playerScore = playerScore - 10; //adjust so that ace is counted as 1.
    }
    
}

//push it in single function. duplication...
addToDealerScore = (cardValue) => {

    let value = 0 ;
    if (cardValue === "QUEEN")
        value = 10;
    else if (cardValue === "KING")
        value = 10;
    else if (cardValue === "JACK")
        value = 10;
    else if (cardValue === "ACE")
    {
        hasAce = true;
        if (dealerScore + 11 > 21) 
            value = 1;
        else
            value = 11;
    }   
    else 
    {
        value = parseInt(cardValue);
    }

    dealerScore = dealerScore + value ;

    if (dealerScore > 21 && hasAce === true)
    {
        dealerScore = dealerScore - 10; //adjust so that ace is counted as 1.
    }
}


hitMe = () => {

    if (flow === "begin")
    {
        alert("First start the game by clicking on start");
    }
    else if (flow === "hit me")
    {
        alert("Already did hit me. So restart...");
    }
    else if (flow === "stay")
    {
        alert("Cannot do hit me again after stay");
    }
    else if (flow === "start")
    {

        let query = "http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2";
        fetch(query, {
                method : 'GET',
                headers : {
                    'Accept' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                data.cards.forEach(card => {
                    console.log(card);
                })            
                
    
                setCardImage(data.cards[0].image, playerCardDisplayArea3, playerCardTxtArea3, data.cards[0].value + ' of ' + data.cards[0].suit);
                setCardImage(data.cards[1].image, dealerCardDisplayArea3, dealerCardTxtArea3, data.cards[1].value + ' of ' + data.cards[1].suit);
        
                addToPlayerScore(data.cards[0].value);
    
                addToDealerScore(data.cards[1].value);
    
                flow = "hit me"
                setOutcome();
            })
            .catch(err => console.log('Error ' + err));
    
     
    }
}


//once it works, refine the logic. make it simpler..
setOutcome = () => {
    score = "Player score: " + playerScore + ", Dealer Score: " + dealerScore; 
    console.log (flow);
    outcome.innerHTML = score;
    if (flow === "begin")
    {
    }
    else if (flow === "start")
    {
    }
    else 
    {
        if (playerScore > 21)
        {
            outcome.innerHTML += ". Player Lost!";
        }
        else if (playerScore === 21)
        {
            outcome.innerHTML += ". Player Won!";
        }
        else if (playerScore > dealerScore && playerScore < 21)
        {
            outcome.innerHTML += ". Player Won!";
        }            
        else if (dealerScore === 21)
        {
            outcome.innerHTML += ". Dealer Won!";
        } 
        else if (dealerScore > playerScore && dealerScore < 21)
        {
            outcome.innerHTML += ". Dealer Won!";
        } 
        else 
        {
            outcome.innerHTML += ". Player Won!";
        }
    }
}

stay = () => {
    if (flow === "begin")
    {
        alert("First start the game by clicking on start");
    }
    else if (flow === "hit me")
    {
        alert("Already did hit me. So restart...");
    }
    else if (flow === "stay")
    {
        alert("Already did stay. So restart..");
    }
    else if (flow === "start")
    {
        let query = "http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
        fetch(query, {
                method : 'GET',
                headers : {
                    'Accept' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                data.cards.forEach(card => {
                    console.log(card);
                })            
                
    
                setCardImage(data.cards[0].image, dealerCardDisplayArea3, dealerCardTxtArea3, data.cards[0].value + ' of ' + data.cards[0].suit);
                addToDealerScore(data.cards[0].value);
                flow = "stay"
                setOutcome();
            })
            .catch(err => console.log('Error ' + err));
    
     
    }
    
}

