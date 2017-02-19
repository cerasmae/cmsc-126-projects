var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };

    // add your code here

    //scheme
    uriParts.scheme = uri.substring(0, uri.indexOf(":")  );
    uri = uri.substring(uri.indexOf(":")+1, uri.length);
    var i = 0, terminator;

    //authority and path
    if( uri.includes("/") ){
        if( uri.startsWith("///") ){
            uriParts.path = uri.substring( 2, uri.length );
            i = uri.length;
        } else if( uri.startsWith("//") ){
            uri = uri.substring(2, uri.length);

            for( ; i < uri.length; i++ ){
                if( uri.charAt(i) === "/" || uri.charAt(i) === "?" || uri.charAt(i) === "#" ){
                    break;
                }
            }

            uriParts.authority = uri.substring(0, i);
        }
    } else{
        uriParts.path = uri;
    }

    if( i < uri.length-1 ){
        uri = uri.substring(i, uri.length);

        if( uri.startsWith("/") ){

            if( uri.indexOf("?") > 0 ){
                uriParts.path = uri.substring(0, uri.indexOf("?"));
                uri = uri.substring(uri.indexOf("?"), uri.length);
            } else if( uri.indexOf("#") > 0 ){
                uriParts.path = uri.substring(0, uri.indexOf("#"));
                uri = uri.substring( uri.indexOf("#"), uri.length );
            } else{
                uriParts.path = uri;
            }

        }

        if( uri.startsWith("?") ){
            if( uri.indexOf("#") > 0 ){
                uriParts.query = uri.substring(1, uri.indexOf("#"));
                uri = uri.substring(uri.indexOf("#"), uri.length);
            } else{
                uriParts.query = uri.substring(1, uri.length);
            }
        }

        if( uri.startsWith("#") ){
            uriParts.fragment = uri.substring(1, uri.length);
        }


    }


    


    return uriParts;
}