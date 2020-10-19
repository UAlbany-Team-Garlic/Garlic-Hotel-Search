function displayData(data){
    let leftBox = document.getElementById("leftSearchResult");
    let midBox = document.getElementById("midSearchResult");
    let rightBox = document.getElementById("rightSearchResult");

    leftBox.innerHTML = "";
    midBox.innerHTML = "";
    rightBox.innerHTML = "";

    try {
        for (let i = 0; i < data.length; i++) {
        if (i < data.length / 3) {
            leftBox.innerHTML += `<div className="text-container">
            <h1 className="subheader">${data[i].name}</h1>
            <img className "hotelImage">${data[i].images}</img>
            <p className="paragraph-md">${data[i].address}
                <br>${data[i].contactNum}
                <br>${data[i].rating}
                <br>${data[i].features}</p>`;
        } else if (i >= data.length / 3 && i < 2 * (data.length / 3)) {
            midBox.innerHTML += `<div className="text-container">
            <h1 className="subheader">${data[i].name}</h1>
            <img className "hotelImage">${data[i].images}</img>
            <p className="paragraph-md">${data[i].address}
                <br>${data[i].contactNum}
                <br>${data[i].rating}
                <br>${data[i].features}</p>`;
        } else {
            rightBox.innerHTML += `<div className="text-container">
            <h1 className="subheader">${data[i].name}</h1>
            <img className "hotelImage">${data[i].images}</img>
            <p className="paragraph-md">${data[i].address}
                <br>${data[i].contactNum}
                <br>${data[i].rating}
                <br>${data[i].features}</p>`;
        }
    }
    }catch (e) {
        console.error(e);
    }
}