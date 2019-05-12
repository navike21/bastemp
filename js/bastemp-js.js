/*
** restriccion_campos()
** Función que escanea el "data-restriccion" de un input para limitar los datos que se le ingresen
*/
function restriccion_campos( e ) {
  let key = e.keyCode || e.which;
  let tecla = String.fromCharCode(key).toLowerCase();
  let restriccion = this.dataset.restriccion;
  let letras = null;
  let especiales = null;
  let tecla_especial = null;

  if ( restriccion != undefined ) {
    switch ( restriccion ) {
      case "numerico":
        letras = "1234567890";
        break
      case "email":
        letras = "abcdefghijklmnopqrstuvwxyz_-@.1234567890";
        break
    }
    
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for( let i in especiales ){
      if( key == especiales[i] )
        tecla_especial = true
        break
    }
    if( letras.indexOf( tecla ) == -1 && !tecla_especial )
      e.preventDefault();
  }
}

/*
** max_min_width()
** Función que escanea el "data-maxwidth" o "data-minwidth" de un tag para poder establecer un ancho máximo o mínimo en píxeles 
*/
function max_min_width( tag ){
  let elementTag = document.getElementsByTagName( tag );
  // console.log(elementTag.length);
  let maxw = null; /*Buzón de valor del data-maxwidth*/
  let minw = null; /*Buzón de valor del data-minwidth*/

  for ( let i = 0; i < elementTag.length; i++ ) {
    /*Leemos el valor de los data-maxwidth & data-minwidth*/
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
** scanModal()
** Función que permite añadir los estilos necesarios para que pueda funcionar un modal a los ids teniendo la pseudo etiqueta data-idmodal. 
*/
function scanModal( tag ){
  if( tag != undefined ){
    let selectTag = document.getElementsByTagName( tag );

    for (let i = 0; i < selectTag.length; i++) {
      let unictag = selectTag[i];
      let idmodal = unictag.dataset.idmodal;
      if (idmodal != undefined) {
        let destinoModal = document.getElementById( idmodal );
          destinoModal.className = "modal w_100 full_min_h section_middle_center";
      }
    }
  }
}
/*
** openModal()
** Función que permite abrir una ventana flotante o popup en el sitio web. 
*/
function openModal( idtag ){
  let destinoModal = document.getElementById( idtag );
  if ( idtag != undefined ) {
    /*Creamos el Overflow*/
    let overflow = document.createElement("div");
    overflow.setAttribute("class", "overflow fadeInoverflow");
    document.body.appendChild( overflow );
    destinoModal.classList.add("fadeInmodal"); /*Añadimos la clase fadeInmodal*/  
  } 
  else {
    console.log("ERROR: Se debe de definir el parámetro idtag usando data-idmodal ")
  }
}

/*
** closeModal()
** Función que permite cerrar una ventana flotante o popup en el sitio web. 
*/
function closeModal(){
  let overflow = document.querySelector( ".overflow" );
  let modal    = document.querySelector( ".modal" );

  overflow.classList.add("fadeOutoverflow");
  modal.classList.add("fadeOutmodal");

  setTimeout(() => {
    overflow.classList.remove("fadeOutoverflow");
    overflow.classList.remove("fadeInoverflow");
    modal.classList.remove("fadeOutmodal");
    modal.classList.remove("fadeInmodal");
    overflow.parentNode.removeChild( overflow );
  }, 450);
}

/*
** validaEmail()
** Función que permite validar el email correctamente escrito de una caja de texto. 
*/
function validaEmail(contentemail) {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(contentemail);
}

/*
** validaSimilitud()
** Función que permite validar un contenido de un campo de texto que sea igual al otro campo de texto por su id, indexado por un data-similar 
*/
function validaSimilitud(id, contenidoB) {
  let cotenidoA = document.getElementById(id).value;

  if (cotenidoA == contenidoB)
    return true
  else
    return false
}

/*
** EL READY DE LAS FUNCIONES DE JAVASCRIPT
*/

/* Agrego el evento "onload" a la página para agregar los gestores de eventos cuando la página se haya generado */
window.addEventListener("load", function() {

  // console.log("GRACIAS por utilizar bastemp, para más información visite https://bastemp.com");

  /* 
  ** Función restriccion_campos()
  ** Agrego un gestor de eventos "keypress" para todos los inputs
  */
  let numericotxt = document.querySelectorAll("input");
  /*Recorreomos todos los inputs y le agregamos las características de restricción de campos*/
  for (let i = 0; i < numericotxt.length ; i++) {
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
  let tags = ["a", "article", "aside", "button", "div", "figcapion", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "img", "input", "label", "li", "legend", "nav", "ol", "p", "section", "select", "span", "strong", "textarea", "ul"];

  for (let t = 0; t < tags.length; t++) {
    max_min_width(tags[t]);
    scanModal( tags[t] );
  }

  /* 
  ** Acciones para las funciones de 
  ** openModal()
  ++ closeModal()
  */
  let modal_on = document.getElementsByClassName( 'modal_on' );
  for( let i = 0; i < modal_on.length; i++ ) {
    let anchor = modal_on[i];
    anchor.onclick = function() {
      let idmodalto = anchor.dataset.idmodal;
      openModal( idmodalto );
    }
  }

  let modal_off = document.getElementsByClassName( 'modal_off' );
  for (let c = 0; c < modal_off.length; c++) {
    let anchor_close = modal_off[c];
    anchor_close.onclick = function(){
      closeModal();
    }
      
  }
});

/*Cerrar el modal presionando ESC*/
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' || event.keyCode === 27) {
    closeModal();
  }
});