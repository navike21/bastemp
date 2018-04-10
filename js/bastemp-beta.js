/*
** restriccion_campos()
** Función que escanea el "data-restriccion" de un input para limitar los datos que se le ingresen
*/
function restriccion_campos(e) {
    var key = e.keyCode || e.which;
    var tecla = String.fromCharCode(key).toLowerCase();
    var restriccion = this.dataset.restriccion;
    var letras = null;

    if (restriccion != undefined) {
        switch (restriccion) {
            case "numerico":
                letras = "1234567890";
                break
            case "email":
                letras = "abcdefghijklmnopqrstuvwxyz_-@.1234567890";
                break
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
}

/*
** max_min_width()
** Función que escanea el "data-maxwidth" o "data-minwidth" de un tag para poder establecer un ancho máximo o mínimo en píxeles 
*/

function max_min_width( tag ){
    var elementTag = document.getElementsByTagName( tag );
    // console.log(elementTag.length);
    var maxw = null; /*Buzón de valor del data-maxwidth*/
    var minw = null; /*Buzón de valor del data-minwidth*/

    for (let i = 0; i < elementTag.length; i++) {
        // const element = array[i];
        maxw = elementTag[i].dataset.maxwidth;
        minw = elementTag[i].dataset.minwidth;

        if (maxw != undefined) {
            elementTag[i].style.maxWidth = maxw+"px";
        }
        if (minw != undefined) {
            elementTag[i].style.minWidth = minw+"px";
        }
    }
}

/*
** EL READY DE LAS FUNCIONES DE JAVASCRIPT
*/

/* Agrego el evento "onload" a la página para agregar los gestores de eventos cuando la página se haya generado */
window.addEventListener("load", function() {

    /* 
    ** Función restriccion_campos()
    ** Agrego un gestor de eventos "keypress" para todos los inputs
    */
    var numericotxt = document.querySelectorAll("input");
    /*Recorreomos todos los inputs y le agregamos las características de restricción de campos*/
    for (var i = 0; i < numericotxt.length ; i++) {
        numericotxt[i].addEventListener(
            "keypress",
            restriccion_campos,
            false
        );
    }

    /* 
    ** Función max_min_width()
    ** Empiezo a cotegar con los elementos tag almacenados en un array
    */
    var tags = ["a", "article", "aside", "button", "div", "figcapion", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "img", "input", "label", "li", "legend", "nav", "ol", "p", "section", "select", "span", "strong", "textarea", "ul"];

    for (let t = 0; t < tags.length; t++) {
        max_min_width(tags[t]);
    }
});