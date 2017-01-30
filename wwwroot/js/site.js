// Write your Javascript code.
var socket;
var uri = "ws://" + window.location.host + "/ws";
var output;
var text = "test echo";

function write(s) {
    var p = document.createElement("p");
    p.innerHTML = s;
    output.appendChild(p);
}

function doConnect() {
    socket = new WebSocket(uri);
    
    socket.onopen = function (e) { 
        write("opened " + uri); 
        doSend(); 
    };

    socket.onclose = function (e) { 
        write("closed"); 
    };
    socket.onmessage = function (e) { 
        write("Received: " + e.data); 
        $('#chat').val(''); 
    };

    socket.onerror = function (e) { 
        write("Error: " + e.data); 
    };
    
    socket.channel = 1;

    $('#chat').keypress(function(event) {
        var chat = $(this);

        if (event.keyCode == '13') {
   		    text = chat.val();
            
            doSend();
        }
    });
}

function doSend() {
    write("Sending: " + text);
    socket.send(text);
}

function onInit() {
    output = document.getElementById("output");
    doConnect();
}

window.onload = onInit;