const socket = io();

// Lista de productos
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
    socket.emit("productos-payload",payload);
}; 

socket.on("productos",(data)=>{
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

// Mensajes
const handleSubmit = (e) =>{
    e.preventDefault();
    const mail = document.getElementsByName("mail")[0].value;
    const mensaje = document.getElementsByName("mensaje")[0].value;
    const info = new Date();

    if( mail.match(/.(@)./g) && mensaje.match(/^\S|^\w/g)){
        socket.emit("mensaje",{
            time_info:`[${info.getDay()}/${info.getMonth()}/${info.getFullYear()} ${info.getHours()}:${info.getMinutes()}:${info.getSeconds()}]: `,
            mail,
            mensaje
        });
    }
};

socket.on("historial",(data)=>{
    const historial = document.getElementById("mensajes");

    for(let item of data){
        const {mail,time_info,mensaje} = item;
        const historial_mensaje = document.createElement("p");
        historial_mensaje.innerHTML = `<p><strong>${mail}</strong> <i style="color:brown">${time_info}</i><span style="color:green">${mensaje}</span></p>`;
        historial.appendChild(historial_mensaje);
    }
});

socket.on("publicar_mensaje",(data)=>{
    const {time_info,mail,mensaje} = data;
    
    const cont_mensaje = document.createElement("div");
    cont_mensaje.className = "row";
    cont_mensaje.innerHTML = `<p><strong>${mail}</strong> <i style="color:brown">${time_info}</i><span style="color:green">${mensaje}</span></p>`;

    const lista_mensajes = document.getElementById("mensajes");
    lista_mensajes.appendChild(cont_mensaje);
});




