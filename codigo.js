window.addEventListener("load",inicio);

function inicio(){
    precarga();
    // funciones que al click muestran y ocultan 
    document.querySelector("#btnRegisterLogin").addEventListener("click",funcionMostrarRegistro)
    document.querySelector("#btnLoginRegister").addEventListener("click",funcionMostrarLogin)
    document.querySelector("#btnNavBarLogin").addEventListener("click",funcionMostrarLogin)
    document.querySelector("#btnNavBarRegister").addEventListener("click",funcionMostrarRegistro)
    //funcion que verifica el usuario logueado y muestra o oculta opciones
    verificarUsuarioLogueado();
    
    //funcionnes
    document.querySelector("#btnLogin").addEventListener("click",funcionLogin)
    document.querySelector("#btnRegister").addEventListener("click",funcionRegistro)
    document.querySelector("#btnContactar").addEventListener("click",funcionContactar)
    document.querySelector("#logout").addEventListener("click",funcionLogout)
    document.querySelector("#botonCarrito").addEventListener("click",funcionMostrarMiCarrito)
    document.querySelector("#btnVolverMenu").addEventListener("click",funcionVolverAtrasDesdeMisCompras)
    document.querySelector("#btnCargarSaldo").addEventListener("click",funcionCargarSaldo)
    
    document.querySelector("#btnNavBarHome").addEventListener("click",verificarUsuarioLogueado)
    document.querySelector("#btnNavBarProducts").addEventListener("click",verificarUsuarioLogueado)
    document.querySelector("#btnNavBarContact").addEventListener("click",verificarUsuarioLogueado)
    document.querySelector("#btnNavBarNosotros").addEventListener("click",verificarUsuarioLogueado)
    document.querySelector("#btnNavBarRedes").addEventListener("click",verificarUsuarioLogueado)
    document.querySelector("#btnNavBarNoticias").addEventListener("click",verificarUsuarioLogueado)
    document.querySelector("#btnNavBarCargarSaldo").addEventListener("click",verificarUsuarioLogueado)

}
//variables y listas  globales
let usuario = null;
let usuarioGlobal = null;
const listaProductosCombos=[];
const listaProductosComponentes=[];
const listaUsuarios = [];

//funcion que verifica el usuario logueado y muestra o oculta opciones
function verificarUsuarioLogueado(){
    if(localStorage.getItem('nombreUsuario')!=null){
        //cargo las opciones del navbar para un usuario logueado
        opcionesNavBarLogueado();
        //obtengo el usauario que se logueo y con esta funcion lo busco por su nombre y asigno el objeto usuario a la variabel usuarioGlobal
        buscarUsuarioPorNombre(localStorage.getItem('nombreUsuario'))
        //muestro la lista de productos de combos
        mostrarProductosCombos();
        //muestro la lista de productos de componentes
        mostrarProductosComponentes();
    }else{
        //si no hay usuairo logueado muestro las opciones de menu para un usuario invitadi
       opcionesNavBarNOLogueado();
    }
}//opciones que tendra el usuario si esta logueado y si no lo esta
function opcionesNavBarLogueado(){
    //opciones del navbar
    document.getElementById('btnNavBarCargarSaldo').style.display="block";
    document.getElementById('btnNavBarRegister').style.display="none";
    document.getElementById('btnNavBarLogin').style.display="none";
    document.getElementById('btnNavBarLogOut').style.display="block";
    document.getElementById('btnNavBarProducts').style.display="block";
    document.getElementById('btnNavBarContact').style.display="block";
    document.getElementById('btnNavBarRedes').style.display="block";
    document.getElementById('btnNavBarNosotros').style.display="block";
    document.getElementById('btnNavBarNoticias').style.display="block";
    //contenido de las secciones 
    document.getElementById('register').style.display="none";
    document.getElementById('login').style.display="none";
    document.getElementById('about').style.display="block";
    document.getElementById('blogs').style.display="block";
    document.getElementById('menu').style.display="block";
    document.getElementById('products').style.display="block";
    document.getElementById('btnProductosFoter').style.display="block";
    document.getElementById('logout').style.display="block";
    document.querySelector("#cargarSaldo").style.display="block";
    document.getElementById('navbar').style.display="flex";
    

}
function opcionesNavBarNOLogueado(){
       //opciones del navbar
    document.getElementById('btnNavBarCargarSaldo').style.display="none";
    document.getElementById('btnNavBarRegister').style.display="block";
    document.getElementById('btnNavBarLogin').style.display="block";
    document.getElementById('btnNavBarProducts').style.display="none";
    document.getElementById('btnNavBarContact').style.display="none";
    document.getElementById('btnNavBarRedes').style.display="none";
    document.getElementById('btnNavBarLogOut').style.display="none";
      //contenido de las secciones 
    document.getElementById('logout').style.display="none";
    document.getElementById('about').style.display="none";
    document.getElementById('menu').style.display="none";
    document.getElementById('products').style.display="none";
    document.getElementById('register').style.display="block";
    document.getElementById('btnProductosFoter').style.display="none";
    document.querySelector("#cargarSaldo").style.display="none";
    document.getElementById('navbar').style.display="flex";
}

