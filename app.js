let questions = [];
let current = 0;
let answers = {};

const API = "http://localhost/simulado/api.php?action=";

async function start() {
    console.log("Iniciando...");

    document.getElementById("quiz").style.display = "block";

    try {
        let res = await fetch(API + "questions");
        let data = await res.json();

        console.log("Dados:", data);

        if (!data || data.length === 0) {
            alert("Nenhuma pergunta encontrada!");
            return;
        }

        questions = data;
        current = 0;

        render();

    } catch (e) {
        console.error("Erro:", e);
    }
}

function render() {
    let q = questions[current];

    document.getElementById("question").innerText = q.question_text;

    let html = "";

    ["option_a","option_b","option_c","option_d"].forEach((opt, i) => {
        let selected = answers[q.id] == i ? "selected" : "";

        html += `<div class="option ${selected}" onclick="select(${q.id}, ${i})">
            ${q[opt]}
        </div>`;
    });

    document.getElementById("options").innerHTML = html;
}

function select(id, i) {
    answers[id] = i;
    render();
}

function next() {
    if (current < questions.length - 1) {
        current++;
        render();
    } else {
        finish();
    }
}

function prev() {
    if (current > 0) {
        current--;
        render();
    }
}

async function finish() {
    let res = await fetch(API + "submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
    });

    let result = await res.json();

    document.getElementById("quiz").style.display = "none";

    document.getElementById("result").innerText =
        `Acertos: ${result.correct} | Erros: ${result.wrong}`;
}