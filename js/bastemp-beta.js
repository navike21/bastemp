/* Agrego el evento "onload" a la página para agregar los gestores de eventos cuando la página se haya generado */
window.addEventListener("load", function() {
    /* Agrego un gestor de eventos "keypress" para todos los campos de clase "numerico" */
    var numericotxt = document.querySelectorAll("input");
    /* No es posible usar .forEach en todos los navegadores por ser un NodeList */
    for (var i = 0; i < numericotxt.length ; i++) {
        numericotxt[i].addEventListener(
            "keypress",
            restriccion_campos,
            false
        );
    }
});

function restriccion_campos(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    restriccion = this.dataset.restriccion;
    switch (restriccion) {
        case "numerico":
            letras = "1234567890";
            break;
        case "email":
            letras = "abcdefghijklmnopqrstuvwxyz_-@.1234567890";
            break;
    
        // default:
        //     break;
    }
    
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales){
        if(key == especiales[i])
            tecla_especial = true
            break
    }
    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        e.preventDefault();
}