//funciones que muestar y  ocultan los botnes de login o cerrar sesion
function funcionMostrarRegistro(){
    document.getElementById('register').style.display="block";
    document.getElementById('login').style.display="none";
}
function funcionMostrarLogin(){
    document.getElementById('register').style.display="none";
    document.getElementById('login').style.display="block";
}

//funcion de login
function funcionLogin(){
let nombre = document.querySelector("#inputNombreLogin").value;
let password = document.querySelector("#inputPasswordLogin").value;
let mensaje = document.querySelector("#mensajeLogin");
try {
    if (!nombre) {
        throw "Ingrese un usuario para iniciar sesion"
    }
    if (!password) {
        throw "Ingrese una password para iniciar sesion"
    }
    if(!buscarUsuarioPorNombre(nombre)){
        throw "No existe un usuario con ese nombre"
    }
    // usuario
    localStorage.setItem("nombreUsuario",nombre)
    localStorage.setItem("passwordUsuario",password)
    usuario = localStorage.getItem("nombreUsuario");
    alert("inicio sesion")
    opcionesNavBarLogueado();
    console.log(usuarioGlobal)

} catch(error) {
    mensaje.innerHTML=error;
}
}

function funcionRegistro(){
    let nombre = document.querySelector("#inputNombreRegister").value;
    let email = document.querySelector("#inputEmailRegister").value;
    let password = document.querySelector("#inputPasswordLogin").value;
    let mensaje = document.querySelector("#mensajeRegistro");
    let saldo = 0;
    try {
        if (!nombre) {
            throw "Ingrese un usuario para registrarse"
        }
        if (!email) {
            throw "Ingrese un email para registrarse"
        }
        if (!password) {
            throw "Ingrese una password para registrarse"
        }
        if(buscarUsuarioPorNombre(nombre)){
            throw "Ya existe un usuario con ese nombre"
        }
        localStorage.setItem("nombreUsuario",nombre)
        localStorage.setItem("passwordUsuario",password)
        usuario = localStorage.getItem("nombreUsuario");
        let usuarioNuevo = new Usuario(nombre,email,password,saldo)
        listaUsuarios.push(usuarioNuevo)
        alert("se registro")
    
    } catch(error) {
        mensaje.innerHTML=error;
    }
    }

function funcionLogout(){
localStorage.removeItem("nombreUsuario")
localStorage.removeItem("passwordUsuario")
opcionesNavBarNOLogueado();
}

    function funcionContactar(){
        let nombre = document.querySelector("#nombreContactar").value;
        let email = document.querySelector("#emailContactar").value;
        let tel = Number (document.querySelector("#telefonoContactar").value);
        let mensaje = document.querySelector("#mensajeContactar");
        try {
            if (!nombre) {
                throw "Ingrese un usuario para continuar"
            }
            if (!email) {
                throw "Ingrese un email para continuar"
            }
            if (!tel) {
                throw "Ingrese un numero para continuar"
            }
            alert("Datos enviados con exito")
        
        } catch(error) {
            mensaje.innerHTML=error;
        }
        }


