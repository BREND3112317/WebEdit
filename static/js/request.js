export const ajax_GET = function (url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState != 4) return;

        // if(typeof(callback.complete))

        var data;
        data.status = xmlhttp.status;
        data.statusText = xmlhttp.statusText;
        data.data = xmlhttp.responseType;
        data.dataType = xmlhttp.responseType;
        console.log(data);
    }
}