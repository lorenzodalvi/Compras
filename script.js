let cart = [];
let modalQt = 1;
let modalKey = 0;


const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);


camisaJson.map((item, index)=>{
    let camisaItem = c('.models .camisa-item').cloneNode(true);
    modalQt = 1;

    camisaItem.setAttribute('data-key', index);
    camisaItem.querySelector('.camisa-item--img img').src = item.img;
    camisaItem.querySelector('.camisa-item--name').innerHTML = item.name;
    camisaItem.querySelector('.camisa-item--desc').innerHTML = item.description;
    camisaItem.querySelector('.camisa-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    camisaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.camisa-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.camisaBig img').src = camisaJson[key].img;
        c('.camisaInfo h1').innerHTML = camisaJson[key].name;
        c('.camisaInfo--desc').innerHTML = camisaJson[key].description;
        c('.camisaInfo--actualPrice').innerHTML = `R$ ${camisaJson[key].price.toFixed(2)}`
        c('.camisaInfo--size.selected').classList.remove('.selected');
        cs('.pizzInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
                size.querySelector('span').innerHTML = camisaJson[key].sizes[sizeIndex];
            })

        c('.camisaInfo--qt').innerHTML = modalQt;

        c('.camisaWindowArea').style.opacity = 0;
        c('.camisaWindowArea').style.display = 'flex';
        setTimeout (()=>{
            c('.camisaWindowArea').style.opacity = 1;
        }, 200);
    });
    c('.camisa-area').append( camisaItem );
});


function closeModal(){
    c('.camisaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.camisaWindowArea').style.display = 'none';
    }, 500);
}
cs('.camisaInfo--cancelButton, .camisaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.camisaInfo--qtmenos').addEventListener('click', ()=>{
   if (modalQt>1){
        modalQt--;
    c('.camisaInfo--qt').innerHTML = modalQt;
    }
});

c('.camisaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.camisaInfo--qt').innerHTML = modalQt;
});

cs('.camisaInfo--size' ).forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.camisaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

cs('.camisaInfo--size1').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        
        c('.camisaInfo--size1.selected').classList.remove('selected');
        size.classList.add('selected');
        
    });
})





c('.camisaInfo--addButton').addEventListener('click', ()=>{

    let size = parseInt(c('.camisaInfo--size.selected').getAttribute('data-key'));
    
    
    let identifier = camisaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    }else {
    
    cart.push({
        identifier,
       id:camisaJson[modalKey].id,
        size, 
        qt:modalQt

    });
}
    updateCart()
    closeModal();

});


c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0) {
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
})



function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
      c('aside').classList.add('show');
      c('.cart').innerHTML = '';

      let subtotal = 0;
      let desconto = 0;
      let total = 0;


      for(let i in cart) {
        let camisaItem = camisaJson.find((item)=>item.id == cart[i].id);
            subtotal += camisaItem.price * cart[i].qt;


        let cartItem = c('.models .cart--item').cloneNode(true);

        let camisaSizeName;
        switch(cart[i].size){
            case 0:
                camisaSizeName = 'Batata';
                break;
            case 1:
                camisaSizeName = 'Polenta';
                break;
            case 2:
                camisaSizeName = 'Onion';  
                break;       


        }


        let camisaName = `${camisaItem.name} (${camisaSizeName})`;


        cartItem.querySelector('img').src = camisaItem.img;
        cartItem.querySelector('.cart--item-nome').innerHTML = camisaItem.name;
        cartItem.querySelector('.cart--item--qt').innerHTML = cart [i].qt;
        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
            if(cart[i].qt > 1){
                cart[i].qt--;
            } else{
                cart.splice(i,1);
            }
            updateCart();
        });
        cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
            cart[i].qt++;
            updateCart();
        });

        c('.cart').append(cartItem);
      }
      
      desconto = subtotal * 0.05;
      total = subtotal - desconto;

      c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
      c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
      c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}









