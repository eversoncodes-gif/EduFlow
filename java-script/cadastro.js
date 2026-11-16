
// ==========================================
// 1. CONTROLO DAS ETAPAS
// ==========================================

let etapa = 1;
const total = 5;

//aqui ficam as funcoes principais de o formulario e os botoes de avanca e regressa
// ==========================================
// 2. ELEMENTOS PRINCIPAIS
// ==========================================

const form = document.getElementById('formCadastro');//formulario de cadastro

const btnProx = document.getElementById('btnProx');//botao de avancar
const btnVoltar = document.getElementById('btnVoltar');//botao de regressar

const jaEstudou = document.getElementById('jaEstudou');//campo de selecao de ja estudou util para saber untos fazem matriculas w quantos fazem cadastro
const campoAntigo = document.getElementById('campoAntigo');//campo condicional que aparece quando o aluno ja estudou

const resumo = document.getElementById('resumo');//campo que mostra o resumo do cadastro na ultima etapa


// ==========================================
// 3. DADOS DO ALUNO
// ==========================================

const nome = document.getElementById('nome');//campo de nome
const apelido = document.getElementById('apelido');//campo de apelido
const nasc = document.getElementById('nasc');//campo de data de nascimento
const sexo = document.getElementById('sexo');//campo de sexo
const natural = document.getElementById('natural');//campo de naturalidade
const bi = document.getElementById('bi');//campo de bilhete de identidade
const nuit = document.getElementById('nuit');//campo de NUIT
const classe = document.getElementById('classe');//campo de classe


// ==========================================
// 4. DADOS DO ENCARREGADO
// ==========================================

const encNome = document.getElementById('encNome');//campo de nome do encarregado
const parentesco = document.getElementById('parentesco');//campo de parentesco
const encTel = document.getElementById('encTel');//campo de telefone do encarregado
const encBi = document.getElementById('encBi');//campo de bilhete de identidade do encarregado
const maeNome = document.getElementById('maeNome');//campo de nome da mãe


// ==========================================
// 5. PERCURSO ESCOLAR
// ==========================================

const classeAntiga = document.getElementById('classeAntiga');//campo de classe antiga
const turmaAntiga = document.getElementById('turmaAntiga');//campo de turma antiga
const ultimaEscola = document.getElementById('ultimaEscola');//campo de última escola


// ==========================================
// 6. DOCUMENTOS,a parte onde tem as variaveis respoonaveis poor recolher documentos dos alunos
// ==========================================

const docBi = document.getElementById('docBi');//campo de bi
const docCertidao = document.getElementById('docCertidao');//campo de certidão
const docFotos = document.getElementById('docFotos');//campo de fotos
const docCertificado = document.getElementById('docCertificado');//campo de certificado


// ==========================================
// 7. OUTRAS INFORMAÇÕES
// ==========================================

const endereco = document.getElementById('endereco');//campo de endereco
const saude = document.getElementById('saude');//campo de saude
const confirmo = document.getElementById('confirmo');//campo de confirmacao

// ==========================================
// 8. PERCURSO ESCOLAR CONDICIONAL
// ==========================================

jaEstudou.addEventListener('change', () => {

    campoAntigo.classList.toggle(
        'bloco-condicional--visivel',
        jaEstudou.value === 'sim'
    );

});


// ==========================================
// 9. VALIDAR OS CAMPOS DE CADA ETAPA
// ==========================================

function validarSecao(secao) {

    const campos = secao.querySelectorAll(
        'input, select, textarea'
    );

    for (const campo of campos) {

        // Os campos escondidos não precisam de validação
        if (campo.disabled) continue;

        // Ignorar campos escondidos por condições
        if (campo.closest('.bloco-condicional') &&
            !campo.closest('.bloco-condicional--visivel')) {
            continue;
        }

        if (!campo.checkValidity()) {
            campo.reportValidity();
            return false;
        }

    }

    return true;
}


// ==========================================
// 10. ATUALIZAR A NAVEGAÇÃO E O PROGRESSO
// ==========================================

