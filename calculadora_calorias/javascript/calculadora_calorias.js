var CheckboxMetrico = document.getElementById("valordepesoyaltura_metrico");
var CheckboxImperial = document.getElementById("valordepesoyaltura_imperial");
var Sexo = document.getElementById("opcionsexo");
var Edad = document.getElementById("input_edad");
var Altura = document.getElementById("input_altura");
var MedidaAltura = document.getElementById("label_altura");
var Peso = document.getElementById("input_peso");
var MedidaPeso = document.getElementById("label_peso");
var TMB;
var Actividad = document.getElementById("opcion_actividad");
var GET;
var Objetivo = document.getElementById("opcion_objetivo");
var Kcal
var Proteina;
var Grasa;
var HC;
var MostrarCalorias = document.getElementById("calculo_tmb");
var MostrarProteina = document.getElementById("calculo_proteina");
var MostrarGrasa = document.getElementById("calculo_grasa");
var MostrarHC = document.getElementById("calculo_hc");

function CambiarValoresMetrico() {
    MedidaAltura.innerHTML = "cm";
    MedidaPeso.innerHTML = "kg";
}

function CambiarValoresImperial() {
    MedidaAltura.innerHTML = "in";
    MedidaPeso.innerHTML = "lbs";
}

function Calculadora() {
    // Convertir el imperial a métrico en caso de que se haya seleccionado
    if (CheckboxImperial.checked) {
        Altura.value = Altura.value / 0.3937;
        Peso.value = Peso.value / 2.2046;
    }
    else {
        Altura.value = Altura.value;
        Peso.value = Peso.value;
    }

    // Calcular el TMB en función del sexo, edad, altura y peso
    if (Sexo.value == "mujer") {
        TMB = (10 * Peso.value) + (6.25 * Altura.value) - (5 * Edad.value) - 161;
    }
    else {
        TMB = (10 * Peso.value) + (6.25 * Altura.value) - (5 * Edad.value) - 5;
    }
                
    // Sumar el ETA al TMB
    TMB = TMB + (TMB * 0.1);

    // Calcular el GET en función del nivel de actividad
    if (Actividad.value == "baja_actividad") {
        GET = TMB * 1.2;
    }
    else if (Actividad.value == "actividad_mediabaja") {
        GET = TMB * 1.375;
    }
    else if (Actividad.value == "actividad_mediaalta") {
        GET = TMB * 1.55;
    }
    else {
        GET = TMB * 1.725;
    }

    //Calcular las calorías necesarias en función del objetivo
    if (Objetivo.value == "perder_grasa") {
        Kcal = Math.round(GET - 300);
    }
    else if (Objetivo.value == "ganar_masa_muscular") {
        Kcal = Math.round(GET + 300);
    }
    else {
        Kcal = Math.round(GET);
    }
                
    // Calcular macros en función del objetivo
    if (Objetivo.value == "perder_grasa") {
        Proteina = Math.round((Kcal * 0.35) / 4);
        Grasa = Math.round((Kcal * 0.2) / 9);
        HC = Math.round((Kcal * 0.45) / 4);
    }
    else if (Objetivo.value == "ganar_masa_muscular") {
        Proteina = Math.round((Kcal * 0.3) / 4);
        Grasa = Math.round((Kcal * 0.2) / 9);
        HC = Math.round((Kcal * 0.5) / 4);
    }
    else {
        Proteina = Math.round((Kcal * 0.3) / 4);
        Grasa = Math.round((Kcal * 0.2) / 9);
        HC = Math.round((Kcal * 0.5) / 4);
    }

    // Mostrar resultados
    MostrarCalorias.innerHTML = Kcal + " Kcal diarias";
    MostrarProteina.innerHTML = Proteina + "g al día";
    MostrarGrasa.innerHTML = Grasa + "g al día";
    MostrarHC.innerHTML = HC + "g al día";

    // Vaciar los campos de edad, altura y peso
    Edad.value = null;
    Altura.value = null;
    Peso.value = null;

    // Devolver un false para que no se refresque la página
    return false;
}