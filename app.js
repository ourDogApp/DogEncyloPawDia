// MVP
// Make API call to get list of dog breeds (from The Dog API)
// Display all dog breeds in a dropdown menu
// Add event listener for user to select a dog breed
// Dynamically add breed info & image to the page of the breed the user selected

// Stretch goal #1
// Add event listener for which temperament checkboxes user selects
// Display dog breeds that match selected temperaments in dropdown menu
// Add event listener for user to select a dog breed
// Dynamically add breed info & image to the page of the breed the user selected

// Stretch goal #2
// Add a button onto the page with a click event listener
// When clicked, dynamically display a random selection of dog breed info & image to the page

const dogApp = {};

dogApp.apiUrl = "https://api.thedogapi.com/v1/breeds";
dogApp.apiKey = "02a97c50-0a41-42dd-8e00-3f527db558a7";

// putting all dynamic elements as global variables, so we can use them in both the dropdown selection and random button event listeners
const dogImageParent = document.querySelector("div.dogImg");
const dogImage = document.createElement("img");

const dogInfoParent = document.querySelector("div.dogInfo");
const dogName = document.createElement("p");

const dogBreedGroup = document.createElement("p");

const dogLifespan = document.createElement("p");

const dogTemperament = document.createElement("p");

// creating a variable to prevent the same random dog from appearing twice in a row
let lastOption;

// first API call to get all breed names in the dropdown menu
dogApp.dogData = () => {
    const url = new URL(dogApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: dogApp.apiKey
    })

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dogApp.dogDropDown(data);
            dogApp.randomDog(data);
            // event listener for button click
            dogApp.button.addEventListener("click", () => {
                let randomDogSelection = dogApp.randomDog(data);
                
                // displaying randomDogSelection image
                dogImageParent.innerHTML = "";
                dogImage.src = randomDogSelection.image.url;
                dogImage.alt = `A picture of ${randomDogSelection.name}`
                dogImageParent.appendChild(dogImage);

                // displaying randomDogSelection name
                dogInfoParent.innerHTML = "";
                dogName.textContent = `${randomDogSelection.name}`;
                dogInfoParent.appendChild(dogName);

                // displaying randomDogSelection breed group
                if (randomDogSelection.breed_group) {
                    dogBreedGroup.textContent = `Breed group: ${randomDogSelection.breed_group}`;
                    dogInfoParent.appendChild(dogBreedGroup)
                }

                // displaying randomDogSelection lifespan
                dogLifespan.textContent = `Lifespan: ${randomDogSelection.life_span}`;
                dogInfoParent.appendChild(dogLifespan);

                // displaying randomDogSelection temperament
                if (randomDogSelection.temperament) {
                    dogTemperament.textContent = `Temperament: ${randomDogSelection.temperament}`;
                    dogInfoParent.appendChild(dogTemperament);
                }

                // prevent same random dog from appearing twice in a row
                while(lastOption == randomDogSelection) {
                    randomDogSelection = dogApp.randomDog(data);
                }

            });
        });
}

// this method is created to populate the dropdown with the dog breed names (it is called in the dogApp.dogData method)
dogApp.dogDropDown = (dataFromApi) => {
    dataFromApi.forEach((breedName) => {
        const dropDown = document.getElementById('breed')

        const option = document.createElement('option')
        option.value = dataFromApi.indexOf(breedName);
        option.label = breedName.name
        dropDown.appendChild(option)
    })
}

// method to get random dog from API array (called in the dogApp.dogData method)
dogApp.randomDog = (dataFromApi) => {
    const index = Math.floor(Math.random() * dataFromApi.length);
    return dataFromApi[index];
}

// method to change dynamic content based on user selection
dogApp.displayInfo = () => {
    // event listener for dropdown selection
    dogApp.form.addEventListener("change", (e) => {
        e.preventDefault();
        // second API call 
        dogApp.individualDog = () => {
            const url = new URL(dogApp.apiUrl);
            url.search = new URLSearchParams({
                api_key: dogApp.apiKey
            })
        
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    let selection = document.querySelector('select').value;
                    
                    for (let i = 0; i < data.length; i++) {
                        if(i == selection) {
                            // displaying selected dog image
                            dogImageParent.innerHTML = "";
                            dogImage.src = data[i].image.url;
                            dogImage.alt = `A picture of ${data[i].name}`
                            dogImageParent.appendChild(dogImage);

                            // displaying selected dog name
                            dogInfoParent.innerHTML = "";
                            dogName.textContent = `${data[i].name}`;
                            dogInfoParent.appendChild(dogName);

                            // displaying selected dog breed group
                            // added if statement for dogs that did not have breed group data - it will not appear on the screen
                            // E.g. Appenzeller Sennenhund -> American Bully
                            if(data[i].breed_group) {
                                dogBreedGroup.textContent = `Breed group: ${data[i].breed_group}`;
                                dogInfoParent.appendChild(dogBreedGroup)
                            }

                            // displaying selected dog lifespan
                            dogLifespan.textContent = `Lifespan: ${data[i].life_span}`;
                            dogInfoParent.appendChild(dogLifespan);

                            // displaying selected dog temperament
                            // noticed poodle dog breeds were missing temperament property - added if statement logic
                            if(data[i].temperament) {
                                dogTemperament.textContent = `Temperament: ${data[i].temperament}`;
                                dogInfoParent.appendChild(dogTemperament);
                            }
                        }
                    }
                });
        }

        dogApp.individualDog();

    })
}

dogApp.init = () => {
    dogApp.form = document.querySelector("form");
    dogApp.button = document.querySelector("button");
    dogApp.dogData();
    dogApp.displayInfo();
}

dogApp.init();