//funcion que recibe un nombre de usuario y asigna a la variable gloabal usuario el usuario encontrado
    function buscarUsuarioPorNombre(pNombre){
        let unUsuario = null;
        let encontrado = false;
        for(let pos=0;pos<listaUsuarios.length &&!encontrado;pos++){
            if(listaUsuarios[pos].nombre==pNombre){
                unUsuario = listaUsuarios[pos];
                usuarioGlobal = listaUsuarios[pos];
                encontrado=true;
            }
        }
        return encontrado;
    }

    //funcion que muestra el carrito de compras del usuario
    function funcionMostrarMiCarrito(){
        let elementoHTML = document.getElementById("boxContainerMisCompras");
        let parrafo = document.getElementById("h1Carrito");
        let boxContainer = document.querySelector("#boxContainerMisCompras");
        let botonComprar = document.getElementById("divBotonComprarCarrito");
        elementoHTML.innerHTML="";
        boxContainer.innerHTML="";
        botonComprar.innerHTML="";
         parrafo.innerHTML = `<h1 class="heading">Productos agregados a su Carrito.</h1>`
        for(productoP of usuarioGlobal.listaCarritoUsuario){
            itemProducto = `
            <div class="box">
            <h3>Nombre: ${productoP.nombre}.</h3>
            <img src="${productoP.imagen}" alt="procesador ryzen 5">
            <div class="price">Precio: ${productoP.precio} <span>antes:${productoP.precioViejo}</span></div>
            <a  class="btn" onclick="eliminarProductoCarrito(${productoP.id})">Eliminar del carrito</a>
            </div>
            `
            elementoHTML.innerHTML += itemProducto
        }
        if(usuarioGlobal.listaCarritoUsuario.length>0){
            botonComprar.innerHTML+=`<input type="button" class="btn" value="Comprar todos" onclick="comprarProductosCarrito()">`;
        }else if(usuarioGlobal.listaCarritoUsuario.length<=0){
            parrafo.innerHTML = `<h1 class="heading">No tiene productos agregados a su carrito.</h1>`
        }
    }

    //funcion la cual se ejecuta cuando el usuario da click en "comprar todos" en su lista de carrito
    function comprarProductosCarrito(){
        //oculto todos los contenidos para solo mostrar la pagina donde se realiza el pago
        document.getElementById('about').style.display="none";
        document.getElementById('home').style.display="none";
        document.getElementById('menu').style.display="none";
        document.getElementById('blogs').style.display="none";
        document.getElementById('contact').style.display="none";
        document.getElementById('products').style.display="none";
        
        //agrego en el html el boton de finalizar compra el cual ejecuta la funcion que acredita el pago y ademas agrego un boton para volver al menu principal
        let botonComprar = document.getElementById("divBotonComprarCarrito");
        botonComprar.innerHTML=`<input type="button" class="btn" value="Finalizar Compra" onclick="finalizarCompra(usuarioGlobal.listaCarritoUsuario)">`;
        botonComprar.innerHTML+=`<input type="button" class="btn" value="Volver al menu" onclick="funcionVolverAtrasDesdeMisCompras()">`;
    }
    //la funcion recibe una lista, calcula el precio total a pagar por TODOS los productos y si el usuario tiene saldo suficiente se realiza la compra, se asigna las compras a la lista de compras, se resta saldo al uusario y se muestra en el html la lista de compras que hizo el usuario
    function finalizarCompra(listaAComprar){
        debugger;
        let precioTotal = 0;
        elementoHTML="";
        for(producto of listaAComprar){
            // console.log(producto.precio)
            precioTotal+=producto.precio
        }
        if(usuarioGlobal.saldo>=precioTotal){
            let listaCarrito = usuarioGlobal.listaCarritoUsuario;
            //asigno la lista de compras
            usuarioGlobal.listaComprasRealizadasUsuario=listaCarrito;
            //descuento saldo y aviso
            usuarioGlobal.saldo = usuarioGlobal.saldo-precioTotal;
            alert("Se le han descontado " + precioTotal + " pesos de su saldo.")
            //muestro la seccion mi perfil
            document.querySelector("#miPerfil").style.display="block";
            //muestro mis compras ya realizadas y pagadas
            functionMostrarMisComprasRealizadas();
        }else{
            alert("saldo insuficiente")
        }
    }
    //esta funcion muestra la lista de productos por los cuales el usuario Ya realizo la compra y pago, esta funcion muestra en pantalla y ademas deja vacia la lista de CARRITO
function functionMostrarMisComprasRealizadas(){
    let elementoHTML = document.getElementById("boxContainerMisComprasMiPerfil");
    let parrafo = document.getElementById("h2ProductosCompraFinalizada");
    let costoTotal =0;
    for(productoP of usuarioGlobal.listaComprasRealizadasUsuario){
        itemProducto = `
        <div class="box">
        <h3>Nombre: ${productoP.nombre}.</h3>
        <img src="${productoP.imagen}" alt="procesador ryzen 5">
        <div class="price">Precio: ${productoP.precio}</div>
        </div>
        `
        costoTotal+=productoP.precio;
        elementoHTML.innerHTML += itemProducto;
    }
    parrafo.innerHTML="El costo total por la compra de estos productos fue de " + costoTotal + " pesos."
     usuarioGlobal.listaCarritoUsuario.splice(0,usuarioGlobal.listaCarritoUsuario.length);
    funcionMostrarMiCarrito();
    document.querySelector("#btnVolverMenu").style.display="block";
}

