// VARIABLES
    let miCanvas = document.querySelector('#pizarra');
    let lineas = [];
    let correccionX = 0;
    let correccionY = 0;
    let pintarLinea = false;

    let posicion = miCanvas.getBoundingClientRect()
    correccionX = posicion.x;
    correccionY = posicion.y;

    miCanvas.width = 500;
    miCanvas.height = 500;

    // FUNCIONES

    //Funcion que empieza a dibujar la linea
    function empezarDibujo () {
        pintarLinea = true;
        lineas.push([]);
    };
    //Funcion dibuja la linea
    function dibujarLinea (event) {
        event.preventDefault();
        if (pintarLinea) {
            let ctx = miCanvas.getContext('2d')
            // Estilos de linea
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.lineWidth = 1;
            // Color de la linea
            ctx.strokeStyle = '#0f0';
            // Marca el nuevo punto
            let nuevaPosicionX = 0;
            let nuevaPosicionY = 0;
            if (event.changedTouches == undefined) {
                // Versión ratón
                nuevaPosicionX = event.layerX;
                nuevaPosicionY = event.layerY;
            } else {
                // Versión touch, pantalla tactil
                nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
                nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
            }
            // Guarda la linea
            lineas[lineas.length - 1].push({
                x: nuevaPosicionX,
                y: nuevaPosicionY
            });
            // Redibuja todas las lineas guardadas
            ctx.beginPath();
            lineas.forEach(function (segmento) {
                ctx.moveTo(segmento[0].x, segmento[0].y);
                segmento.forEach(function (punto, index) {
                    ctx.lineTo(punto.x, punto.y);
                });
            });
            ctx.stroke();
        }
    }
    //Funcion que deja de dibujar la linea
    function pararDibujar () {
        pintarLinea = false;
    }

    /*
     * EVENTOS
     */

    // Eventos raton
    miCanvas.addEventListener('mousedown', empezarDibujo, false);
    miCanvas.addEventListener('mousemove', dibujarLinea, false);
    miCanvas.addEventListener('mouseup', pararDibujar, false);
    // Eventos pantallas táctiles
    miCanvas.addEventListener('touchstart', empezarDibujo, false);
    miCanvas.addEventListener('touchmove', dibujarLinea, false);

    // código Guardar Firma
    let doc = new jsPDF('p','pt','a4');
        $('#guardar').click(function(){
            doc.addHTML(document.body,function() {
            doc.save('html.pdf');
            });
        }); 
