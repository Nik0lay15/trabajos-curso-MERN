const socket = io();

const enviarMensaje = ()=>{
    const inputs = document.getElementsByClassName("form-control");
    const payload = {    
        values : [
            document.getElementsByClassName("entrada").length,      // ID
            inputs[0].value,                                        // Title
            inputs[1].value                                         // Price
        ],
        img : inputs[2].value
    };

    socket.emit("cliente",payload);
}; 

socket.on("broadcast",(data)=>{
    let tbody = document.getElementsByTagName("tbody")[0];
    let tr = document.createElement("tr");
    let td_img = document.createElement("td");
    let img = document.createElement("img");
    img.src = data.img;
    img.width = 30;
    img.class = "rounded";
    td_img.appendChild(img);
    tr.className = "entrada";

    for(let item of data.values){
        const td = document.createElement("td");
        td.innerHTML = item;
        tr.appendChild(td);
    }
    tr.appendChild(td_img);
    tbody.appendChild(tr);
});