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
    const info = new Date();
    const time_info = `[${info.getDay()}/${info.getMonth()}/${info.getFullYear()} ${info.getHours()}:${info.getMinutes()}:${info.getSeconds()}]: `;
    const id = document.getElementsByName("id")[0].value;
    const nombre = document.getElementsByName("nombre")[0].value;
    const apellido = document.getElementsByName("apellido")[0].value;
    const alias = document.getElementsByName("alias")[0].value;
    const edad = document.getElementsByName("edad")[0].value;
    const avatar = document.getElementsByName("avatar")[0].value;
    const text = document.getElementsByName("text")[0].value;   
    SOCKET.emit("mensaje",{author:{id,nombre,apellido,alias,edad,avatar,date:time_info},text});
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
    const cont_mensaje = document.createElement("div");
    const cont_avatar = document.createElement("img");
    cont_mensaje.className = "row";
    cont_mensaje.innerHTML = `<p><strong>${data.author.id}</strong> <i style="color:brown">${data.author.date}</i><span style="color:green">${data.text}</span></p>`;
    cont_avatar.src = data.author.avatar;
    cont_avatar.width = 30;
    cont_avatar.className = "rounded";

    const lista_mensajes = document.getElementById("mensajes");
    lista_mensajes.appendChild(cont_mensaje);
    lista_mensajes.appendChild(cont_avatar);
});




