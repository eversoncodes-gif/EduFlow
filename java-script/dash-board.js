const campoPesquisa = document.getElementById("pesquisar-aluno");
const listaAlunos = document.getElementById("lista-alunos");

campoPesquisa.addEventListener("input", function () {
    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    const linhas = listaAlunos.querySelectorAll("tr");

    linhas.forEach(function (linha) {
        const dadosAluno = linha.textContent.toLowerCase();

        if (dadosAluno.includes(pesquisa)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
});