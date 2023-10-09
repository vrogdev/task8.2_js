contentContainer = document.querySelector('#content-container');
let searchBox = document.querySelector("#search-box");
let searchOptions = document.querySelector(".select-search-box");
let clearBtn = document.querySelector("#clear-btn");


clearBtn.addEventListener('click', () => {
    searchBox.value = ''
    clearBtn.style.visibility = 'hidden'

    page = 0;
    contentContainer.innerText = ''
    loadMore = debounce(infiniteCertificatesRoll, 500)
    loadMore();
})

searchOptions.addEventListener("change", (e) => {
    if (searchBox.value !== '') {
        doSearch()
    }
})

function doSearch() {
    if (searchBox.value === '') {
        clearBtn.style.visibility = 'hidden'
    } else {
        clearBtn.style.visibility = 'visible'
    }

    let getSearchResult = getSearchFunction()

    contentContainer.innerText = ''

    //reseting initial page pointers
    page = 0
    totalPages = 1

    loadMore = debounce(() => {
            getSearchResult(searchBox.value, page++).then(certificates => {

                if (certificates.hasOwnProperty('page') && page === 1) {
                    totalPages = certificates.page.totalPages

                }

                if (page > totalPages || certificates.hasOwnProperty('errorCode'))
                    return;

                for (const certificate of certificates) {
                    // let divElement = createElement(certificate);
                    let divElement = createElementMain(certificate);
                    contentContainer.appendChild(divElement);
                }
            })
    }, 1000)

    loadMore()
}

searchBox.addEventListener('keyup', () => {
    doSearch();
})


function getSearchFunction() {
    let getSearchResult;
    switch (searchOptions.options[searchOptions.selectedIndex].value) {
        case 'tags':
            getSearchResult = SearchByTags;
            break
        case 'certificates':
            getSearchResult = SearchByCertificates;
            break
        default:
            getSearchResult = SearchByAll;
            break
    }

    return getSearchResult
}
