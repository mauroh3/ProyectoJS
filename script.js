$('.button').bind('click',agregarACarrito);
const tbody = document.querySelector(`.tbody`);
let carrito = [];

function agregarACarrito(e){
    let producto = {
        title: e.target.closest(`.card`).querySelector(`.card-title`).textContent,
        precio: e.target.closest(`.card`).querySelector(`.precio`).textContent,
        img: e.target.closest(`.card`).querySelector(`.card-img-top`).src,
        cantidad: 1
    }

    $(`.tab-content`).prepend(`<div class="container">
                                    <div style="display:none" class="alert container position-absolute alert-primary text-center" role="alert" id="anim">
                                        Añadido al carrito!
                                    </div>
                                </div> `
                                );
    $(`#anim`).fadeIn(100)
    .fadeOut(2000);

    let InputElemento = tbody.getElementsByClassName(`input__elemento`)
    for(let i = 0; i< carrito.length ; i++){
        if(carrito[i].title.trim() === producto.title.trim()){
            carrito[i].cantidad ++;
            let inputValue = InputElemento[i];
            inputValue.value++;
            carritoTotal();
    
            return null;
        }
    }
    carrito.push(producto);
    
    mostrarContenidoCarrito();
}

function mostrarContenidoCarrito(){
    tbody.innerHTML = `` 
    carrito.map (item =>{
        let tr = document.createElement(`tr`);
        tr.classList.add(`itemCarrito`);
        let Content = `
        <tr >
            <th scope="row">1</th>
            <td class="table__productos">
                <img src=${item.img} alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__precio"><p> ${item.precio}</p></td>
            <td class="table_cantidad">
                <input type="number" min="1" max="10" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
            </td>
        </tr>`;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".input__elemento").addEventListener(`change`, sumaCantidad);
    tr.querySelector(".delete").addEventListener(`click`, quitarItemCarrito);
    $('#comprar').bind('click',comprar);
    
    function comprar(){
        if (carrito.length>=1){
            $(`.tab-content`).prepend(`<div class="container">
            <div style="display:none" class="alert container position-absolute text-center alert-success " role="alert" id="anim">
                Gracias por tu compra!
            </div>
            </div> `
            );
            $(`#anim`).fadeIn(100)
            .fadeOut(2000);        
            }
            else null;
        let title = tr.querySelector(`.title`).textContent;
        for(let i=0; i < carrito.length ; i++){
            if(carrito[i].title.trim() === title.trim()){
                carrito.splice (i, 1);
            }
        }
        tr.remove();
        carritoTotal();
    }
    
    })
    carritoTotal();
}


function carritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector(`.itemCartTotal`);
    carrito.forEach((item)=>{
        let precio = Number(item.precio.replace("$", ``));
        Total = Total + precio * item.cantidad;
    })
    itemCartTotal.innerHTML = `Total$${Total}`;
    addLocalStorage();
}

function quitarItemCarrito(e){
    let btnBorrar = e.target;
    let tr = btnBorrar.closest(".itemCarrito");
    let title = tr.querySelector(`.title`).textContent;
    for(let i=0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice (i, 1);
        }
    }
    tr.remove();
    $(`.tab-content`).prepend(` <div class="container">
                                    <div style="display:none" class="alert container position-absolute alert-danger text-center" role="alert" id="anim">
                                        Removido del carrito
                                    </div>
                                </div>`);
    $(`#anim`).fadeIn(300)
        .fadeOut(1000);
    carritoTotal();
}

function sumaCantidad(e){
    let sumaInput = e.target;
    let tr = sumaInput.closest(".itemCarrito");
    let title = tr.querySelector(`.title`).textContent;
    carrito.forEach(item =>{
        if (item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal();
        }
    })
}

function addLocalStorage(){
    localStorage.setItem(`carrito`, JSON.stringify(carrito))
}

window.onload = function(){
    let storage = JSON.parse(localStorage.getItem(`carrito`));
    if(storage){
        carrito = storage;
        mostrarContenidoCarrito();
    }
}


