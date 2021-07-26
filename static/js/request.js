cSystemCall = {
    notify: function (content, title) {
        console.log("[cSystemCall - notify]", title + ": ", content);
    }
}

AJAX = {
    get: function (url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url);
        xmlhttp.onreadystatechange = function () {
            if(xmlhttp.readyState != 4) return;
    
            // if(typeof(callback.complete))
            
            var data = {};
            // data.status = xmlhttp.status;
            // data.statusText = xmlhttp.statusText;
            try {
                data = JSON.parse(xmlhttp.responseText);
                if(xmlhttp.status >= 200 && xmlhttp.status < 300) {
                    if(typeof callback.success !== 'undefined') {
                        callback.success(data);
                    }else {
                        if(typeof callback.failed !== 'undefined') {
                            callback.failed(data);
                        } else {
                            cSystemCall.notify(data, "callback.failed is undefined");
                        }
                    }
                }else{
                    cSystemCall.notify(data, `ajax get error status: ${xmlhttp.status}`);
                    // cSystemCall.notify(data, `status is outside: ${xmlhttp.status}`);
                }
            } catch (e) {
                console.log(e);
            }
        }
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send();
        return xmlhttp;
    }
}