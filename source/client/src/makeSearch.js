

//This function is called when the search data is sucessfull returned from the API
//The data will be in the form of a Listing object array found in /source/server/API.js
function searchSuccessCallback(data){
    try{
        let resBox = document.getElementById("meme");
        resBox.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            resBox.innerHTML += '<div className="twelve col left"><div className="text-container"><h1 className="subheader">' + data[i].name + '</h1><p className="paragraph-md">' + JSON.stringify(data[i]) + '</p></div></div>'
            //resBox.innerHTML += "<div><p>" +  + "</p></div>";
        }
    }catch(e){
        console.error(e);
    }
}

//This function is called when the search fails for any reason
function searchFailureCallback(reason){
    console.error("Search Failure:" + reason);
}

//This function is called when the "Search" button is pressed
export function runSearch(){
    //Get Values from the frontend
    let encodedSearchText = encodeURIComponent(document.getElementById("searchInput").value);
    let encodedDates = encodeURIComponent("null"); //TODO: pass required date range
    let encodedBeds = encodeURIComponent("null"); //TODO: pass required beds

    //Pass Values to the backend's search endpoint
    fetch("/GarlicSearchEndpoint?search=" + encodedSearchText + "&dates=" + encodedDates + "&beds=" + encodedBeds)
    .then(response => response.json())               //convert return data to json
    .then(data => searchSuccessCallback(data))       //do something with our API return data
    .catch(reason => searchFailureCallback(reason)); //handle errors
}