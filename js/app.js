
// ==========================================
// MENÚ RESPONSIVO
// ==========================================

const botonMenu = document.getElementById("botonMenu");
const navegacion = document.getElementById("navegacion");

if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", function () {
        navegacion.classList.toggle("activa");
    });

    const enlacesMenu = navegacion.querySelectorAll("a");

    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener("click", function () {
            navegacion.classList.remove("activa");
        });

    });
}


// ==========================================
// MOCHILA DE EMERGENCIA INTERACTIVA
// ==========================================

const objetosMochila = [

    {
        id: "agua",
        icono: "💧",
        nombre: "Agua",
        descripcion:
            "El agua es fundamental para mantener la hidratación durante una emergencia. Se recomienda contar con agua segura para beber."
    },

    {
        id: "alimentos",
        icono: "🥫",
        nombre: "Alimentos no perecibles",
        descripcion:
            "Los alimentos no perecibles pueden mantenerse durante más tiempo y servir como reserva durante una emergencia."
    },

    {
        id: "linterna",
        icono: "🔦",
        nombre: "Linterna",
        descripcion:
            "Una linterna permite contar con iluminación si ocurre un corte de energía o si necesitas desplazarte durante la noche."
    },

    {
        id: "radio",
        icono: "📻",
        nombre: "Radio",
        descripcion:
            "Una radio puede ayudarte a recibir información y recomendaciones de las autoridades cuando otros medios de comunicación no están disponibles."
    },

    {
        id: "botiquin",
        icono: "🩹",
        nombre: "Botiquín",
        descripcion:
            "Un botiquín permite contar con elementos básicos para atender pequeñas lesiones mientras llega la ayuda correspondiente."
    },

    {
        id: "documentos",
        icono: "📄",
        nombre: "Documentos protegidos",
        descripcion:
            "Los documentos importantes deben mantenerse protegidos del agua y de otros daños que puedan producirse durante una inundación."
    },

    {
        id: "ropa",
        icono: "👕",
        nombre: "Ropa",
        descripcion:
            "Contar con ropa limpia y seca puede ser importante después de una evacuación o si la ropa que llevabas se moja."
    },

    {
        id: "higiene",
        icono: "🧼",
        nombre: "Artículos de higiene",
        descripcion:
            "Los artículos de higiene ayudan a mantener la limpieza personal durante una situación de emergencia."
    }

];


// ==========================================
// VARIABLES DE LA MOCHILA
// ==========================================

const objetosSeleccionados = new Set();

const listaObjetosMochila =
    document.getElementById("listaObjetosMochila");

const objetosDentro =
    document.getElementById("objetosDentro");

const porcentaje =
    document.getElementById("porcentaje");

const barraProgreso =
    document.getElementById("barraProgreso");

const contadorMochila =
    document.getElementById("contadorMochila");

const contadorObjetos =
    document.getElementById("contadorObjetos");

const mensajeMochila =
    document.getElementById("mensajeMochila");

const mensajeCompleto =
    document.getElementById("mensajeCompleto");

const detalleObjeto =
    document.getElementById("detalleObjeto");

const reiniciarMochila =
    document.getElementById("reiniciarMochila");


// ==========================================
// MOSTRAR INFORMACIÓN DEL OBJETO
// ==========================================

function mostrarDetalleObjeto(objeto) {

    if (!detalleObjeto) {
        return;
    }

    detalleObjeto.innerHTML = `

        <div class="detalle-icono">
            ${objeto.icono}
        </div>

        <div>
            <h4>${objeto.nombre}</h4>

            <p>
                ${objeto.descripcion}
            </p>
        </div>

    `;
}


// ==========================================
// ACTUALIZAR PROGRESO DE LA MOCHILA
// ==========================================

