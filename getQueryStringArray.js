function getQueryStringArray(){
    var assoc=[];
    var items = window.location.search.substring(1).split('&');
    for(var j = 0; j < items.length; j++) {
       var a = items[j].split('='); assoc[a[0]] = a[1];
    }
    return assoc;
}
