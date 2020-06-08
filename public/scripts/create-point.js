const urlBaseAPI = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

function fechOptionsSelect(url, selectOptions, selectDisabled = null){    
    fetch(url)
    .then( res => res.json() )
    .then( parans => {

        for(const paran of parans){
            if(selectDisabled != null) {
                selectOptions.innerHTML += `<option value="${paran.nome}">${paran.nome}</option>`;
            } else {
                selectOptions.innerHTML += `<option value="${paran.id}">${paran.nome}</option>`;
            }                
        }   
        
        (selectDisabled != null) ? selectDisabled.disabled = false : '';
    } );
}

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    const url = urlBaseAPI;
    
    fechOptionsSelect(url, ufSelect);
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = urlBaseAPI + `/${ufValue}/municipios`;

    citySelect.innerHTML = "<option>Selecione a Cidade</option>";
    citySelect.disabled = true;
    
    fechOptionsSelect(url, citySelect, citySelect);
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities);

// Items de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    // adicionar ou remover uma classe javascript
    itemLi.classList.toggle("selected");
    const itemId = event.target.dataset.id;
    
    // verificar se existem items selecionados, se sim
    // pegar os items selecionados
    
    const alreadySelected = selectedItems.findIndex( item => item == itemId );
    
    // se já estiver selecionado, tirar da seleção
    (alreadySelected >= 0) ? selectedItems = selectedItems.filter(item => item != itemId) : // tirar da selecao
                             selectedItems.push(itemId); // se não estiver selecionado, adicionar à seleção    

    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems;
}