function actualizarMochila() {

    const cantidadSeleccionada =
        objetosSeleccionados.size;

    const cantidadTotal =
        objetosMochila.length;

    const progreso =
        Math.round(
            (cantidadSeleccionada / cantidadTotal) * 100
        );


    // Porcentaje

    if (porcentaje) {

        porcentaje.textContent =
            `${progreso}%`;

    }


    // Barra de progreso

    if (barraProgreso) {

        barraProgreso.style.width =
            `${progreso}%`;

    }


    // Contador

    if (contadorMochila) {

        contadorMochila.textContent =
            `${cantidadSeleccionada} de ${cantidadTotal} elementos`;

    }


    // Contador del panel

    if (contadorObjetos) {

        contadorObjetos.textContent =
            `${cantidadSeleccionada}/${cantidadTotal}`;

    }


    // Mensajes

    if (mensajeMochila) {

        if (progreso === 0) {

            mensajeMochila.textContent =
                "Comencemos a preparar tu mochila.";

        }

        else if (progreso < 50) {

            mensajeMochila.textContent =
                "Vas comenzando. ¡Sigue agregando elementos!";

        }

        else if (progreso < 75) {

            mensajeMochila.textContent =
                "¡Vas avanzando! Tu mochila cada vez está más completa.";

        }

        else if (progreso < 100) {

            mensajeMochila.textContent =
                "¡Muy bien! Ya tienes gran parte de tu mochila preparada.";

        }

        else {

            mensajeMochila.textContent =
                "¡Todo listo! Has preparado los 8 elementos.";

        }

    }


    // Mensaje final

    if (mensajeCompleto) {

        if (progreso === 100) {

            mensajeCompleto.classList.add("visible");

        }

        else {

            mensajeCompleto.classList.remove("visible");

        }

    }


    // Actualizar botones

    const botones =
        document.querySelectorAll(".objeto-mochila");

    botones.forEach(function (boton) {

        const id =
            boton.dataset.id;

        if (objetosSeleccionados.has(id)) {

            boton.classList.add("agregado");

        }

        else {

            boton.classList.remove("agregado");

        }

    });

}


// ==========================================
// AGREGAR OBJETO A LA MOCHILA
// ==========================================

function agregarObjeto(objeto) {

    if (objetosSeleccionados.has(objeto.id)) {

        mostrarDetalleObjeto(objeto);

        return;

    }


    // Guardar objeto seleccionado

    objetosSeleccionados.add(objeto.id);


    // Mostrar objeto dentro de la mochila

    if (objetosDentro) {

        const mensajeVacio =
            objetosDentro.querySelector(".mochila-vacia");

        if (mensajeVacio) {

            mensajeVacio.remove();

        }


        const objetoVisual =
            document.createElement("span");

        objetoVisual.className =
            "objeto-dentro";

        objetoVisual.textContent =
            objeto.icono;

        objetoVisual.title =
            objeto.nombre;


        objetosDentro.appendChild(
            objetoVisual
        );

    }


    // Mostrar información

    mostrarDetalleObjeto(objeto);


    // Actualizar progreso

    actualizarMochila();

}


// ==========================================
// CREAR LISTA DE OBJETOS
// ==========================================

function crearObjetosMochila() {

    if (!listaObjetosMochila) {
        return;
    }


    listaObjetosMochila.innerHTML = "";


    objetosMochila.forEach(function (objeto) {

        const boton =
            document.createElement("button");

        boton.type =
            "button";

        boton.className =
            "objeto-mochila";

        boton.dataset.id =
            objeto.id;


        boton.innerHTML = `

            <span class="objeto-icono">
                ${objeto.icono}
            </span>

            <span class="objeto-nombre">
                ${objeto.nombre}
            </span>

            <span class="objeto-check">
                ✓
            </span>

        `;


        boton.addEventListener(
            "click",
            function () {

                agregarObjeto(objeto);

            }
        );


        listaObjetosMochila.appendChild(
            boton
        );

    });

}


// ==========================================
// REINICIAR MOCHILA
// ==========================================

if (reiniciarMochila) {

    reiniciarMochila.addEventListener(
        "click",
        function () {

            objetosSeleccionados.clear();


            if (objetosDentro) {

                objetosDentro.innerHTML = `

                    <span class="mochila-vacia">
                        Aún está vacía
                    </span>

                `;

            }


            if (detalleObjeto) {

                detalleObjeto.innerHTML = `

                    <div class="detalle-vacio">

                        <span>👆</span>

                        <p>
                            Selecciona un elemento para conocer
                            por qué es importante.
                        </p>

                    </div>

                `;

            }


            actualizarMochila();

        }
    );

}


