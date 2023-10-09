var contentContainer = document.querySelector('#content-container');
var categoryContainer = document.querySelector('#categoryBox');

var page = 0;
var totalPages = 1
var loadMore

function infiniteCertificatesRoll() {
        getCertificates(page++).then(certificates => {
            if (page === 1 && certificates.hasOwnProperty('page')) {
                totalPages = certificates.page.totalPages
            }

            for (const certificate of certificates) {
                let divElement = createElementMain(certificate);
                contentContainer.appendChild(divElement);
            }
        })
}

function infiniteTagsRoll() {
    getTags(page++).then(tags => {
        for (const tag of tags) {
            let divElement = createElementTag(tag);
            contentContainer.appendChild(divElement);
        }
    })
}

categoryContainer.addEventListener('click', (e) => {
    function resetContainer() {
        page = 0
        totalPages = 1
        contentContainer.innerText = ''
    }


    if (e.target.id === 'certCat' || e.target.parentNode.id === 'certCat') {
        resetContainer();
        loadMore = debounce(infiniteCertificatesRoll, 500)
        infiniteCertificatesRoll()
    } else if (e.target.id === 'tagsCat' || e.target.parentNode.id === 'tagsCat') {
        resetContainer();
        loadMore = debounce(infiniteTagsRoll, 500)
        infiniteTagsRoll()
    } else {
        e.preventDefault()
    }
})

const debounce = (fn, delay) => {
    let timer;
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}


loadMore = debounce(infiniteCertificatesRoll, 500)

//initial load
infiniteCertificatesRoll()


// Detect when scrolled to bottom.
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        loadMore();
    }
});
