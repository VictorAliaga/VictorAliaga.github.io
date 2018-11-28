var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(xhttp.responseText);
        var perro = response;

        var output = '';
        for (var i = 0; i < perro.length; i++) {
            output += '<article>' + '<h2><b>'+perro[i].NombreMascota+'</h2></b>' + '<img src="'+perro[i].Imagen+'" alt="'+i+'">' +
            '<p><b>Raza: </b>' +perro[i].RazaPredominante+'</p>' + '<p><b>Description: </b>' +perro[i].Descripcion+'</p>' + '<p><b>Estado: </b>' +perro[i].Estado+'</p></article>'; 
        }

        document.getElementById('MascotasContenedor').innerHTML = output;
    }
};

xhttp.open("GET", "https://victoraliaga.pythonanywhere.com/mascotas/?format=json", true);
xhttp.send();