

let historial = [];

const options = {method: 'GET', headers: {Accept: 'application/json'}};

fetch('https://api.fastforex.io/fetch-multi?from=ARS&to=USD%2C%20EUR&api_key=0ceebf1889-29afa43f76-rhcjch', options)
    .then(response => response.json())
    .then(response => {
    let moneda = document.getElementById("moneda");
    moneda.addEventListener("change", function () {
        let valor = parseInt(document.getElementById("cantidad").value);
        let moneda = document.getElementById("moneda").value;
        resultado = 0;
        if (moneda == "dolar") {
            resultado = valor * response.results.USD;
        }
        else if (moneda == "euro") {
            resultado = valor * response.results.EUR;
        }
        else {
            console.log("Seleccione una moneda")
        }
        document.getElementById("resultado").innerHTML = "Resultado: $" + resultado.toFixed(2);


        historial.push("Valor: $" + valor, " Moneda: " + moneda, " Resultado: $" + resultado);
        let historial_JSON = JSON.stringify(historial);
        localStorage.setItem("historial", historial_JSON);

    })
})
    .catch(err => console.error(err));


fetch('https://api.fastforex.io/fetch-one?from=USD&to=ARS&api_key=0ceebf1889-29afa43f76-rhcjch')
.then(response => response.json())
.then(response => {
    document.getElementById("apiDolar").innerHTML = "Precio Dolar: " + response.result.ARS.toFixed(2)
})
.catch(err => console.error(err));


fetch('https://api.fastforex.io/fetch-one?from=EUR&to=ARS&api_key=0ceebf1889-29afa43f76-rhcjch')
    .then(response => response.json())
    .then(response => {
    document.getElementById("apiEuro").innerHTML = "Precio Euro: " + response.result.ARS.toFixed(2)
    })
    .catch(err => console.error(err));



let contact = document.getElementById("contact");
contact.addEventListener("submit", function (e) {
    e.preventDefault();
})


let enviar = document.getElementById("enviar");
enviar.addEventListener("click", function () {
    let nombre = document.getElementById("nombres");
    let apellido = document.getElementById("apellido");
    let cantidad = document.getElementById("cantidad");
    let moneda = document.getElementById("moneda");

    Swal.fire({
        title: '<strong>Resultado</strong>',
        icon: 'success',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        html:
            "Nombre: " + nombre.value + "<br>" +
            "Apellido: " + apellido.value + "<br>" +
            "Pesos: " + cantidad.value + "<br>" +
            "Moneda: " + moneda.value + "<br>" +
            "Resultado: " + resultado.toFixed(2),
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Genial!',
        confirmButtonAriaLabel: 'Genial!'
    });

    set_data();
    guardar_historial();

    moneda.value = "seleccionar";

    historial.pop();
    historial.pop();
    historial.pop();
    

})


let user = []

function set_data() {
    let nombre_usuario = document.getElementById("nombres");
    let apellido_usuario = document.getElementById("apellido");
    let usuario = { "nombres": nombre_usuario.value, "apellido": apellido_usuario.value };

    user.push(usuario);

    let user_JSON = JSON.stringify(user);
    sessionStorage.setItem("usuarios", user_JSON);
}

function guardar_historial(){
    let container = document.getElementById("container");
    let historial = document.getElementById("historial");
    let guardar_historial = JSON.parse(localStorage.getItem("historial"));

    historial.remove();

    let nuevo_historial = document.createElement("div");
    nuevo_historial.remove();
    nuevo_historial.innerHTML = guardar_historial;
    nuevo_historial.className = "historial";
    nuevo_historial.id = "historial";
    container.append(nuevo_historial);

}