// ==========================================
// INICIAR MOCHILA
// ==========================================

crearObjetosMochila();

actualizarMochila();


// ==========================================
// ANTES, DURANTE Y DESPUÉS
// ==========================================

const botonesEtapas =
    document.querySelectorAll(".boton-etapa");


const iconoEtapa =
    document.getElementById("iconoEtapa");

const numeroEtapa =
    document.getElementById("numeroEtapa");

const tituloEtapa =
    document.getElementById("tituloEtapa");

const descripcionEtapa =
    document.getElementById("descripcionEtapa");

const listaEtapa =
    document.getElementById("listaEtapa");


// ==========================================
// INFORMACIÓN DE CADA ETAPA
// ==========================================

const informacionEtapas = {

    antes: {

        icono: "🛡️",

        numero: "01",

        titulo: "Antes de una inundación",

        descripcion:
            "La preparación comienza antes de que ocurra una emergencia. Conocer el riesgo y organizar a tu familia puede ayudarte a actuar con mayor seguridad.",

        lista: [

            "Identifica las zonas seguras y las posibles rutas de evacuación.",

            "Prepara una mochila de emergencia.",

            "Protege documentos importantes.",

            "Mantén despejados los canales, desagües y zonas de evacuación.",

            "Conversa con tu familia sobre qué hacer si ocurre una inundación."

        ]

    },


    durante: {

        icono: "🌊",

        numero: "02",

        titulo: "Durante una inundación",

        descripcion:
            "Durante una inundación es importante mantener la calma y seguir las indicaciones de las autoridades.",

        lista: [

            "Dirígete hacia una zona segura si las autoridades indican evacuar.",

            "Evita cruzar calles, ríos o zonas inundadas.",

            "No te acerques a cables eléctricos caídos.",

            "Mantente informado mediante fuentes oficiales.",

            "Ayuda a niños, adultos mayores y personas que necesiten asistencia."

        ]

    },


    despues: {

        icono: "🏠",

        numero: "03",

        titulo: "Después de una inundación",

        descripcion:
            "Después de una inundación todavía existen riesgos. Es importante regresar únicamente cuando las autoridades indiquen que es seguro.",

        lista: [

            "No regreses a tu vivienda hasta que sea seguro hacerlo.",

            "Evita entrar en contacto con agua contaminada.",

            "Limpia y desinfecta los espacios afectados.",

            "Utiliza protección adecuada durante la limpieza.",

            "Mantente atento a nuevas indicaciones de las autoridades."

        ]

    }

};


// ==========================================
// MOSTRAR ETAPA
// ==========================================

function mostrarEtapa(etapa) {

    const informacion =
        informacionEtapas[etapa];

    if (!informacion) {
        return;
    }


    if (iconoEtapa) {

        iconoEtapa.textContent =
            informacion.icono;

    }


    if (numeroEtapa) {

        numeroEtapa.textContent =
            informacion.numero;

    }


    if (tituloEtapa) {

        tituloEtapa.textContent =
            informacion.titulo;

    }


    if (descripcionEtapa) {

        descripcionEtapa.textContent =
            informacion.descripcion;

    }


    if (listaEtapa) {

        listaEtapa.innerHTML = "";


        informacion.lista.forEach(
            function (item) {

                const li =
                    document.createElement("li");

                li.textContent =
                    item;

                listaEtapa.appendChild(li);

            }
        );

    }


    // Activar botón correspondiente

    botonesEtapas.forEach(
        function (boton) {

            if (
                boton.dataset.etapa === etapa
            ) {

                boton.classList.add("activo");

            }

            else {

                boton.classList.remove("activo");

            }

        }
    );

}


// ==========================================
// EVENTOS DE LOS BOTONES DE ETAPAS
// ==========================================

botonesEtapas.forEach(
    function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const etapa =
                    boton.dataset.etapa;

                mostrarEtapa(etapa);

            }
        );

    }
);


// ==========================================
// MOSTRAR "ANTES" AL CARGAR LA PÁGINA
// ==========================================