function atualizarProgresso(n) {

    // Esconder todas as secções
    document.querySelectorAll('.seccao').forEach(secao => {
        secao.classList.remove('seccao--ativa');
    });

    // Mostrar a secção atual
    document.getElementById('s' + n).classList.add('seccao--ativa');

    // Atualizar barra de progresso
    document.querySelectorAll('.progresso__item').forEach((item, i) => {

        item.classList.toggle(
            'progresso__item--ativo',
            i < n
        );

    });

    // Controlar botões
    btnVoltar.style.display = n === 1 ? 'none' : 'block';
    btnProx.style.display = n === total ? 'none' : 'block';

    // Mostrar resumo na última etapa
    if (n === total) {
        atualizarResumo();
    }

}


// ==========================================
// 11. CONSTRUIR O RESUMO
// ==========================================

function atualizarResumo() {

    // Limpar o resumo anterior
    resumo.textContent = '';

    const titulo = document.createElement('strong');

    titulo.textContent = nome.value || '(sem nome)';

    const informacao = document.createElement('p');

    informacao.textContent =
        `Classe: ${classe.value || 'Não selecionada'}
         | Encarregado: ${encNome.value}
         | Telefone: ${encTel.value}`;

    resumo.append(titulo, informacao);

}


// ==========================================
// 12. BOTÃO PRÓXIMO
// ==========================================

btnProx.addEventListener('click', () => {

    const seccaoAtual = document.getElementById('s' + etapa);

    if (!validarSecao(seccaoAtual)) {
        return;
    }

    if (etapa < total) {

        etapa++;

        atualizarProgresso(etapa);

    }

});


// ==========================================
// 13. BOTÃO VOLTAR
// ==========================================

btnVoltar.addEventListener('click', () => {

    if (etapa > 1) {

        etapa--;

        atualizarProgresso(etapa);

    }

});


// ==========================================
// 14. RECOLHER E ORGANIZAR OS DADOS
// ==========================================

function recolherDados() {

    return {

        id: Date.now(),

        // Dados do aluno
        aluno: {
            nome: nome.value.trim(),
            apelido: apelido.value.trim(),
            nascimento: nasc.value,
            sexo: sexo.value,
            naturalidade: natural.value.trim(),
            bi: bi.value.trim(),
            nuit: nuit.value.trim(),
            classePretendida: classe.value
        },

        // Dados do encarregado
        encarregado: {
            nome: encNome.value.trim(),
            parentesco: parentesco.value,
            telefone: encTel.value.trim(),
            bi: encBi.value.trim(),
            nomeMae: maeNome.value.trim()
        },

        // Percurso escolar
        percurso: {
            jaEstudou: jaEstudou.value,
            classeAnterior: jaEstudou.value === 'sim' ? classeAntiga.value : '',
            turmaAnterior: jaEstudou.value === 'sim' ? turmaAntiga.value.trim() : '',
            ultimaEscola: ultimaEscola.value.trim()
        },

        // Documentos assinalados
        documentos: {
            bi: docBi.checked,
            certidao: docCertidao.checked,
            fotografias: docFotos.checked,
            certificado: docCertificado.checked
        },

        // Outras informações
        outrasInformacoes: {
            endereco: endereco.value.trim(),
            saude: saude.value.trim()
        },

        origem: 'Online',
        estado: 'Pendente',
        data: new Date().toLocaleString('pt-MZ')

    };

}


// ==========================================
// 15. ENVIAR PRÉ-MATRÍCULA
// ==========================================

form.addEventListener('submit', (e) => {

    e.preventDefault();

    // Confirmar que a última etapa está válida
    const ultimaSecao = document.getElementById('s5');

    if (!validarSecao(ultimaSecao)) {
        return;
    }

    // Recolher os dados
    const dados = recolherDados();

    // Ler os registos existentes
    let lista;

    try {

        lista = JSON.parse(localStorage.getItem('eduflow') || '[]');

        if (!Array.isArray(lista)) {
            lista = [];
        }

    } catch (erro) {

        alert('Não foi possível ler os registos guardados.');
        return;

    }

    // Adicionar o novo cadastro
    lista.push(dados);

    // Guardar no navegador
    try {

        localStorage.setItem('eduflow', JSON.stringify(lista));

    } catch (erro) {

        alert('Não foi possível guardar o cadastro neste navegador.');
        return;

    }

    alert('Pré-matrícula registada no protótipo!');

    window.location.href = 'dashboard.html';

});


// ==========================================
// 16. ESTADO INICIAL
// ==========================================

atualizarProgresso(etapa);
