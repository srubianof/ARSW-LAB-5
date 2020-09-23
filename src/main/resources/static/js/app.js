var app = (function () {
    var nombreCine = "";
    var fechaFuncion = "";
    var listaFunciones = [];


    var mapObjetos = (funciones) => {
        listaFunciones = funciones.map(({movie: {name, genre}, date}) => ({
                name: name,
                genre: genre,
                time: date
            })
        )
        $("#tablaMovies > tbody").empty();
        listaFunciones.forEach(({name, genre, time}) => {
            $("#tablaMovies > tbody").append(
                "<tr>" +
                " <td>" + name + "</td>" +
                " <td>" + genre + "</td>" +
                " <td>" + time + "</td>" +
                "</tr>"
            );
        });
    }
    var dibujarObjetos = function () {
        var canvas = document.getElementById("myCanvas");
        var lapiz = canvas.getContext("2d");
        lapiz.fillRect(0, 0, canvas.width, canvas.height);
        lapiz.beginPath();
        lapiz.moveTo(12,12);
    }


    return {
        dibujarObjetos(nombre, fecha) {
            apimock.getFunctionsByCinemaAndDate(nombre, fecha, dibujarObjetos)
        },
        actualizarListadodeFunciones(nombre, fecha) {
            this.cambiarFecha(fecha);
            this.cambiarNombreCine(nombre);
            apimock.getFunctionsByCinemaAndDate(nombre, fecha, mapObjetos);
        },
        consultarAsientosDisponibles(nombreCine, fecha, nombrePelicula) {
            apimock.getFunctionsByCinemaAndDate(nombreCine, fecha, dibujarObjetos);
        },
        cambiarNombreCine(nombre) {
            nombreCine = nombre;
        },
        cambiarFecha(fecha) {
            fechaFuncion = fecha;
        }
    }
})();