function funcionVolverAtrasDesdeMisCompras(){
     document.getElementById('about').style.display="block";
        document.getElementById('home').style.display="block";
        document.getElementById('menu').style.display="block";
        document.getElementById('blogs').style.display="block";
        document.getElementById('contact').style.display="block";
        document.getElementById('products').style.display="block";
        document.querySelector("#miPerfil").style.display="none";
}


//funcion la cual recibe un id de producto, recorre la lista del carrito del usuario y al encontrar un producto con ese id lo elimina de dicha lista y luego vuelve a mostrar la lista actualizada de carrito
 function eliminarProductoCarrito(idProducto){
     let encontrado = false;
     let buscado = null;
     for(let pos=0;pos<usuarioGlobal.listaCarritoUsuario.length&&!encontrado;pos++){
         if(usuarioGlobal.listaCarritoUsuario[pos].id==idProducto){
             encontrado = true;
             buscado = usuarioGlobal.listaCarritoUsuario[pos];
             usuarioGlobal.listaCarritoUsuario.splice(pos,1)
         }
     }
     funcionMostrarMiCarrito();
 }


//funcion agregar producto Combo a la lista global de productos
function agregarProductoCombo(nombreProducto,precioProducto,precioViejoProducto,imagenProducto){
    if(nombreProducto!=""&&precioProducto>0&&precioViejoProducto>0&&imagenProducto!=null){
        let productoNuevo = new Producto(nombreProducto,precioProducto,precioViejoProducto,imagenProducto)
        listaProductosCombos.push(productoNuevo);
        return productoNuevo;
    }
}

//funcion que agregar un componente a la lista global de productos
function agregarProductoComponentes(nombreProducto,precioProducto,precioViejoProducto,imagenProducto){
    if(nombreProducto!=""&&precioProducto>0&&precioViejoProducto>0&&imagenProducto!=null){
        let productoNuevo = new Producto(nombreProducto,precioProducto,precioViejoProducto,imagenProducto)
        listaProductosComponentes.push(productoNuevo);
        return productoNuevo;
    }
}

//funcion que reccore la lista global de productos combos y la muestra en el html
function mostrarProductosCombos(){
    let elementoHTML = document.getElementById("boxContainerProductosCombos");
    let parrafo = document.getElementById("h1ProductosCombos");
    elementoHTML.innerHTML="";
    parrafo.innerHTML = `<h1 class="heading">Combos Gamer a la venta</h1>`
    for(productoP of listaProductosCombos){
        itemProducto = `
        <div class="box">
        <h3>Nombre: ${productoP.nombre}.</h3>
        <img src="${productoP.imagen}" alt="procesador ryzen 5">
        <div class="price">Precio: ${productoP.precio} <span>antes:${productoP.precioViejo}</span></div>
        <a  class="btn" onclick="agregarProductosCarritocombo(${productoP.id})" >Añadir al carrito</a>
        </div>
        `
        elementoHTML.innerHTML += itemProducto
    }
}

