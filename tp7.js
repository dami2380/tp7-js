

function Actor(nombre, apellido, edad) {

    
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    

    
    this.obtenerNombreCompleto = function() {

        return this.nombre + ' ' + this.apellido;

    }

}



function Pelicula (id, titulo, anio, duracion, director,descripcion,imagen) {

    
    this.titulo = titulo;
    this.anio = anio; 
    this.duracion = duracion;
    this.director = director;
    this.actores = []; 
    this.descripcion = descripcion;
    this.imagen = imagen;


    
    this.editarTitulo = function (titulo) {
        titulo = titulo;
    }

    this.editarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.agregarActores = function () {

        var nombre;
        var apellido;

        do {

            nombre = prompt('Ingrese el nombre del actor o ingrese 0 para salir');
            apellido = prompt('Ingrese el apellido del actor o ingrese 0 para salir');
            edad = parseInt(prompt('Ingrese la edad del actor o ingrese 0 para salir'));

            if (nombre !== '0' && apellido !== '0' && edad !== 0) {

                var actor = new Actor(nombre, apellido, edad);
                this.actores.push(actor);

            }

        } while(nombre !== '0' || apellido !== '0' || edad !== 0) 

    }

}


function Videoteca() {
    
    
    this.moviesList = [];
    
    
    this.addMovie = function (movie) {
        
        var newMovie = true;
        
        for (i=0; i <= this.moviesList.length && newMovie === true; i++) {

            if (movie === this.moviesList[i]) {

                newMovie = false;
                
            };

        };


        if (newMovie === true) { 
            
            moviesList.push(movie);
            
        } else {
            
            alert('Esta Pelicula ya existe');
            
        }
    };

    
    
    this.deleteMovie = function (idToDelete) {

        for (i=0; i <= moviesList.length; i++) {

            if (moviesList[i].id === idToDelete) {

                moviesList.splice(i,1);
                break;
            };
        };
    };


    
    this.compareId = function (a,b) {

        var result;

        if (a.id < b.id) {

            result = -1;
        };

        if (a.id === b.id) {

            result = 0;
        };

        if (a.id > b.id) {

            result = 1;
        };


        return result;

    }


    this.idOrder = function () {

        moviesList.sort(this.compareId);
        
    }

    

}

var MostrarPeliculas = (function () {

    // Atributos privados
    var movies = Videoteca ();
    var claveLocalStorage = 'movies';

    
    var precargarPeliculas = function () {
        
        
        
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            movie = JSON.parse(datos);
            
            for (i = 0; i < movies.length; i++) {
                
                dibujarPelicula(movies[i]);
                
            }

        }

    }




    
    var guardarPeliculas = function () {

        var datos = JSON.stringify(movies);
        localStorage.setItem(claveLocalStorage, datos);

    }



var dibujarPelicula = function (movie) {

        
        var ul = document.getElementById("movies");

        
        var li = document.createElement("li");
        var h1 = document.createElement('h1');
        var img = document.createElement('img');
        var p = document.createElement('p');

        
        li.setAttribute('id', movie.id);
        li.setAttribute('class', 'list-group-item'); 

        
        h1 = agregarTexto(h1, movie.titulo);
        p = agregarTexto(p, movie.descripcion);

        
        img.setAttribute('src',  movie.imagen);

        
        li.appendChild(h1);
        li.appendChild(p);
        li.appendChild(img);

        
        ul.appendChild(li);

    }



var borrarPeliculaDOM = function (movie) {

        var ul = document.getElementById("movies");
        var li = document.getElementById(movie.id);

        ul.removeChild(li);

    }

var existePelicula = function (movie) {

        var posicion = -1; 
        
        
        for(i = 0; i < movies.length && posicion === -1; i++) { 

            if (movies[i].id === movie.id) { 
                
                
                posicion = i; 

            }

        }

        return posicion;

    }

    var agregarPelicula = function (movie) {

        
        var posicion = existePelicula(movie);

        if (posicion === -1) {

            movies.push(movie);

            guardarPeliculas();

            dibujarPelicula(movie);

        }  else {

            alert('La Pelicula con id: ' + movie.id + ' ya existe');

        }

    }

    var eliminarPelicula = function (movie) {

        var posicion = existePelicula(movie);

        if (posicion > -1) {

            
            movies.splice(posicion, 1);

            guardarPeliculas();

            borrarPeliculaDOM(movie);

        } else {

            alert('La pelicula con id: ' + movie.id + ' no existe');

        }

    }

var limpiarMostrarPeliculas = function () {

        newMovie = []
        localStorage.removeItem(claveLocalStorage);
        
        var movies = document.getElementById("movie");
        
        while (movies.firstChild) {
            movies.removeChild(movies.firstChild);
        }
        
    }

    precargarPeliculas();

    
    return {
        agregarPelicula: agregarPelicula,
        eliminarPelicula: eliminarPelicula,
        limpiarMostrarPeliculas: limpiarMostrarPeliculas
    };

})()