mostrarEtapa("antes");

// ==========================================
// EVALUACIÓN INTERACTIVA
// ==========================================

const preguntasEvaluacion = [

    {
        pregunta:
            "¿Qué debemos hacer antes de una posible inundación?",

        opciones: [
            "Esperar a que el agua llegue a nuestra vivienda",
            "Prepararnos, conocer las zonas seguras y tener una mochila de emergencia",
            "Acercarnos al río para observar su nivel",
            "No hacer nada hasta recibir una emergencia"
        ],

        correcta: 1,

        icono: "🛡️",

        explicacion:
            "La preparación debe realizarse antes de la emergencia. Conocer las zonas seguras, las rutas de evacuación y preparar una mochila ayuda a responder mejor."
    },


    {
        pregunta:
            "¿Qué debemos hacer si las autoridades indican evacuar?",

        opciones: [
            "Ignorar la indicación",
            "Esperar a que el agua llegue a la vivienda",
            "Dirigirnos hacia una zona segura siguiendo las indicaciones",
            "Ir hacia el río para comprobar la situación"
        ],

        correcta: 2,

        icono: "🚨",

        explicacion:
            "Si las autoridades indican evacuar, debemos dirigirnos hacia una zona segura y seguir las rutas e indicaciones establecidas."
    },


    {
        pregunta:
            "¿Por qué es importante tener una linterna en la mochila de emergencia?",

        opciones: [
            "Para decorar la mochila",
            "Para iluminar si ocurre un corte de energía o necesitamos desplazarnos de noche",
            "Para utilizarla únicamente durante el día",
            "Porque reemplaza a la radio"
        ],

        correcta: 1,

        icono: "🔦",

        explicacion:
            "Una linterna permite contar con iluminación durante un corte de energía o cuando necesitamos desplazarnos en lugares oscuros."
    },


    {
        pregunta:
            "¿Qué debemos evitar durante una inundación?",

        opciones: [
            "Seguir las indicaciones oficiales",
            "Dirigirnos a una zona segura",
            "Cruzar zonas inundadas o corrientes de agua",
            "Mantener la calma"
        ],

        correcta: 2,

        icono: "🌊",

        explicacion:
            "Nunca debemos intentar cruzar corrientes de agua o zonas inundadas, ya que pueden ser peligrosas y tener una profundidad o fuerza difícil de calcular."
    },


    {
        pregunta:
            "¿Qué elemento ayuda a proteger documentos importantes?",

        opciones: [
            "Una bolsa o recipiente que los proteja del agua",
            "Dejarlos sobre el piso",
            "Dejarlos cerca de una ventana",
            "Guardarlos junto a objetos mojados"
        ],

        correcta: 0,

        icono: "📄",

        explicacion:
            "Los documentos importantes deben mantenerse protegidos del agua y de otros daños que puedan producirse durante una inundación."
    },


    {
        pregunta:
            "¿Qué debemos hacer después de una inundación?",

        opciones: [
            "Regresar inmediatamente sin verificar si es seguro",
            "Entrar en contacto con el agua acumulada",
            "Seguir las indicaciones de las autoridades y regresar cuando sea seguro",
            "Acercarnos a los cables eléctricos caídos"
        ],

        correcta: 2,

        icono: "🏠",

        explicacion:
            "Después de una inundación todavía pueden existir riesgos. Debemos regresar solamente cuando las autoridades indiquen que es seguro."
    },


    {
        pregunta:
            "¿Cuál es una buena acción para prepararnos como familia?",

        opciones: [
            "No hablar sobre el tema",
            "Identificar un punto de encuentro y una ruta de evacuación",
            "Esperar a que cada persona decida qué hacer durante la emergencia",
            "No preparar ningún objeto"
        ],

        correcta: 1,

        icono: "👨‍👩‍👧",

        explicacion:
            "Una familia preparada debe conocer sus rutas de evacuación y establecer un punto de encuentro para facilitar la comunicación."
    },


    {
        pregunta:
            "¿Por qué es importante contar con una mochila de emergencia?",

        opciones: [
            "Porque sirve únicamente como equipaje",
            "Porque contiene elementos que pueden ser útiles durante una emergencia",
            "Porque reemplaza completamente la ayuda de las autoridades",
            "Porque evita que ocurra una inundación"
        ],

        correcta: 1,

        icono: "🎒",

        explicacion:
            "La mochila de emergencia reúne elementos que pueden resultar útiles durante una emergencia. No evita una inundación, pero ayuda a estar mejor preparados."
    }

];


