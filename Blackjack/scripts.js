const playerCardDisplayArea1 = document.querySelector('#playerCard1');
const playerCardDisplayArea2 = document.querySelector('#playerCard2');
const playerCardDisplayArea3 = document.querySelector('#playerCard3');

const dealerCardDisplayArea1 = document.querySelector('#dealerCard1');
const dealerCardDisplayArea2 = document.querySelector('#dealerCard2');
const dealerCardDisplayArea3 = document.querySelector('#dealerCard3');

setCardImage = (img, imgElement) => {
    let cardImage = document.createElement('img');
    cardImage.setAttribute("src", img);
    cardImage.setAttribute("class", "img-fluid");
    imgElement.appendChild(cardImage);
}

resetAll = () => {
    playerCardDisplayArea1.innerHTML ="";
    playerCardDisplayArea2.innerHTML ="";
    playerCardDisplayArea3.innerHTML ="";

    dealerCardDisplayArea1.innerHTML ="";
    dealerCardDisplayArea2.innerHTML ="";
    dealerCardDisplayArea3.innerHTML ="";
   
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
            let s = "";
            //if (data.result.length === 0)
                //s =
            data.cards.forEach(card => {
                console.log(card);
            })

            setCardImage(data.cards[0].image, playerCardDisplayArea1);
            setCardImage(data.cards[1].image, playerCardDisplayArea2);
            setCardImage(data.cards[2].image, dealerCardDisplayArea1);
            setCardImage(data.cards[3].image, dealerCardDisplayArea2);

/*            let cardImage1 = document.createElement('img');
            cardImage1.setAttribute("src", data.cards[0].image);


            let cardImage2 = document.createElement('img');
            cardImage2.setAttribute("src", data.cards[1].image);

            let cardImage3 = document.createElement('img');
            cardImage3.setAttribute("src", data.cards[2].image);

            let cardImage4 = document.createElement('img');
            cardImage4.setAttribute("src", data.cards[3].image);

            playerCardDisplayArea1.appendChild(cardImage1);
            playerCardDisplayArea2.appendChild(cardImage2);

            dealerCardDisplayArea1.appendChild(cardImage3);
            dealerCardDisplayArea2.appendChild(cardImage4);
*/
        })
        .catch(err => console.log('Error ' + err));

}


