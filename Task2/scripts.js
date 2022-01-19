const apiBtn = document.querySelector('#btn');
const cardDisplayArea = document.querySelector('#cardArea');

const getAPI = () => {

    cardDisplayArea.innerHTML ="";

    let query = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";

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
            data.cards.forEach(property => {
                console.log(property);
                let cardImage = document.createElement('img');
                cardImage.src = property.image;
                cardDisplayArea.appendChild(cardImage);
/*
{
    "code": "2D",
    "image": "https://deckofcardsapi.com/static/img/2D.png",
    "images": {
        "svg": "https://deckofcardsapi.com/static/img/2D.svg",
        "png": "https://deckofcardsapi.com/static/img/2D.png"
    },
    "value": "2",
    "suit": "DIAMONDS"
}
                gitOutput.innerHTML += 
                    `
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">${repo.name}</h5>
              <p class="card-text">This repository have been forked ${repo.forks_count} times</p>
              <a href="${repo.html_url}" class="card-link">${repo.name}</a>
              <a href="${repo.owner.html_url}" class="card-link">Organisation</a>
            </div>
            </div>

            `

                let button = document.createElement('button');
                button.classList.add('btn', 'btn-danger');
                button.innerText = 'X';
                button.addEventListener('click', remove);
        
                li.appendChild(button);
  */
            })

        })
        .catch(err => console.log('Error ' + err));
}

apiBtn.addEventListener('click', getAPI);