// firstly, we create a function to populate the cards. To create it a card, we need the inputs of its title, image, description, price and category so these will be the arguments.
// In this function, we store different variables which are created because this is how we access the html elements.

createCard = (title, image, description, price, category) => { /*we need to clone the content to create a new instance of the template*/
    const template = document.getElementById('card-template').content.cloneNode(true);
    // we assign the card icon and title elements to a variable we can manipulate
    const cardCategoryIcon = template.querySelector('.card-category-icon');
    const cardTitle = template.querySelector('.card-title');
    // in the line below, we simply define that the text inside of this element is the title.
    cardTitle.innerText = title;
    template.querySelector('.card-img-top').src = image; // we use the template variable to define each element within it and store it in a new variable
    template.querySelector('.card-description').innerText = description;
    template.querySelector('.card-price').innerText = "$" + price;
    document.querySelector('#card-list').appendChild(template);
    // finally, we create the card by appending the template as a child of the '#card-list' element in the document.

    // and the following section is used to add the icons from "font-awesome". To use those, we need to add the CDN link of the library to the head of the document
    // to do so, we go through each category, using the switch statement
    switch (category) {
        case 'electronics': cardCategoryIcon.innerHTML = '<i class="fas fa-laptop"></i>';
            break;
        case 'jewelery': cardCategoryIcon.innerHTML = '<i class="fas fa-gem"></i>';
            break;
        case "men's clothing": cardCategoryIcon.innerHTML = '<i class="fa-solid fa-person"></i>';
            break;
        case "women's clothing": cardCategoryIcon.innerHTML = '<i class="fa-solid fa-person-dress"></i>';
            break;
        default: cardCategoryIcon.innerHTML = '<i class="fas fa-box"></i>'; // in case there is an issue with the icons above, this icon will display by default
    }
};

// { 'category 1': [ {}, {} ], 'category 2': ... }
let categories = {};

fetch('https://fakestoreapi.com/products').then((response) => response.json()).then((json) => {
    json.forEach((item) => { // we iterate over each item in the JSON response
        if (! categories[item.category]) { // if there is no property in 'categories' for the category key of the current item
            categories[item.category] = []; // we create an empty array as a value for that category (or count = 0)
        }categories[item.category].push(item); // otherwise, we push the item with the value of "category" into the new object
    });

    // creating the drop-down menu and its options
    const categoryDropdown = document.getElementById('category-dropdown');

    // now, we need to create an option for each category in our dropdown menu ('category-dropdown' select element) created in the html

    for (let category of Object.keys(categories)) { // we iterate through the categories (keys)
        const option = document.createElement('option'); // we create a new element called 'option' stored as a variable
        option.value = category; // we define the value and textContent of the dropdown option and set them both to 'category'
        option.textContent = category;
        categoryDropdown.appendChild(option); // finally, we create the option by appending it as a child on categoryDropdown
    }categoryDropdown.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        displayCards(selectedCategory);
    });
    // this event listener on the dropdown activates the displayCards() function which creates the cards based on the value of the options

    // the below function displays the cards by category
    function displayCards(category) {
        document.querySelector('#card-list').innerHTML = ''; // this line ensures that the card list is empty at first

        if (! category || category === 'All') {
            // if no category is selected or if the category is not specified (default behavior)
            // iterate through all items of all categories and create cards. 'All' represents all of the cards and will be reused later on.
            for (let items of Object.values(categories)) {
                for (let item of items) { // we iterate through all of the items of all categories and create cards
                    createCard(item.title, item.image, item.description, item.price, item.category);
                }
            }
        } else {
            for (let item of categories[category]) { // otherwise we create a card for each item of the category
                createCard(item.title, item.image, item.description, item.price, item.category);
            }
        }
    }

    // below we made the search option for which we already have an html element functional

    // firstly,we create the variables to be able to manipulate the search form and search input in JS
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // this event listener uses the function 'searchcards()' when someone submits the form. it defines the searchTerm variable as the input of the user
    // converted to lowerCase and without spaces
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();
        searchCards(searchTerm);
    });

    displayCards('All');
});

function searchCards(searchTerm) { // this is the function we use to search the page it is used above and triggered when someone submits an input
    document.querySelector('#card-list').innerHTML = ''; // again, by default the card list is empty

    for (let items of Object.values(categories)) { // we iterate over the values of the "categories" object, which are arrays of items within each category
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm));
        // we use the filter method to extract all of the items of the array whiches title or description contain the searchTerm
        for (let item of filteredItems) { // for each of those items filtered on, we create a new card
            createCard(item.title, item.image, item.description, item.price, item.category);
        }
    }
}

/* Alternative
    for (let items of Object.values(categories)) { // we iterate over the values of the "categories" object, which are arrays of items within each category
        for (let item of items) {
             // for each product of the categories, we create cards if the item title or description contain the search input.
             // Because we transform everything to lowercase as well here, the input won't be case sensitive
              if (item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)) {
                createCard(item.title, item.image, item.description, item.price, item.category);
                        }
                    }
                }
            }
            */
