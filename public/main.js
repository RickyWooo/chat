$("#chat-room").hide();

//socket for the front-end
var socket = io();

var input = document.getElementById('name'); 
var btn = document.getElementById('sendButton');  
var username ="guest";
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        $("#welcome").fadeOut();
        $("#chat-room").fadeIn();
        username = (input.value).toString();
        socket.emit('add',input.value);
    }
});

//listen an event 
socket.on('add',(data)=>{
    $("#dialog").append(`<p style="color:blue ">${data.username}已加入聊天室</p>`);
});

$("#message").keypress(function(e){
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13){
        socket.emit('chat',{
            message: message.value,
            name:    username
        });
    $("#message:text").val("");
    $("#message-board").scrollTop(700);
    }
    
});

socket.on('chat',(data)=>{
    $("#dialog").append(`<p style="font-family:Tahoma;">${data.username} : ${data.message}</p>`);
});

socket.on('typing',(data)=>{
    $("#dialog").append(`<p>${data.username} is typing...</p>`);
})