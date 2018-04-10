/*================================================================================
* max_min_width() Funcion que determina el ancho máximo y mínimo de una etiqueta*
==================================================================================*/
var max_min_width = function( tag ){
    $(tag).each(function(index, el) {
        var maxwidth = $(this).data('maxwidth');
        var minwidth = $(this).data('minwidth');

        if (maxwidth != undefined) {
            $(this).css('max-width', maxwidth);
        }
        if (minwidth != undefined) {
            $(this).css('min-width', minwidth);
        }
    });
};

/*================================================================================
* LimpiarForm() Funcion que limpia los campos de un formulario*
==================================================================================*/
var LimpiarForm = function( miForm ){
    $(':input', miForm).each(function() {
        var type = this.type;
        var tag = this.tagName.toLowerCase();
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = "";
        else if ( type === 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/*================================================================================
* casiano() Funciòn que establece los limites alphanumèricos o numericos en un
  campo del formulario sin importar cuales desee solo aceptarà los caracteres que
  se mencionen*
==================================================================================*/
(function(a) {
    a.fn.casiano = function(b) {
        a(this).on({
            keypress: function(a) {
                var c = a.which;
                var d = a.keyCode;
                var e = String.fromCharCode(c).toLowerCase();
                var f = b;
                (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault();
            }
        });
    };
})(jQuery);

/*================================================================================
* formulario_envio() Funcion que hace el envío de información de un formulario
  mediante ajax*
==================================================================================*/
var formulario_envio = function( destino, datafrm ){
    $.ajax({
        url: destino,
        type: "POST",
        dataType: "HTML",
        data: datafrm,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {

        },
        success: function(data) {
            console.log(data);
			$("#success_frm").val(data);
			open_modal( "mensaje_frm", "" );
            // var jsondata = JSON.parse(data);
        },
        error: function() {

        },
        complete: function() {

        }
    });
};

/*================================================================================
* valida_email() Funcion que permite validar el emailing de un campo
  mediante ajax*
==================================================================================*/
var valida_email = function( valor_email ){
    var validarMail = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (! validarMail.test(valor_email.trim())) {
		return false;
	}
    else{
        return true;
    }
};

/*================================================================================
* formulario() Funcion realiza la validación respectiva de un formulario antes de
  enviar sus datos*
==================================================================================*/
var formulario = function(){
    $(".form").on('submit', function(event) {
        event.preventDefault();
        $(this).find("input").removeClass('requerido');
        $(this).find("select").removeClass('requerido');
        $(this).find("textarea").removeClass('requerido');
        var nombrefrm = $(this).data("nombre");
        var destino = $(this).data("destino");
        var formData = new FormData(document.getElementById(nombrefrm));
        var valor = 0;
        $(this).find(".required").each(function(index, el) {
            var required = $(this).val();
            if (required == "") {
                valor = valor + parseInt(1);
                $(this).addClass('requerido');
            }
            else{
                $(this).removeClass('requerido');
            }
        });
        var email_campo = $(this).find(".email").val();
        if(email_campo != undefined){
            if (!valida_email(email_campo)) {
				$(this).find(".email").removeClass('requerido')
                valor = valor + parseInt(1);
                $(this).find(".email").addClass('requerido');
            }
        }
        //validar campos comparados
        $(this).find(".compare").each(function(index, el) {
            var compare_input_data = $(this).data("compare_input_class");
            var compare_input = $(this).val();
            var compared_input = $("."+compare_input).val();

            //Campo a comparar vacío
            if (compared_input == "") {
                valor = valor + parseInt(1);
                $("."+compare_input).addClass('requerido');
            }
            //campo comparado vacío
            if (compare_input == "") {
                valor = valor + parseInt(1);
                $(this).addClass('requerido');
            }
            // Si el valor de los campos son iguales
            if (compare_input != compared_input) {
                valor = valor + parseInt(1);
                $(this).addClass('requerido');
            }

        });
        if (valor == 0) {
            formulario_envio(destino, formData);
        }
    });
};

/*================================================================================
* ancla() Funcion que permite anclar elementos posicionados en una pagina web.
  Para ello se debe de agregar la clase "ancla" en el tag <a> que requiera esta acción
*
==================================================================================*/
var ancla = function(){
    $(".ancla").on('click',  function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        var bleed = $(this).data("ancla_bleed"); // Espacio en pixeles al top de la pantalla
        if (href != undefined) {
            console.log("ERROR: Debe indicar el parámetro href en el tag <a>");
        }
        if (bleed != undefined) {
            $('html, body').animate({
                scrollTop:bleed
            }, 2000);
            return false;
        }
        else{
            $('html, body').animate({
                scrollTop: $(href).offset().top
            }, 1000);
        }
    });
};

/*================================================================================
* open_modal() Funcion que permite abrir una ventana flotante en la página web *
* idtag :   (necesario) Parámetro que activará un tag definido por el usuario, usando data-idtagmodal*
* overflow: (opcional) Parámetro que activará un overflow definido por el usuario usando data-idoverflowmodal*
==================================================================================*/
var open_modal = function( idtag, overflow ){
    if (overflow == "") {
        overflow = "overflow";
    }
    if (idtag == "") {
        console.log("ERROR: Debe definir el parámetro idtag usando data-idtagmodal");
    }
    else{
        $("."+overflow).addClass('fadeInoverflow');
        $("#"+idtag).addClass('fadeInmodal');
    }
};

/*================================================================================
* close_modal() Funcion que permite cerrar una ventana flotante en la página web *
* idtag :   (necesario) Parámetro que activará un tag definido por el usuario, usando data-idtagmodal*
* overflow: (opcional) Parámetro que activará un overflow definido por el usuario usando data-idoverflowmodal*
==================================================================================*/
var close_modal = function(){
    $(".overflow").addClass('fadeOutoverflow');
    $(".modal").addClass('fadeOutmodal');

    setTimeout(function(){
        $(".overflow").removeClass('fadeOutoverflow fadeInoverflow');
        $(".modal").removeClass('fadeOutmodal fadeInmodal');
    }, 500);
};

$(document).ready(function() {
    //Cargamos la funcion de restricción de caracteres
    $(".email").casiano("abcdefghijklmnopqrstuvwxyz1234567890@._-");
    $(".texto").casiano("abcdefghijklmnñopqrstuvwxyzáéíóú&¿?¡!.-,;:_ ");
    $(".alfanumerico").casiano("abcdefghijklmnñopqrstuvwxyzáéíóú1234567890¿?¡!.-,;:_ ");
    $(".numerico").casiano("1234567890");
    //--
    //Cargamos la funcion del formulario
    formulario();
    //--
    //Cargamos la funcion del ancla
    ancla();
    //--
    //Cargamos los tag principales y màs utilizadas para el maxwidth y minwidth almacenando en un Array los nombres de los tags

    var tagsHTML = ["a", "article", "aside", "button", "div", "figcapion", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "img", "input", "label", "li", "legend", "nav", "ol", "p", "section", "select", "span", "strong", "textarea", "ul"];

    for (var i = 0; i < tagsHTML.length; i++) {
        max_min_width(tagsHTML[i]);
    }

    //Cargamos Los estilos para no mostrar un Modal si no es requerido
    //$(".overflow").removeClass('fadeOutoverflow fadeInoverflow');
    //$(".modal").removeClass('fadeOutmodal fadeInmodal');
    //Cargamos para todos los tag HTML la opcion de activar el modal con
    // data-iddestinomodal="#iddestino"     = El id del modal a mostrarse.

    $(".modal_on").on('click',function(event) {
        event.preventDefault();
        var idtag = $(this).data("iddestinomodal");
        open_modal( idtag, "" );
    });
    $(".modal_off").on('click',function(event) {
        event.preventDefault();
        close_modal();
    });
    $(document).on('keyup',function(e) {
        if(e.keyCode == 27){
            close_modal();
        }
    });
    //--
});
