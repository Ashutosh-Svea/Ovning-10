const apiBtn = document.querySelector('#btn');
const nameValue = document.querySelector('#nameTxtId');
const biometricOutput = document.querySelector('#biometricId');

const getAPI = () => {

    console.log(nameValue.value);


    let query = "https://www.swapi.tech/api/people/?name=" + nameValue.value;

    fetch(query, {
            method : 'GET',
            headers : {
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.result.length);
            let s = "";
            //if (data.result.length === 0)
                //s =
            data.result.forEach(property => {
                console.log(property.properties);
                s += `Name: ${property.properties.name}, Height: ${property.properties.height}, Mass: ${property.properties.mass}, Gender: ${property.properties.gender}, Hair Color: ${property.properties.hair_color} \n`;

            })
            biometricOutput.innerHTML = s;

        })
        .catch(err => console.log('Error ' + err));
}

apiBtn.addEventListener('click', getAPI);