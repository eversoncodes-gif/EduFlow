
// 1. Selecionar os elementos do HTML
const campoPesquisa = document.getElementById("pesquisar-aluno");
const listaAlunos = document.getElementById("lista-alunos");


// 2. Ler os alunos guardados no localStorage
function obterAlunos() {
    try {
        const dadosGuardados = localStorage.getItem("eduflow");

        // Se ainda não houver alunos, devolve uma lista vazia
        if (!dadosGuardados) {
            return [];
        }

        const alunos = JSON.parse(dadosGuardados);

        // Confirmar que os dados são uma lista
        if (!Array.isArray(alunos)) {
            return [];
        }

        return alunos;

    } catch (erro) {
        console.error("Erro ao ler os alunos:", erro);
        return [];
    }
}


// 3. Mostrar os alunos na tabela
function mostrarAlunos() {

    // Limpar a tabela antes de inserir os dados
    listaAlunos.textContent = "";

    const alunos = obterAlunos();

    // Percorrer cada aluno da lista
    alunos.forEach(function(dados, indice) {

        // Criar uma nova linha
        const linha = document.createElement("tr");

        // Obter informações do aluno
        const nome = `${dados.aluno.nome} ${dados.aluno.apelido}`.trim();

        const classe = dados.aluno.classePretendida || "—";

        const turma = dados.percurso.turmaAnterior || "—";

        const estado = dados.estado || "Pendente";

        // Criar as células da tabela
        const numero = document.createElement("td");
        numero.textContent = indice + 1;

        const celulaNome = document.createElement("td");
        celulaNome.textContent = nome;

        const celulaClasse = document.createElement("td");
        celulaClasse.textContent = classe;

        const celulaTurma = document.createElement("td");
        celulaTurma.textContent = turma;

        const celulaEstado = document.createElement("td");

        const etiquetaEstado = document.createElement("span");

        etiquetaEstado.textContent = estado;

        const estadoNormalizado = estado.toLowerCase();

        if (estadoNormalizado === "activo" || estadoNormalizado === "ativo") {
            etiquetaEstado.className = "ativo";
        } else if (estadoNormalizado === "inativo") {
            etiquetaEstado.className = "inativo";
        } else {
            etiquetaEstado.className = "pendente";
        }

        celulaEstado.append(etiquetaEstado);

        const celulaAcoes = document.createElement("td");
        celulaAcoes.textContent = "—";

        // Colocar todas as células dentro da linha
        linha.append(
            numero,
            celulaNome,
            celulaClasse,
            celulaTurma,
            celulaEstado,
            celulaAcoes
        );

        // Colocar a linha dentro da tabela
        listaAlunos.append(linha);
    });
}


// 4. Pesquisa de alunos
campoPesquisa.addEventListener("input", function() {

    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    // Selecionar apenas as linhas dos alunos
    const linhas = listaAlunos.querySelectorAll("tr");

    linhas.forEach(function(linha) {

        const dadosAluno = linha.textContent.toLowerCase();

        if (dadosAluno.includes(pesquisa)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }

    });

});


// 5. Executar quando a dashboard abrir
mostrarAlunos();
