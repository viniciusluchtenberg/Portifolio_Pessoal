botao = document.getElementById("btn");
const select = document.getElementById("selecione");


select.addEventListener("change", function () {
    const texto = document.getElementById("DigiteAPI");

    if (select.value === "Consulta CEP") {
        texto.innerHTML = "Digite aqui seu CEP:";
    } 
    else if (select.value === "Consulta CNPJ") {
        texto.innerHTML = "Digite aqui seu CNPJ:";
    } 
    else if (select.value === "Consulta Clima") {
        texto.innerHTML = "Digite aqui sua cidade:";
    }
});

botao.addEventListener("click" , function (event) {
    event.preventDefault();

    var selecionado = document.getElementById("selecione");

    if (selecionado.value === "Consulta CEP") {

        async function BuscarCEP() {
            const CEP = document.getElementById('valorApi').value

            const response = await fetch(
                `https://brasilapi.com.br/api/cep/v1/${CEP}`
            );

            const resposta = await response.json();

            document.getElementById("resultado").innerHTML = `
            <p><strong>CEP:</strong> ${resposta.cep}</p>
            <p><strong>Estado:</strong> ${resposta.state}</p>
            <p><strong>Cidade:</strong> ${resposta.city}</p>
            <p><strong>Bairro:</strong> ${resposta.neighborhood}</p>
            <p><strong>Rua:</strong> ${resposta.street}</p>
            `;  
        }

        BuscarCEP();

    } else if(selecionado.value === "Consulta CNPJ") {
        
        async function BuscarCNPJ() {
            const CNPJ = document.getElementById('valorApi').value

            const response = await fetch(
                `https://brasilapi.com.br/api/cnpj/v1/${CNPJ}`
            );

            const resposta = await response.json();

            document.getElementById("resultado").innerHTML = `
            <p><strong>CNPJ:</strong> ${resposta.cnpj}</p>
            <p><strong>Razão Social:</strong> ${resposta.razao_social}</p>
            <p><strong>Nome Fantasia:</strong> ${resposta.nome_fantasia}</p>
            <p><strong>Logradouro:</strong> ${resposta.logradouro}</p>
            <p><strong>Municipio:</strong> ${resposta.municipio}</p>
            <p><strong>Descrição Situação Cadastral:</strong> ${resposta.descricao_situacao_cadastral}</p>
            `;  
        }

        BuscarCNPJ();

    } else {

        async function BuscarClima() {
            const Cidade = document.getElementById('valorApi').value

            const response = await fetch(
                `https://brasilapi.com.br/api/cptec/v1/cidade/${Cidade}`
            );

            const resposta = await response.json();

            const idCidade = resposta[0].id;
            
            const responseID = await fetch(
                `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idCidade}`
            );

            const respostaID = await responseID.json();

            const climaHoje = respostaID.clima[0];

            document.getElementById("resultado").innerHTML = `
            <p><strong>Cidade:</strong> ${respostaID.cidade}</p>
            <p><strong>Estado:</strong> ${respostaID.estado}</p>
            <p><strong>Data:</strong> ${climaHoje.data}</p>
            <p><strong>Condição Climática:</strong> ${climaHoje.condicao_desc}</p>
            <p><strong>Mínima:</strong> ${climaHoje.min}</p>
            <p><strong>Máxima:</strong> ${climaHoje.max}</p>
            `;
        }

        BuscarClima();

    }
    }
)