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

dogApp.apiUrl = "https://api.thedogapi.com/v1/breeds"
dogApp.apiKey = "02a97c50-0a41-42dd-8e00-3f527db558a7"

dogApp.dogData = () => {
    const url = new URL(dogApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: dogApp.apiKey
    })

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dogApp.dogDropDown(data)
        });
}

// this method is created to populate the dropdown with the dog breed names (it is called iin the dogApp.dogData function)
dogApp.dogDropDown = (dataFromApi) => {
    console.log(dataFromApi);
    dataFromApi.forEach((breedName) => {
        const dropDown = document.getElementById('breed')

        const option = document.createElement('option')
        option.value = dataFromApi.indexOf(breedName);
        option.label = breedName.name
        dropDown.appendChild(option)
    })
}


// method to change dynamic content based on user selection
dogApp.displayInfo = () => {
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
                            console.log(data[i]);
                            console.log(data[i].name);
                            console.log(data[i].breed_group);
                            const dogImageParent = document.querySelector("div.dogImg");
                            dogImageParent.innerHTML = "";
                            const dogImage = document.createElement("img");
                            dogImage.src = data[i].image.url;
                            dogImageParent.appendChild(dogImage);
                        }
                    }
                });
        }

        dogApp.individualDog();

    })
}

dogApp.init = () => {
    dogApp.form = document.querySelector("form");
    dogApp.dogData();
    dogApp.displayInfo();
}

dogApp.init();