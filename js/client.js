const socket = io('http://localhost:8000');
const form = document.getElementById('text-container');
const messageInput = document.getElementById('msginp')
const messageContainer = document.querySelector(".container")

Window.onload = append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);    
}

form.addEventListener('click',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput = '';
})

const name = prompt("Enter your name");
socket.emit("new-user-joined", name);

socket.on("user-joined", name =>{
    append(`${name} joined the chat`, 'right');
})

socket.on("receive", data =>{
    append(`${data.name} : ${data.message}`, 'left');
    })
