let quantidade = 0;
let totalItens = 1;
let valorTotal = 0;

function criarCardLoja(card){
let contaner_loja = document.querySelector('.contaner_loja');
 
    let card_gamer = document.createElement('div');
        card_gamer.setAttribute('class', 'card_gamer');

            let card_img = document.createElement('figure');
                card_img.setAttribute('class', 'card_img');
                    let img = document.createElement('img');
                        img.src = card.img;
                card_img.appendChild(img);
        card_gamer.appendChild(card_img); 
            let card_body = document.createElement('div');
                card_body.setAttribute('class', 'card_body');
                    let card_categoria = document.createElement('span');
                        card_categoria.setAttribute('class', 'card_categoria');
                        card_categoria.innerHTML = card.tag[0];
                card_body.appendChild(card_categoria);
                    let card_titulo = document.createElement('h3');
                        card_titulo.setAttribute('class', 'card_titulo');
                        card_titulo.innerHTML = card.nameItem;
                card_body.appendChild(card_titulo);
                    let card_descricao = document.createElement('p');
                        card_descricao.setAttribute('class', 'card_descricao');
                        card_descricao.innerHTML = card.description;
                card_body.appendChild(card_descricao);
                    let card_preco = document.createElement('span');
                        card_preco.setAttribute('class', 'card_preco');
                        let value = card.value;
                        card_preco.innerHTML = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                card_body.appendChild(card_preco);
                    let card_button = document.createElement('button');
                        card_button.setAttribute('class', 'card_button'); 
                        card_button.id = 'card_'+card.id;
                        card_button.innerHTML = 'Adicionar ao carrinho';
                card_body.appendChild(card_button);

    // Adiciona item ao carrinho e atualizar qt total e preço               
    card_button.addEventListener('click', function(e){
        let idCard = e.target.id;
        let id = parseInt(idCard[5]);
        let itemCarrinho = procurarCard(id);
        if(verificaCarrinho(id)) {
            totalItens = document.querySelector(`#i_${id}`).innerHTML[0];
            totalItens++;
            document.querySelector(`#i_${id}`).innerHTML = `${totalItens}x`;
        }else{
            totalItens = 1;
            criarItemCarrinho(itemCarrinho);
        }
        quantidade ++;
        valorTotal += itemCarrinho.value;
        valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.querySelector('#quantidadeItens').innerHTML = `${quantidade}`;
        document.querySelector('#valorTotal').innerHTML = `R$ ${valorTotal.toFixed(2)}`;
    })

        card_gamer.appendChild(card_body); 
contaner_loja.appendChild(card_gamer); 
}

function criarItemCarrinho(itemCarrinho){
    let carrinho_lista_itens = document.querySelector('.carrinho_lista_itens');
        let carrinho_item = document.createElement('div');
            carrinho_item.setAttribute('class', 'carrinho_item');
            carrinho_item.id = 'carrinho_'+itemCarrinho.id;
                let carrinho_card_img = document.createElement('figure');
                    carrinho_card_img.setAttribute('class', 'carrinho_card_img');
                        let img = document.createElement('img');
                            img.src = itemCarrinho.img;
                        let span = document.createElement('span');
                            span.id = `i_${itemCarrinho.id}`;
                            span.innerHTML = `${totalItens}x`
                    carrinho_card_img.appendChild(img);
                    carrinho_card_img.appendChild(span);
            carrinho_item.appendChild(carrinho_card_img);
            
                let carrinho_card_body = document.createElement('div');
                    carrinho_card_body.setAttribute('class', 'carrinho_card_body');
                        let carrinho_card_titulo = document.createElement('h3');
                            carrinho_card_titulo.setAttribute('class', 'carrinho_card_titulo')
                            carrinho_card_titulo.innerHTML = itemCarrinho.nameItem;
                    carrinho_card_body.appendChild(carrinho_card_titulo);
                        let carrinho_card_preco = document.createElement('span');
                            carrinho_card_preco.setAttribute('class', 'carrinho_card_preco');
                            carrinho_card_preco.innerHTML = itemCarrinho;
                    carrinho_card_body.appendChild(carrinho_card_preco);
                        let carrinho_card_button = document.createElement('button');
                            carrinho_card_button.setAttribute('class', 'carrinho_card_button');
                            carrinho_card_button.innerHTML =  'Remover produto';
                    carrinho_card_body.appendChild(carrinho_card_button);
                    
            carrinho_item.appendChild(carrinho_card_body);
        carrinho_lista_itens.appendChild(carrinho_item);  
        

    // Remove item do carrinho  
    carrinho_card_button.addEventListener('click', function(e){
        if(verificaCarrinho(itemCarrinho.id)) {
            totalItens = document.querySelector(`#i_${itemCarrinho.id}`).innerHTML[0];
            totalItens--;
            document.querySelector(`#i_${itemCarrinho.id}`).innerHTML = `${totalItens}x`;
            quantidade --;
            valorTotal -= itemCarrinho.value;
            valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.querySelector('#quantidadeItens').innerHTML = `${quantidade}`;
            document.querySelector('#valorTotal').innerHTML = `R$ ${valorTotal.toFixed(2)}`;
            if(totalItens == 0){
                carrinho_item.remove();
            }
        }
    })

}

function carregarPaginaIndex() {
    for (let i = 0; i < data.length; i++) {
        let card = data[i];
        criarCardLoja(card);
    }
}
carregarPaginaIndex();



function verificaCarrinho(id){
    let cardId = document.querySelector('#carrinho_'+id);
    if(cardId == null) {
        return false;
    }else {
        return true;
    }
}

function procurarCard(id) {
    for(let i = 0; i < data.length; i++) {
        let card = data[i];
        if(card.id == id) {
            return card;
        }
    }
    return 'Card não encontrado';
}

function pesquisarCardNome(nome) {
    for(let i = 0; i < data.length; i++) {
        let card = data[i];
        if((card.nameItem).includes(nome)) {
            return card;
        }
    }
    return 'Card não encontrado';
}

function pesquisarCardCategoria(categoria) {
    let listCards = [];
    for(let i = 0; i < data.length; i++) {
        let card = data[i];
        if((card.tag).includes(categoria)) {
             listCards.push(card);
            
        }
    }
    return listCards;
}
function removeTudo(){
    let cardsTotal = document.querySelectorAll('.card_gamer');
    for(let i = 0; i < cardsTotal.length; i++) {
        document.querySelector('.card_gamer').remove()
    }
}

// Seleciona por categoria
let tagsA = document.querySelectorAll('a');
    tagsA.forEach(function(a) {
    a.addEventListener('click', function(e){
        e.preventDefault()
        // let pesquisa = document.querySelector('#campoPesquisa').value;
        
        let cardPesquisa = pesquisarCardCategoria(a.text);
        if(cardPesquisa.length > 0) {
        removeTudo();
        for(let i = 0; i < data.length; i++) {
            
            criarCardLoja(cardPesquisa[i])
        }
        }else{
            carregarPaginaIndex();
        }
    })
});

// Seleciona por nome
let buttonPesq = document.querySelector('.carrinho_pesquisa_input button');
    buttonPesq.addEventListener('click', function(e){
        e.preventDefault()
        let pesquisa = document.querySelector('#campoPesquisa').value;
        
        let cardPesquisa = pesquisarCardNome(pesquisa);
        // console.log(card)
        if(cardPesquisa != 'Card não encontrado') {
        removeTudo();
        criarCardLoja(cardPesquisa)
        }
        
    })




