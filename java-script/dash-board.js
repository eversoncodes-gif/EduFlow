 const campoPesquisa = document.getElementById("pesquisar-aluno");
 const listaAlunos = document.getElementById("lista-alunos");

//  a funcao de pesuisa de escolher nesse caso filtrar 
campoPesquisa.addEventListener('input',function(){
 //aqui a parte pesquisa e campo pesquisa tudo menor, nesse caso o trim serve para nao ter espacos entre as palavras 
    let pesquisa=campoPesquisa.value.toLowercase().trim();
    //aqui sao as linhas que a pesquisa deve seguir
    const linhas=document.querySelectorAll('tr');
    //para cada linha deve pegar os dados e filtrar os resultados 
    linhas.forEach(function(linha){
        const
    })
});

console.log(campoPesquisa)