// ==========================================
// VARIABLES DE LA EVALUACIÓN
// ==========================================

let preguntaActual = 0;

let puntajeEvaluacion = 0;

let respuestaSeleccionada = false;


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

// Botón para comenzar

const botonEvaluacion =
    document.getElementById("botonEvaluacion");


// Contenedor principal del quiz

const quiz =
    document.getElementById("quiz");


// Número de pregunta

const quizNumero =
    document.getElementById("quizNumero");


// Puntaje

const quizPuntaje =
    document.getElementById("quizPuntaje");


// Barra de progreso

const quizBarraProgreso =
    document.getElementById("quizBarraProgreso");


// Icono

const quizIcono =
    document.getElementById("quizIcono");


// Pregunta

const quizPregunta =
    document.getElementById("quizPregunta");


// Opciones

const quizOpciones =
    document.getElementById("quizOpciones");


// Explicación

const quizExplicacion =
    document.getElementById("quizExplicacion");


// Botón siguiente

const quizSiguiente =
    document.getElementById("quizSiguiente");


// Resultado

const quizResultado =
    document.getElementById("quizResultado");


// Elementos del resultado

const resultadoIcono =
    document.getElementById("resultadoIcono");

const resultadoTitulo =
    document.getElementById("resultadoTitulo");

const resultadoPuntaje =
    document.getElementById("resultadoPuntaje");

const resultadoMensaje =
    document.getElementById("resultadoMensaje");


// Botón reiniciar

const quizReiniciar =
    document.getElementById("quizReiniciar");


// ==========================================
// OCULTAR EL QUIZ AL CARGAR
// ==========================================

if (quiz) {

    quiz.style.display = "none";

}


if (quizResultado) {

    quizResultado.style.display = "none";

}


// ==========================================
// MOSTRAR UNA PREGUNTA
// ==========================================

function mostrarPregunta() {

    const pregunta =
        preguntasEvaluacion[preguntaActual];


    if (!pregunta) {
        return;
    }


    // Permitir seleccionar nuevamente

    respuestaSeleccionada = false;


    // --------------------------------------
    // NÚMERO DE PREGUNTA
    // --------------------------------------

    if (quizNumero) {

        quizNumero.textContent =
            `Pregunta ${preguntaActual + 1} de ${preguntasEvaluacion.length}`;

    }


    // --------------------------------------
    // PUNTAJE
    // --------------------------------------

    if (quizPuntaje) {

        quizPuntaje.textContent =
            `Puntaje: ${puntajeEvaluacion}`;

    }


    // --------------------------------------
    // BARRA DE PROGRESO
    // --------------------------------------

    const progreso =
        (
            (preguntaActual + 1)
            /
            preguntasEvaluacion.length
        ) * 100;


    if (quizBarraProgreso) {

        quizBarraProgreso.style.width =
            `${progreso}%`;

    }


    // --------------------------------------
    // ICONO
    // --------------------------------------

    if (quizIcono) {

        quizIcono.textContent =
            pregunta.icono;

    }


    // --------------------------------------
    // PREGUNTA
    // --------------------------------------

    if (quizPregunta) {

        quizPregunta.textContent =
            pregunta.pregunta;

    }


    // --------------------------------------
    // CREAR OPCIONES
    // --------------------------------------

    if (quizOpciones) {

        quizOpciones.innerHTML = "";


        pregunta.opciones.forEach(
            function (opcion, indice) {

                const boton =
                    document.createElement("button");


                boton.type =
                    "button";


                boton.className =
                    "quiz-opcion";


                boton.dataset.indice =
                    indice;


                boton.innerHTML = `

                    <span class="quiz-opcion-letra">
                        ${String.fromCharCode(65 + indice)}
                    </span>

                    <span class="quiz-opcion-texto">
                        ${opcion}
                    </span>

                `;


                boton.addEventListener(
                    "click",
                    function () {

                        seleccionarRespuesta(
                            indice,
                            boton
                        );

                    }
                );


                quizOpciones.appendChild(
                    boton
                );

            }
        );

    }


    // --------------------------------------
    // LIMPIAR EXPLICACIÓN
    // --------------------------------------

    if (quizExplicacion) {

        quizExplicacion.innerHTML = "";

        quizExplicacion.classList.remove(
            "visible"
        );

    }


    // --------------------------------------
    // OCULTAR SIGUIENTE
    // --------------------------------------

    if (quizSiguiente) {

        quizSiguiente.style.display =
            "none";

    }

}


