const cart=[];
const dialog=document.querySelector('#cart-dialog');
const money=value=>new Intl.NumberFormat('uk-UA').format(value)+' ₴';
function renderCart(){
 document.querySelector('#cart-count').textContent=cart.reduce((sum,item)=>sum+item.qty,0);
 const list=document.querySelector('#cart-items');list.replaceChildren();
 if(!cart.length){const li=document.createElement('li');li.textContent='Кошик поки порожній. Обери рослину в каталозі.';list.append(li);}
 cart.forEach(item=>{const li=document.createElement('li');li.textContent=`${item.name} × ${item.qty} — ${money(item.price*item.qty)}`;list.append(li);});
 document.querySelector('#cart-total').textContent='Разом: '+money(cart.reduce((sum,item)=>sum+item.price*item.qty,0));
 document.querySelector('#cart-clear').disabled=!cart.length;
}
let noticeTimer;
document.querySelectorAll('.add').forEach(button=>button.addEventListener('click',()=>{
 const item=cart.find(item=>item.name===button.dataset.name);
 if(item)item.qty++;else cart.push({name:button.dataset.name,price:Number(button.dataset.price),qty:1});
 renderCart();const notice=document.querySelector('#status');notice.textContent='Додано до демонстраційного кошика';notice.style.display='block';clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.style.display='none',2400);
}));
document.querySelector('#cart-open').addEventListener('click',()=>{renderCart();dialog.showModal();});
document.querySelector('#cart-close').addEventListener('click',()=>dialog.close());
document.querySelector('#cart-clear').addEventListener('click',()=>{cart.length=0;renderCart();});
renderCart();
