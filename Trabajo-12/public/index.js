const socket = io();

const enviarMensaje = ()=>{
    const inputs = document.getElementsByClassName("form-control");
    const payload = [
        document.getElementsByClassName("entrada").length,      // ID
        inputs[0].value,                                        // Title
        inputs[1].value,                                        // Price
        inputs[2].value                                         // Thumbail
    ];
    socket.emit("cliente",payload);
}; 

socket.on("broadcast",(data)=>{
    let tbody = document.getElementsByTagName("tbody")[0];
    let tr = document.createElement("tr");
    
    for(let item of data){
        const td = document.createElement("td");
        td.innerHTML = item;
        tr.appendChild(td);
    }
    tr.className = "entrada";
    tbody.appendChild(tr);
});