// ==========================================
// SELECCIONAR RESPUESTA
// ==========================================

function seleccionarRespuesta(
    indiceSeleccionado,
    botonSeleccionado
) {

    // Evitar seleccionar dos veces

    if (respuestaSeleccionada) {
        return;
    }


    respuestaSeleccionada = true;


    const pregunta =
        preguntasEvaluacion[preguntaActual];


    // Buscar todas las opciones

    const botones =
        quizOpciones.querySelectorAll(
            ".quiz-opcion"
        );


    // Desactivar todas las opciones

    botones.forEach(
        function (boton) {

            boton.disabled = true;

        }
    );


    // --------------------------------------
    // VERIFICAR RESPUESTA
    // --------------------------------------

    const esCorrecta =
        indiceSeleccionado === pregunta.correcta;


    if (esCorrecta) {

        puntajeEvaluacion++;


        botonSeleccionado.classList.add(
            "correcta"
        );

    }

    else {

        botonSeleccionado.classList.add(
            "incorrecta"
        );


        // Mostrar cuál era la correcta

        botones.forEach(
            function (boton) {

                if (
                    Number(boton.dataset.indice)
                    ===
                    pregunta.correcta
                ) {

                    boton.classList.add(
                        "correcta"
                    );

                }

            }
        );

    }


    // --------------------------------------
    // ACTUALIZAR PUNTAJE
    // --------------------------------------

    if (quizPuntaje) {

        quizPuntaje.textContent =
            `Puntaje: ${puntajeEvaluacion}`;

    }


    // --------------------------------------
    // MOSTRAR EXPLICACIÓN
    // --------------------------------------

    if (quizExplicacion) {

        quizExplicacion.innerHTML = `

            <strong>
                ${
                    esCorrecta
                    ? "✅ ¡Respuesta correcta!"
                    : "❌ Respuesta incorrecta"
                }
            </strong>

            <p>
                ${pregunta.explicacion}
            </p>

        `;


        quizExplicacion.classList.add(
            "visible"
        );

    }


    // --------------------------------------
    // MOSTRAR BOTÓN SIGUIENTE
    // --------------------------------------

    if (quizSiguiente) {

        quizSiguiente.style.display =
            "inline-flex";


        if (
            preguntaActual ===
            preguntasEvaluacion.length - 1
        ) {

            quizSiguiente.textContent =
                "Ver resultado →";

        }

        else {

            quizSiguiente.textContent =
                "Siguiente pregunta →";

        }

    }

}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

