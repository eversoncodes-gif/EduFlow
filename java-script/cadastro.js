 //as duas variaveis sao as etapas. nesse caso usei let porue as etapas sempre mudam mas const 5 porque nao importa quantas mudancas acontecam o total de fases sao 5 
 let etapa = 1;
 const total = 5;
// //aqui sao as variaveis que vao ser usadas no codigo 
 const btnProx = document.getElementById('btnProx');//o botao de avancar
 const btnVoltar = document.getElementById('btnVoltar');//botao de voltar
 const jaEstudou = document.getElementById('jaEstudou');//qui e a parte onde os alunos recentes e antigos entram vamos usar para saber quantos alunos sao novos e quantos sao antigos.
 const campoAntigo = document.getElementById('campoAntigo');//aaqui os alunos que forem antigos na escola e estiverem a renovar
 const form = document.getElementById('formCadastro');

 //primeira parte a secao do estudou ou nao aqui 
 jaEstudou.addEventListener('change', () => {//o toogle e quem brinca com as classes trocadas
   campoAntigo.classList.toggle('bloco-condicional--visivel', jaEstudou.value === 'sim');
 });

//A funcao que permite trocar de seccao uma para outra nesse caso deixar uma com a clase fechada outra com a classe activa
 function atualizarProgresso(n) {
  //selecionar o elemento nesse caso a seccao e remover a classe ativa e adicionar a mesma
   document.querySelectorAll(".seccao").forEach(s=>s.classList.remove("seccao--ativa"));//aqui so tirar para a seccao ativa
  
   document.getElementById('s' + n).classList.add('seccao--ativa');// o s representa a seccao S1 nesse caaso adiciona a proxima seccao 
     
   /* aqui a parte da barra de progresso ainda estou a estudar a cena */
   document.querySelectorAll('.progresso__item').forEach((p, i) => {
    p.classList.toggle('progresso__item--ativo', i < n);
    });

   btnVoltar.style.display = n === 1 ? 'none' : 'block';
   btnProx.style.display = n === total ? 'none' : 'block';

   if (n === total) {
     const nome = document.getElementById('nome').value;
     const classe = document.getElementById('classe').value;
     const enc = document.getElementById('encNome').value;
     const tel = document.getElementById('encTel').value;
    document.getElementById('resumo').innerHTML = `
       <strong>${nome || '(sem nome)'}</strong> - ${classe || ''}<br>
       Encarregado: ${enc} - ${tel}
     `;
   }
 }

 btnProx.addEventListener('click', () => {
 const seccaoAtual = document.getElementById('s' + etapa);
   if (!seccaoAtual.checkValidity()) {
     seccaoAtual.reportValidity();
     return;
   }
   if (etapa < total) {
     etapa++;
     atualizarProgresso(etapa);
   }
 });

 btnVoltar.addEventListener('click', () => {
   if (etapa > 1) {
     etapa--;
     atualizarProgresso(etapa);
   }
 });//aqui tudo isto sao ainda os botoes e acoes do formulario, quando clico ali aparece isto!!!! cena asssims

 form.addEventListener('submit', (e) => {
   e.preventDefault();// aqui ate e interresante pois se trata da submissao dos ficheiros

  
//aqui sao as variaveis de validacao do formulario acima
   const nome=document.getElementById("nome");
   const bi=document.getElementById('bi');
   const nuit=document.getElementById('nuit');
   const classe=document.getElementById('classe');

   const dados = {
     id: Date.now(),
     nome: nome.value,
     bi: bi.value,
     nuit: nuit.value,
     classe: classe.value,
     encNome: encNome.value,
     encTel: encTel.value,
     encBi: encBi.value,
     jaEstudou: jaEstudou.value,
     origem: 'Online',
     estado: 'Pendente',
     data: new Date().toLocaleString('pt-MZ')
   };

   const lista = JSON.parse(localStorage.getItem('eduflow') || '[]');
   lista.push(dados);
   localStorage.setItem('eduflow', JSON.stringify(lista));

   alert('Pré-matrícula enviada! Vai aparecer na dashboard como Pendente.');
   window.location.href = 'dashboard.html';
 });