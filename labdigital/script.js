let mixtures = {
    'H2O': { H: 0, O: 0 },
    'CO2': { C: 0, O: 0 },
    'NaCl': { Na: 0, Cl: 0 }
};

function addElement(experiment, element) {
    if (experiment === 'H2O') {
        if (element === 'H2') mixtures['H2O'].H++;
        if (element === 'O2') mixtures['H2O'].O++;
    } else if (experiment === 'CO2') {
        if (element === 'C') mixtures['CO2'].C++;
        if (element === 'O2') mixtures['CO2'].O++;
    } else if (experiment === 'NaCl') {
        if (element === 'Na') mixtures['NaCl'].Na++;
        if (element === 'Cl') mixtures['NaCl'].Cl++;
    }
}

function showResult(experiment) {
    let resultText = '';
    let imageUrl = '';

    if (experiment === 'H2O') {
        if (mixtures['H2O'].H > 0 && mixtures['H2O'].O > 0) {
            
            resultText = 'Você misturou Hidrogênio e Oxigênio. Resultado: Água (H₂O)';
            imageUrl = 'https://latoqualitas.com.br/wp-content/uploads/2022/04/drop-of-water-g1c96b14dd_1920.jpg' ; 
        } else {
            resultText = 'Adicione Hidrogênio e Oxigênio para ver o resultado.';
        }
    } else if (experiment === 'CO2') {
        if (mixtures['CO2'].C > 0 && mixtures['CO2'].O > 1) {
            resultText = 'Você misturou Carbono e Oxigênio. Resultado: Dióxido de Carbono (CO₂)';
            imageUrl = 'https://static.significados.com.br/foto/dioxido-de-carbono-og.jpg'; 
        } else {
            resultText = 'Adicione Carbono e Oxigênio para ver o resultado.';
        }
    } else if (experiment === 'NaCl') {
        if (mixtures['NaCl'].Na > 0 && mixtures['NaCl'].Cl > 0) {
            resultText = 'Você misturou Sódio e Cloro. Resultado: Sal (NaCl)';
            imageUrl = 'https://static.itdg.com.br/images/auto-auto/30c63d4f30b84c671c955b200fd6fd6b/do-que-o-sal-e-capaz.jpg'; 
            resultText = 'Adicione Sódio e Cloro para ver o resultado.';
        }
    }

    const resultElement = document.getElementById(`result${experiment}`);
    resultElement.innerText = resultText;

    
    const imgElement = resultElement.querySelector('img');
    if (imgElement) {
        resultElement.removeChild(imgElement);
    }

   
    if (imageUrl) {
        const newImg = document.createElement('img');
        newImg.src = imageUrl;
        newImg.alt = experiment; 
        newImg.style.width = '100px'; 
        newImg.style.height = 'auto'; 
        resultElement.appendChild(newImg);
    }
}