if (quizSiguiente) {

    quizSiguiente.addEventListener(
        "click",
        function () {

            // No avanzar si todavía
            // no respondió

            if (!respuestaSeleccionada) {
                return;
            }


            preguntaActual++;


            if (
                preguntaActual >=
                preguntasEvaluacion.length
            ) {

                mostrarResultado();

            }

            else {

                mostrarPregunta();

            }

        }
    );

}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultado() {

    // Ocultar quiz

    if (quiz) {

        quiz.style.display =
            "none";

    }


    // Mostrar resultado

    if (quizResultado) {

        quizResultado.style.display =
            "block";

    }


    // Calcular porcentaje

    const porcentajeFinal =
        (
            puntajeEvaluacion
            /
            preguntasEvaluacion.length
        ) * 100;


    // --------------------------------------
    // MOSTRAR PUNTAJE
    // --------------------------------------

    if (resultadoPuntaje) {

        resultadoPuntaje.textContent =
            `${puntajeEvaluacion}/${preguntasEvaluacion.length}`;

    }


    // --------------------------------------
    // MENSAJE SEGÚN RESULTADO
    // --------------------------------------

    if (porcentajeFinal >= 90) {

        if (resultadoIcono) {
            resultadoIcono.textContent = "🏆";
        }

        if (resultadoTitulo) {
            resultadoTitulo.textContent =
                "¡Excelente!";
        }

        if (resultadoMensaje) {
            resultadoMensaje.textContent =
                "Tienes muy buenos conocimientos sobre cómo prepararte ante una inundación.";
        }

    }

    else if (porcentajeFinal >= 70) {

        if (resultadoIcono) {
            resultadoIcono.textContent = "🎉";
        }

        if (resultadoTitulo) {
            resultadoTitulo.textContent =
                "¡Muy bien!";
        }

        if (resultadoMensaje) {
            resultadoMensaje.textContent =
                "Tienes buenos conocimientos, aunque todavía puedes seguir aprendiendo.";
        }

    }

    else if (porcentajeFinal >= 50) {

        if (resultadoIcono) {
            resultadoIcono.textContent = "👍";
        }

        if (resultadoTitulo) {
            resultadoTitulo.textContent =
                "¡Buen comienzo!";
        }

        if (resultadoMensaje) {
            resultadoMensaje.textContent =
                "Repasa las recomendaciones de esta página para estar mejor preparado.";
        }

    }

    else {

        if (resultadoIcono) {
            resultadoIcono.textContent = "📚";
        }

        if (resultadoTitulo) {
            resultadoTitulo.textContent =
                "Puedes mejorar";
        }

        if (resultadoMensaje) {
            resultadoMensaje.textContent =
                "Revisa las recomendaciones de esta página y vuelve a intentarlo.";
        }

    }

}


// ==========================================
// INICIAR EVALUACIÓN
// ==========================================

