const SOCKET = io();

// Lista de productos
const enviarProductos = (e) =>{
    e.preventDefault();
    const payload = {
        title : e.target[0].value,
        price : e.target[1].value,
        thumbail : e.target[2].value
    };
    SOCKET.emit("productos-payload",payload);
}; 

SOCKET.on("productos-listado",(data)=>{
    let tabla_productos_body = document.getElementsByTagName("tbody")[0];
    data.forEach(entrada => {
        const {p_id,title,price,thumbail} = entrada;
        let tabla_productos_entry = document.createElement("tr");
        tabla_productos_entry.innerHTML = `
            <th scope "row">${p_id}</th><td>${title}</td><td>${price}</td><td><img src=${thumbail} width="30" class="rounded"></td>`;
        tabla_productos_body.appendChild(tabla_productos_entry);
    });
});


// Mensajes
const handleSubmit = (e) =>{
    e.preventDefault();
    const mail = document.getElementsByName("mail")[0].value;
    const mensaje = document.getElementsByName("mensaje")[0].value;
    const info = new Date();

    if( mail.match(/.(@)./g) && mensaje.match(/^\S|^\w/g)){
        SOCKET.emit("mensaje",{
            time_info:`[${info.getDay()}/${info.getMonth()}/${info.getFullYear()} ${info.getHours()}:${info.getMinutes()}:${info.getSeconds()}]: `,
            mail,
            mensaje
        });
    }
};

SOCKET.on("historial",(data)=>{
    const historial = document.getElementById("mensajes");
    for(let items of data){
        const {mail,time_info,mensaje} = items;
        const historial_mensaje = document.createElement("p");
        historial_mensaje.innerHTML = `<p><strong>${mail}</strong> <i style="color:brown">${time_info}</i><span style="color:green">${mensaje}</span></p>`;
        historial.appendChild(historial_mensaje);
    }
});

SOCKET.on("publicar_mensaje",(data)=>{
    const {time_info,mail,mensaje} = data;
    
    const cont_mensaje = document.createElement("div");
    cont_mensaje.className = "row";
    cont_mensaje.innerHTML = `<p><strong>${mail}</strong> <i style="color:brown">${time_info}</i><span style="color:green">${mensaje}</span></p>`;

    const lista_mensajes = document.getElementById("mensajes");
    lista_mensajes.appendChild(cont_mensaje);
});




