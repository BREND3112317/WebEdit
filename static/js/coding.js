api_url_encode = function (url) {
    return Base64.encode(url, true);
    // return btoa(encodeURI(url));
}

api_url_decode = function (url) {
    return Base64.decode(url);
    // return encodeURI(btoa(url));
}