if (botonEvaluacion) {

    botonEvaluacion.addEventListener(
        "click",
        function () {

            // Reiniciar valores

            preguntaActual = 0;

            puntajeEvaluacion = 0;

            respuestaSeleccionada = false;


            // Mostrar quiz

            if (quiz) {

                quiz.style.display =
                    "block";

            }


            // Ocultar resultado

            if (quizResultado) {

                quizResultado.style.display =
                    "none";

            }


            // Mostrar primera pregunta

            mostrarPregunta();


            // Llevar al usuario a la evaluación

            const seccionEvaluacion =
                document.getElementById("evaluacion");


            if (seccionEvaluacion) {

                seccionEvaluacion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


// ==========================================
// REINICIAR EVALUACIÓN
// ==========================================

if (quizReiniciar) {

    quizReiniciar.addEventListener(
        "click",
        function () {

            // Reiniciar valores

            preguntaActual = 0;

            puntajeEvaluacion = 0;

            respuestaSeleccionada = false;


            // Ocultar resultado

            if (quizResultado) {

                quizResultado.style.display =
                    "none";

            }


            // Mostrar quiz

            if (quiz) {

                quiz.style.display =
                    "block";

            }


            // Mostrar primera pregunta

            mostrarPregunta();


            // Llevar al usuario a la evaluación

            const seccionEvaluacion =
                document.getElementById("evaluacion");


            if (seccionEvaluacion) {

                seccionEvaluacion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}

// ==========================================
// PLAN FAMILIAR
// ==========================================

const checksPlan =
    document.querySelectorAll(".check-plan");

const porcentajePlan =
    document.getElementById("porcentajePlan");

const contadorPlan =
    document.getElementById("contadorPlan");

const barraPlan =
    document.getElementById("barraPlan");

const tituloPlan =
    document.getElementById("tituloPlan");

const mensajePlan =
    document.getElementById("mensajePlan");


// ==========================================
// ACTUALIZAR PLAN
// ==========================================

function actualizarPlanFamiliar() {

    const total =
        checksPlan.length;

    let completados = 0;


    // Contar elementos marcados

    checksPlan.forEach(
        function (check) {

            if (check.checked) {

                completados++;

            }

        }
    );


    // Calcular porcentaje

    const progreso =
        Math.round(
            (completados / total) * 100
        );


    // Porcentaje

    if (porcentajePlan) {

        porcentajePlan.textContent =
            `${progreso}%`;

    }


    // Contador

    if (contadorPlan) {

        contadorPlan.textContent =
            `${completados} de ${total}`;

    }


    // Barra

    if (barraPlan) {

        barraPlan.style.width =
            `${progreso}%`;

    }


    // --------------------------------------
    // MENSAJES
    // --------------------------------------

    if (tituloPlan && mensajePlan) {

        if (progreso === 0) {

            tituloPlan.textContent =
                "Comencemos a prepararnos";

            mensajePlan.textContent =
                "Marca las acciones que tu familia ya realiza.";

        }

        else if (progreso < 50) {

            tituloPlan.textContent =
                "Vamos avanzando";

            mensajePlan.textContent =
                "Tu familia ya tiene algunas medidas preparadas. Continúa trabajando en las demás.";

        }

        else if (progreso < 100) {

            tituloPlan.textContent =
                "¡Buen trabajo!";

            mensajePlan.textContent =
                "Ya tienen varias medidas preparadas. Completa las que faltan.";

        }

        else {

            tituloPlan.textContent =
                "¡Familia preparada!";

            mensajePlan.textContent =
                "Han completado todas las acciones del plan familiar.";

        }

    }

}


// ==========================================
// EVENTOS DE LOS CHECKBOX
// ==========================================

checksPlan.forEach(
    function (check) {

        check.addEventListener(
            "change",
            function () {

                const elemento =
                    check.closest(".plan-item");


                if (check.checked) {

                    elemento.classList.add(
                        "completado"
                    );

                }

                else {

                    elemento.classList.remove(
                        "completado"
                    );

                }


                actualizarPlanFamiliar();

            }
        );

    }
);


// ==========================================
// INICIAR PLAN
// ==========================================

actualizarPlanFamiliar();

// ==========================================
// PANELES LATERALES
// ==========================================

const botonesLaterales = document.querySelectorAll(".boton-lateral");

const botonesAbrirPanel = document.querySelectorAll(".boton-abrir-panel");

const panelesLaterales = document.querySelectorAll(".panel-lateral");

const botonesCerrarPanel = document.querySelectorAll(".cerrar-panel");

const panelFondo = document.getElementById("panelFondo");


// ==========================================
// ABRIR PANEL
// ==========================================

function abrirPanel(idPanel) {

    panelesLaterales.forEach(function (panel) {
        panel.classList.remove("activo");
    });

    const panel = document.getElementById(idPanel);

    if (!panel) {
        return;
    }

    panel.classList.add("activo");

    if (panelFondo) {
        panelFondo.classList.add("activo");
    }

    document.body.classList.add("panel-abierto");

    panel.scrollTop = 0;
}


// ==========================================
// CERRAR PANELES
// ==========================================

function cerrarPaneles() {

    panelesLaterales.forEach(function (panel) {
        panel.classList.remove("activo");
    });

    if (panelFondo) {
        panelFondo.classList.remove("activo");
    }

    document.body.classList.remove("panel-abierto");
}


// ==========================================
// BOTONES LATERALES
// ==========================================

botonesLaterales.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const idPanel = boton.dataset.panel;

        abrirPanel(idPanel);

    });

});


// ==========================================
// BOTÓN "PREPARAR MI MOCHILA"
// ==========================================

botonesAbrirPanel.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const idPanel = boton.dataset.panel;

        abrirPanel(idPanel);

    });

});


// ==========================================
// BOTONES CERRAR
// ==========================================

botonesCerrarPanel.forEach(function (boton) {

    boton.addEventListener("click", function () {

        cerrarPaneles();

    });

});


// ==========================================
// CERRAR HACIENDO CLICK FUERA
// ==========================================

if (panelFondo) {

    panelFondo.addEventListener("click", function () {

        cerrarPaneles();

    });

}


// ==========================================
// CERRAR CON ESC
// ==========================================

document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {

        cerrarPaneles();

    }

});
