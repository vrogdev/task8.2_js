async function getCertificates(page = 0, size = 10) {
    let certificatesUrl = `http://localhost:8080/api/certificates?page=${page}&size=${size}&sort=createDate,asc`
    let data = await fetchData(certificatesUrl)


    if (data.hasOwnProperty('errorCode'))
        return [];

    return data._embedded.giftCertificateDtoList;
}


async function getCertificate(id) {
    if (id === null) {
        return null;
    }

    let certificateUrl = `http://localhost:8080/api/certificates/${id}`
    let certificate = await fetchData(certificateUrl);

    for (const key in certificate) {
        if (key === 'errorCode')
            return null
    }

    return await certificate
}


async function getTags(page = 0, size = 10) {
    let tagsUrl = `http://localhost:8080/api/tags?page=${page}&size=${size}`
    let data = await fetchData(tagsUrl)

    if (data.hasOwnProperty('errorCode'))
        return [];

    return data._embedded.tagDtoList
}

async function SearchByAll(searchName, page = 0, size = 10) {

    let certificatesUrl = `http://localhost:8080/api/certificates/search/${searchName}?page=${page}&size=${size}&sort=createDate,asc`
    let data = await fetchData(certificatesUrl)

    for (const key in data) {
        if (key === 'errorCode')
            return await []
    }

    return data._embedded.giftCertificateDtoList;
}

async function SearchByCertificates(searchName, page = 0, size = 10) {
    let certificatesUrl = `http://localhost:8080/api/certificates/search/${searchName}?page=${page}&size=${size}&sort=createDate,asc`
    let data = await fetchData(certificatesUrl)

    if (data.hasOwnProperty('errorCode'))
        return [];

    return data._embedded.giftCertificateDtoList;
}

async function SearchByTags(searchName, page = 0, size = 10) {
    let certificatesUrl = `http://localhost:8080/api/certificates/tagname/${searchName}?page=${page}&size=${size}&sort=createDate,asc`
    let data = await fetchData(certificatesUrl)

    if (data.hasOwnProperty('errorCode'))
        return [];

    return data._embedded.giftCertificateDtoList;
}

async function fetchData(url) {
    let response = await fetch(url);
    return await response.json()
}
