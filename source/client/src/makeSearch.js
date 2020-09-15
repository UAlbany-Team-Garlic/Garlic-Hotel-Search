

//This function is called when the search data is returned from the API
//The data will be in the form of a Listing object array found in /source/server/API.js
function searchCallback(data){
    console.log(data);
}

//This function is called when the "Search" button is pressed
export function runSearch(){
    let searchText = document.getElementById("searchInput").value;
    console.log("Sent Search Request for \"" + searchText + "\"");
    let encodedSearchText = encodeURIComponent(searchText); //Since we're using it in a url query param with fetch, we need to encode it
    fetch("/GarlicSearchEndpoint?search=" + encodedSearchText)
    .then(response => response.json())  //convert return data to json
    .then(data => searchCallback(data)); //do something with our API return data
}