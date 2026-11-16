 const campoPesquisa = document.getElementById("pesquisar-aluno");
 const listaAlunos = document.getElementById("lista-alunos");

//  a funcao de pesuisa de escolher nesse caso filtrar 
campoPesquisa.addEventListener('input',function(){
 //aqui a parte pesquisa e campo pesquisa tudo menor, nesse caso o trim serve para nao ter espacos entre as palavras 
    let pesquisa=campoPesquisa.value.toLowerCase().trim();
    //aqui sao as linhas que a pesquisa deve seguir
    const linhas=document.querySelectorAll('tr');
//Nas linnhas para cada linha da funcao(linha) deve pegar na variavel dadosAluno-onde tem que trnaformar todos Elementos em menusculas

   linhas.forEach(function(linha){
        const dadosAluno = linha.textContent.toLowerCase();//a parte do if Else nao tenho tanta nocao
        if (dadosAluno.includes(pesquisa)) {//essa parte nao conheco
            linha.style.display="";
            
         } else {
             linha.style.display="none";
            
         }
     });
 });

