const socket = io('http://localhost:8000');

// Get DOM elements in a respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

// Audio that will play on receiving messages
var audio = new Audio('sound.mp3');


// Function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})