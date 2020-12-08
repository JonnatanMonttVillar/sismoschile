
if(navigator.serviceWorker){
    if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
        navigator.serviceWorker.register("/sw.js");
    } else { 
        navigator.serviceWorker.register("/sismoschile/sw.js");
    }
}


window.mostrarSismo = function(){
    //Tomar todos los datos de sismos y renderizarlos dentro del molde
    let molde = document.querySelector('.molde-sismo-alert').cloneNode(true);
    let sismo = this.sismo;
    molde.querySelector('.titulo-sismo').innerText = sismo.RefGeografica;
    molde.querySelector('.latitud').innerText = sismo.Latitud;
    molde.querySelector('.longitud').innerText = sismo.Longitud;

    molde.querySelector('.fecha-update').innerText = sismo.FechaUpdate;
    molde.querySelector('.agencia').innerText = sismo.Agencia;

    Swal.fire({
        title: sismo.RefGeografica,
        html: molde.innerHTML
    });
};

window.mostrar = (sismos)=>{
    const molde = document.querySelector(".molde-sismo");
    const contenedor = document.querySelector(".contenedor");

    for(let i=0; i < sismos.length; ++i){
        let p = sismos[i];
        let copia = molde.cloneNode(true);
        copia.querySelector('.ref-geografica').innerText = p.RefGeografica;
        copia.querySelector('.fecha').innerText = p.Fecha;
        copia.querySelector('.magnitud').innerText = p.Magnitud;
        copia.querySelector('.btn-sismo').sismo = p;
        copia.querySelector('.btn-sismo').addEventListener('click', window.mostrarSismo);
        contenedor.appendChild(copia);
    }
};
//Listener que esta escuchando cuando la pagina se carga
window.addEventListener('DOMContentLoaded', async () => {
    let respuesta = await axios.get("https://api.gael.cl/general/public/sismos");
    //Obtener los datos por consola, primero la peticion, 
    //luego los datos y luego el resultado de los datos
    let sismos = respuesta.data;
    window.mostrar(sismos);
});
