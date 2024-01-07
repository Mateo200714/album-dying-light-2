var idFotoActual = 0
var paginaActual = 0
var paginasTotales = 0
var fotosTotales = 17

globalThis.addEventListener('load', () => {
    generarFotos()
})
globalThis.addEventListener('resize', () => {
    generarFotos()
})
function obtenerCantidadFotos() {
    const widthPagina = globalThis.innerWidth
    const heightPagina = globalThis.innerHeight
    let cantidadFotos = 0
    if (widthPagina >= 730) {
        cantidadFotos = Math.floor(widthPagina / 550) * Math.floor(heightPagina / 325)
    }
    else if ((widthPagina < 730) && (widthPagina >= 400)) {
        cantidadFotos = Math.floor(widthPagina / 400) * Math.floor(heightPagina / 250)
    }
    return cantidadFotos
}
function generarFotos() {
    const cantidadFotos = obtenerCantidadFotos()
    paginasTotales = Math.ceil(fotosTotales / cantidadFotos)
    if (paginaActual > 0) {
        document.querySelector('#main').innerHTML = `<section id='album'></section><div id="pagina-actual"><span><span id="paginaActual-text" contenteditable>${paginaActual}</span>/${paginasTotales}</span></div><section id="imagen-ampliada"></section>`
        if (paginaActual < fotosTotales) {
            document.querySelector('#main').innerHTML += `<div id="flecha-siguiente"><img src="/flecha.png" alt="pagina siguiente"></div>`
        }
        if (paginaActual > 0) {
            document.querySelector('#main').innerHTML += `<div id="flecha-anterior"><img src="/flecha.png" alt="pagina siguiente"></div>`
        }
        idFotoActual = (paginaActual - 1) * cantidadFotos
        const cantidadFotosMostrar = (idFotoActual + cantidadFotos) > fotosTotales ? (fotosTotales - idFotoActual) : cantidadFotos
        for (let i = 0; i < cantidadFotosMostrar; i++) {
            idFotoActual++
            document.querySelector('#album').innerHTML += `<img class="imagen-album"src="/img/${idFotoActual}.webp" alt="">`
        }
        document.querySelector('#flecha-anterior').addEventListener('click', () => {
            if (paginaActual > 0) {
                idFotoActual -= cantidadFotos + 1
                paginaActual--
                generarFotos()
            }
        })
        document.querySelector('#flecha-siguiente').addEventListener('click', () => {
            if (paginaActual < paginasTotales) {
                paginaActual++
                generarFotos()
            }
        })
        document.querySelectorAll('.imagen-album').forEach((item) => {
            item.addEventListener('click', () => {
                let girada = false
                document.querySelector('#imagen-ampliada').innerHTML = `<img id="img-ampliada" src="${item.src}"><img id="cerrar-imagen-ampliada" style="position:absolute;top:2px;left:5px;width:20px;height:20px;cursor:pointer" src="eliminar.png"><img id="girar-imagen-ampliada" style="position:absolute;top:2px;left:40px;width:20px;height:20px;cursor:pointer" src="girar.png">`
                document.querySelector('#imagen-ampliada').style.display = "block"
                document.querySelector('#cerrar-imagen-ampliada').addEventListener('click', () => {
                    document.querySelector('#imagen-ampliada').style.display = "none"
                })
                document.querySelector('#girar-imagen-ampliada').addEventListener('click', () => {
                    const widthPagina = globalThis.innerWidth
                    const heightPagina = globalThis.innerHeight
                    if (!girada) {
                        document.querySelector('#img-ampliada').style.transform = "rotate(90deg)"
                        document.querySelector('#img-ampliada').style.width = (heightPagina - 50) + 'px'
                        document.querySelector('#img-ampliada').style.height = (widthPagina - 50) + 'px'
                    }
                    else {
                        document.querySelector('#img-ampliada').style.transform = "rotate(0deg)"
                        document.querySelector('#img-ampliada').style.width = (widthPagina - 50) + 'px'
                        document.querySelector('#img-ampliada').style.height = (heightPagina - 50) + 'px'
                    }
                    girada = !girada
                })
            })
        })
        document.querySelector('#paginaActual-text').addEventListener('input', () => {
            paginaActual = Number(document.querySelector('#paginaActual-text').innerHTML) >= 0 ? Number(document.querySelector('#paginaActual-text').innerHTML) : 0
            if (paginaActual > paginasTotales) { paginaActual = paginasTotales }
            generarFotos()
        })
    }
    else {
        document.querySelector('#main').innerHTML = `<div style="display: flex;justify-content: center;
        height: 155px;padding-top: 30px;filter:drop-shadow(1px 1px 3px #888)">
            <img src="/titulo_album.svg" alt="">
        </div>
        <div
            style="display: flex;justify-content: center;padding-top: 5px;font-family: 'Bebas Neue', sans-serif; color: #fff;font-size: 4rem;letter-spacing: 0.25px;user-select: none;filter:drop-shadow(1px 1px 3px #888)">
            <span>ALBUM</span>
        </div>
        <div style="display:flex;    justify-content: center;">

        </div>
        <div id="flecha-siguiente">
            <img src="/flecha.png" alt="pagina siguiente">
        </div>
        <div style="display: flex;align-items: center;flex-direction: column;height:575px">
            <img style="width:500px;height:550px ;position:absolute;top:0;bottom:0;z-index:-1" src="/principal.png">
            <div class="fotos-totales"><h3>${fotosTotales} fotos</h3></div>
        </div>
        <div id="pagina-actual">
            <span><span id="paginaActual-text" contenteditable>${paginaActual}</span>/${paginasTotales}</span>
        </div>
        `
        document.querySelector('#flecha-siguiente').addEventListener('click', () => {
            if (paginaActual < paginasTotales) {
                idFotoActual = 0
                paginaActual++
                generarFotos()
            }
        })
        document.querySelector('#paginaActual-text').addEventListener('input', () => {
            paginaActual = Number(document.querySelector('#paginaActual-text').innerHTML) >= 0 ? Number(document.querySelector('#paginaActual-text').innerHTML) : 0
            if (paginaActual > paginasTotales) { paginaActual = paginasTotales }
            generarFotos()
        })
    }
}


