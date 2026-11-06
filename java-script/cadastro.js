//as duas variaveis sao as etapas. nesse caso usei let porue as etapas sempre mudam mas const 5 porque nao importa quantas mudancas acontecam o total de fases sao 5 
let etapa = 1;
const total = 5;
//
const btnProx = document.getElementById('btnProx');
const btnVoltar = document.getElementById('btnVoltar');
const jaEstudou = document.getElementById('jaEstudou');
const campoAntigo = document.getElementById('campoAntigo');
const form = document.getElementById('formCadastro');

//nao percebi nada do codigo
jaEstudou.addEventListener('change', () => {
  campoAntigo.classList.toggle('bloco-condicional--visivel', jaEstudou.value === 'sim');
});

//meu brada nao percebi nada !!!!!!!
function atualizarProgresso(n) {
  document.querySelectorAll('.seccao').forEach(s => s.classList.remove('seccao--ativa'));
  document.getElementById('s' + n).classList.add('seccao--ativa');
  
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
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
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