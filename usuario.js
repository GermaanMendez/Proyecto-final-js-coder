class Usuario {
    constructor(pNomUsuario, pMail,pPassword,pSaldo) {
        this.nombre = pNomUsuario;
        this.email = pMail;
        this.clave = pPassword;
        this.saldo = pSaldo;
        this.listaCarritoUsuario = [];
        this.listaComprasRealizadasUsuario = [];
        
    }
}

let ultimoIdProducto = 1;
class Producto {
    constructor(pNomProducto,pPrecioProducto,pPrecioViejoProducto,pImagenProducto) {
        this.nombre = pNomProducto;
        this.precio = pPrecioProducto;
        this.precioViejo = pPrecioViejoProducto;
        this.imagen = pImagenProducto;
        this.id=ultimoIdProducto;
        ultimoIdProducto++;
    }
}
