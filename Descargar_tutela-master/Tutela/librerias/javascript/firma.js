/*
 * Copyright (C) 2020 Ernesto Baruch
 * GitHub:       https://github.com/Baruch13
 * E-mail:       ernestobaruch15@gmail.com
 * WhatsApp:     (+57)302 3342189
 *
 * Con el apoyo de Oscar Gonzalez
 * GitHub:       https://github.com/OscarGonzalez1987/
 * E-mail:       oigonzalezp@gmail.com
 * WhatsApp:     (+57)322 8858439
 *
 * Fuente De Consulta:

 * DIBUJAR USANDO EL RATÓN O EL DEDO CON HTML
 * NOTA:De aqui saque le codigo de la pizarra
 * https://programadorwebvalencia.com/dibujar-con-el-raton-en-HTML-y-Javascript/

 * Convertir de HTML a PDF utilizando Javascript
 * NOTA: De aqui saque el Jquery
 * https://programacion.net/articulo/convertir_de_html_a_pdf_utilizando_javascript_2122

 * Cómo convertir una página HTML a PDF entonces descargarlo?
 * NOTA: De aqui saque para generar el documento pdf
 * https://www.it-swarm.dev/es/javascript/ como-convertir-una-pagina-html-pdf-entonces-descargarlo/834786198/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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