//funcion que reccore la lista global de productos componentes  y la muestra en el html
function mostrarProductosComponentes(){
    let elementoHTML = document.getElementById("boxContainerProductosComponentes");
    let parrafo = document.getElementById("h1ProductosComponentes");
    elementoHTML.innerHTML="";
    parrafo.innerHTML = `<h1 class="heading">Componentes para PC a la venta</h1>`
    for(productoP of listaProductosComponentes){
        itemProducto = `
        <div class="box">
        <div class = "image">
          <img src = "${productoP.imagen}" alt="imagen producto">
        </div>
        <div class="content">
        <h3>Nombre: ${productoP.nombre}.</h3>
        <div class="price">Precio: ${productoP.precio} <span>antes:  ${productoP.precioViejo}</span></div>
        </div>
        <button class="btn" onclick="agregarProductosCarrito(${productoP.id})" >Añadir al carrito</button>
        </div>
        `
        elementoHTML.innerHTML += itemProducto
        // console.log(itemProducto)
    }
}
//funcion que recibe un id de producto, busca en la lista de productos y al encontrar agregar el producto a la lista de carrito del usuario logueado
function agregarProductosCarrito(idProducto){
    alert("Agregado con exito")
    let encontrado = false;
    let productoBuscado = null;
    for(let pos=0;pos<listaProductosComponentes.length&&!encontrado;pos++){
        if(listaProductosComponentes[pos].id==idProducto){
            productoBuscado = listaProductosComponentes[pos];
            usuarioGlobal.listaCarritoUsuario.push(productoBuscado);
            encontrado=true;
        }
    }
console.log(usuarioGlobal.listaCarritoUsuario)
}
//funcion que recibe un id de producto, busca en la lista de productos y al encontrar agregar el producto a la lista de carrito del usuario logueado
function agregarProductosCarritocombo(idProducto)
{
    alert("Agregado con exito")
    let encontrado = false;
    let productoBuscado = null;
    for(let pos=0;pos<listaProductosCombos.length&&!encontrado;pos++){
        if(listaProductosCombos[pos].id==idProducto){
            productoBuscado = listaProductosCombos[pos];
            usuarioGlobal.listaCarritoUsuario.push(productoBuscado);
            encontrado=true;
        }
    }
console.log(usuarioGlobal.listaCarritoUsuario)
}
//funcion que recibe un saldo numerico y lo suma al saldo del usuario logueado
function funcionCargarSaldo(){
    let saldo = Number(document.querySelector("#cantidadSaldoFormulario").value)
    let mensaje = document.querySelector("#mensajeCargarSaldo")
    let saldoViejo = usuarioGlobal.saldo;
    let saldoNuevo = usuarioGlobal.saldo;
    if(saldo>0){
        saldoNuevo+=saldo;
        usuarioGlobal.saldo = saldoNuevo
        mensaje.className="mensajeExito"
        mensaje.innerHTML= "Carga realizada con exito, su saldo anterior era de " + saldoViejo + " pesos, ahora acaba de realiar una carga de " + saldo + " pesos, por lo tanto su nuevo saldo es de " + saldoNuevo + " pesos."
        document.getElementById("cantidadSaldoFormulario").value = "";
    }else{
        mensaje.innerHTML="Asegurese de ingresar un saldo numerico mayor que 0"
        
    }
}



//precarga de datos
    function precarga(){
        console.log(listaProductosCombos)
        console.log(listaProductosComponentes)
        alert("Para iniciar sesion usar Usuario= german Contraseña= 123")
        document.querySelector("#miPerfil").style.display="none";
        document.querySelector("#btnVolverMenu").style.display="none";
        let usuario1 = new Usuario("german","german@gmail","123",500);
        listaUsuarios.push(usuario1);
        let usuario2 = new Usuario("b","a@gmail","2",500);
        listaUsuarios.push(usuario2);

        let imagenProducto1 = "https://soymotor.com/sites/default/files/imagenes/noticia/nissan-navara-2021-facelift-soymotor_0.jpg"
        let product1 = new Producto("procesador","100","150",imagenProducto1)

        

        let imagenComboSuperPremium = "/imgs/producto-comboPC1.webp"
        let productoCombo1 = agregarProductoCombo("Combo super premium",550,660,"/imgs/producto-comboPC1.webp")
        let imagenComboPremium = "/imgs/producto-comboPC2.jpg" 
        let productoCombo2 = agregarProductoCombo("Combo premium",450,550,imagenComboPremium)
        let productoCombo3 = agregarProductoCombo("Combo estandar",350,450,imagenComboSuperPremium)
        let productocombo4 = agregarProductoCombo("Combo basico",300,350,imagenComboPremium)
        let productocombo5 = agregarProductoCombo("Combo super basico",200,250,imagenComboSuperPremium)
        let productocombo6 = agregarProductoCombo("Combo ofimatica",100,170,imagenComboPremium)
       

        //--------productos componentes
        let productoComponente1 = agregarProductoComponentes("Procesador ryzen 3",150,200,"/imgs/ryzen55.webp")
        let productoComponente2 = agregarProductoComponentes("Procesador intel",150,250,"/imgs/procesador-Intel-menu.jpg")
        let productoComponente3 = agregarProductoComponentes("Grafica RTX 3060",250,300,"/imgs/rtx3060.png")
    
        console.log(listaProductosCombos)
        console.log(listaProductosComponentes)
        // usuario1.listaCarritoUsuario.push(productoCombo1)
        // usuario1.listaCarritoUsuario.push(productoComponente1)
        // usuario1.listaCarritoUsuario.push(productocombo5)
        // usuario1.listaCarritoUsuario.push(productocombo4)
        // usuario1.listaCarritoUsuario.push(productocombo6)

        // usuario2.listaCarritoUsuario.push(productoCombo1)
    }

