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

const url = new URL("https://api.thedogapi.com/v1/breeds");

fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));