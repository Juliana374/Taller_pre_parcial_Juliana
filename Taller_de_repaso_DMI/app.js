
const catalogo = document.getElementById("catalogo");



// Carga de jason (FETCH)

function cargarProductos() {

    
    fetch("productos.json")

        
        .then(response => response.json())

        
        .then(data => {

           
            renderizarProductos(data);

        })

       
        .catch(error => {
            console.log("Error cargando JSON:", error);
        });

}


// Función madre


function renderizarProductos(productos) {

    // Recorre cada producto del JSON
    productos.forEach(producto => {

        // Crea una tarjeta para cada producto
        const card = crearCard(producto);

        // Agrega la tarjeta al contenedor principal
        catalogo.appendChild(card);

    });

}
// Creación tarjeta


function crearCard(producto) {

   
    const card = document.createElement("div");
    card.classList.add("card");
   
    const img = document.createElement("img");
    img.src = producto.imagen;

    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.textContent = "$" + producto.precio.toFixed(2);
    precio.classList.add("precio");


    // Botón de carrito

    const btnCarrito = document.createElement("button");
    btnCarrito.textContent = "Agregar al carrito";

    
    btnCarrito.addEventListener("click", function () {

        btnCarrito.textContent = "Agregado :D";

        
        btnCarrito.disabled = true;
    });


    // Botón de reseñas
    

    const btnReseñas = document.createElement("button");
    btnReseñas.textContent = "Ver reseñas";

    
    const contenedorReseñas = crearReseñas(producto.reseñas);

    
    btnReseñas.addEventListener("click", function () {

        
        if (contenedorReseñas.style.display === "none") {

          
            contenedorReseñas.style.display = "block";
            btnReseñas.textContent = "Ocultar reseñas";

        } else {

            
            contenedorReseñas.style.display = "none";
            btnReseñas.textContent = "Ver reseñas";
        }

    });

    // Organización de tarjeta
    
    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(descripcion);
    card.appendChild(precio);
    card.appendChild(btnCarrito);
    card.appendChild(btnReseñas);
    card.appendChild(contenedorReseñas);

    return card;
}


// Creación de reseñas

function crearReseñas(reseñas) {

    const contenedor = document.createElement("div");
    contenedor.classList.add("reseñas");

    contenedor.style.display = "none";

    if (reseñas.length === 0) {

        const sinReseñas = document.createElement("p");
        sinReseñas.textContent = "No hay reseñas";

        contenedor.appendChild(sinReseñas);

        return contenedor;
    }

    reseñas.forEach(r => {

        const reseña = document.createElement("p");

        reseña.textContent = r.usuario + " (" + r.fecha + "): " + r.texto;

        contenedor.appendChild(reseña);
    });

    return contenedor;
}

//Finalización
cargarProductos();