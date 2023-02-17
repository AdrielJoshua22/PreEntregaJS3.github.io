const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
let buscador = document.getElementById("buscador")
let JUEGOSDiv = document.getElementById("JUEGOS")
let coincidencia = document.getElementById("coincidencia")

let carrito = []


function mostrarCatalogo(array){
    //vaciar Div
    librosDiv.innerHTML = ""
    //tenemos nuestros libros en estanteria:
    for(let stockProductos of array){
        let nuevoJUEGOSDiv = document.createElement("div")
        //otra forma de sumarle una class a un elemento html
        //classList + add agrego clases al elemento seleccionado
        nuevoJUEGOSDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
      nuevoJUEGOSDIV.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${stockProductos.imagen}" alt="${libro.titulo} de ${libro.autor}">
                <div class="card-body">
                    <h4 class="card-title">${libro.titulo}</h4>
                    <p>Autor: ${libro.autor}</p>
                    <p class="${libro.precio <= 2000 && "ofertaLibro"}">Precio: ${stockProductos.precio}</p>
                <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>
        `
        JUEGOSDiv.appendChild(nuevoJUEGOSDiv)
        //captura agregarBtn
        let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)
        //adjunto evento
        agregarBtn.addEventListener("click", ()=>{
            
            agregarAlCarrito(stockProductos)
        })
    }
    
}












document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


    stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {
       
        agregarAlCarrito(producto.id)

        Swal.fire({
            
            icon: 'success',
            title: 'Se agrego el producto correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        
    })
})

 function buscarInfo(buscado, arr){
    let busquedaArray = arr.filter(
        (stockProductos)=>  stockProductos.nombre.toLowerCase().includes(buscado) || stockProductos.nombre.toLowerCase().includes(buscado))
        busquedaArray.length == 0 ?
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, mostrarCatalogo(busquedaArray)) 
    :
    (coincidencia.innerHTML = "", mostrarCatalogo(busquedaArray))
        
}


function agregarAlCarrito(prodId) {


    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))
       
    
       
    })
    
    contadorCarrito.innerText = carrito.length 
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    

}

buscador.addEventListener("input",()=>{
    console.log(buscador.value)
    buscarInfo(buscador.value, stockProductos)
})
