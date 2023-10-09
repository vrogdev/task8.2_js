const form = document.getElementById("newItemForm");
let categorySelector = document.querySelector("select[name='category']");

let optionalFields = document.getElementsByClassName("optional");

categorySelector.addEventListener("change", (e) => {
    let searchOptions = e.target

    switch (searchOptions.options[searchOptions.selectedIndex].value) {
        case 'certificates':
            for (let element of optionalFields) {
                element.style.display = 'block'
            }
            break
        case 'tags': {
            for (let element of optionalFields) {
                element.style.display = 'none'
            }
            break
        }
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let formData = event.target;

    let category = formData.elements.namedItem("category");

    let strategy = new PublishStrategy();
    strategy.setStrategy(category.value)
    strategy.publish(formData).then(response => {
            if (response.ok)
                window.location.href = 'main.html'
            else
                console.log('Error')
        }
    )

})

function days_between(dateValue) {
    let dateNow = Date.now();
    let dateValidTo = new Date(dateValue);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(dateValidTo - Date.now());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
}


var PublishStrategy = function () {
    this.strategy = "";
};

PublishStrategy.prototype = {
    setStrategy: function (strategy) {

        switch (strategy) {
            case 'tags':
                this.strategy = new Tags()
                break;
            case 'certificates':
                this.strategy = new Certificates();
                break;
        }
    },

    publish: function (formData) {
        return this.strategy.publish(formData);
    }
};

let Tags = function () {
    this.publish = function (formData) {
        let nameValue = formData.elements.namedItem("itemName").value;

        let tag = {};
        tag.name = nameValue;

        return sendData("http://localhost:8080/api/tags",tag);
    }
};

let Certificates = function () {
    this.publish = function (formData) {
        let nameValue = formData.elements.namedItem("itemName").value;
        let descriptionValue = formData.elements.namedItem("description").value;
        let validToDate = formData.elements.namedItem("validTo").value;
        let priceValue = formData.elements.namedItem("price").value;

        let certificate = {};
        certificate.name = nameValue;
        certificate.description = descriptionValue
        certificate.duration = days_between(validToDate)
        certificate.price = priceValue;

        return sendData("http://localhost:8080/api/certificates",certificate);
    }
};

function sendData(url, item) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}
