// BOTONES!
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")


let carrito = []




//FUNCIONES , BUSCAR EN CARRITO, BORRAR CARRITO , AGREGAR CARRITO , MOSTRAR CATALOGO  ACTUALIZAR CARRITO 


function mostrarCatalogo(array){

    for(let producto of array){
        
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
        
    }
    
}



function buscarJuego(buscado, arr) {
    let busquedaArray = arr.filter(
        (stockProductos)=> stockProductos.nombre.toLowerCase().includes(buscado) || stockProductos.tipo.toLowerCase().includes(buscado))

        if (busquedaArray.length == 0 ){
            coincidencia.innerHTML = `<h3>Por el momento no esta disponible en la plataforma</h3>` 
            mostrarCatalogo(busquedaArray)
        }else{
            coincidencia.innerHTML = ""
            mostrarCatalogo(busquedaArray)
            
        }
        
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




function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text:  `Su compra fue procesada con exito,en los proximos minutos recibira un corre con su id, de compra y codigo de seguimiento`
                })
                //resetear carrito
                productosEnCarrito = []
                //removemos storage
                localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text:  `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    }

    )
}

//EVENTOS 

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

buscador.addEventListener("input", ()=>{
    console.log(buscador.value)
    buscarJuego(buscador.value, stockProductos)
})


// EN PROCESO. GENERAR CODIGO DE ID ALEATORIO PARA SIMULAR COMPRA.

 botonFinalizarCompra.addEventListener("click", ()=>{
    finalizarCompra(generateRandom)})

function generateRandom(min, max) {
        min  = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (1 + max - min) + min);
    }
    console.log (generateRandom(4, 7)); 