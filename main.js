/* HTML DEN GELENLER: */

const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products")
const basketBtn = document.querySelector("#basket-btn");
const closeBtn = document.querySelector("#close-btn")
const modal = document.querySelector(".modal-wrapper");
const basketList = document.querySelector("#list");
const totalInfo = document.querySelector(".total");
const aramaBtn = document.querySelector("#arama-btn");
const aramaInput = document.querySelector(".arama");

/*!! olay izleyicileri */

/* html'in yüklenme anını izleyen bir olay izleyicisi yazarız.  */
document.addEventListener("DOMContentLoaded" , () =>{
    fetchCategories();
    fetchProducts();
})// sayfa yüklenme anı tamamlandığında fetchCategories function ı çalıştır diyerek çağırdık.her seferinde 1 function çalışır yanına function ekleyemeyiz. bu yüzden bir function içinde iki ayrıfunction çalıştrımak daaha doğru.
//burada function içinde yazılan functionların sırası önemli değil; çünkü ikisi de asenkron olduğundan aynı anda çalışacaktır.

aramaBtn.addEventListener("click", () =>{
        aramaInput.classList.add('active');
});
document.addEventListener('click',(e) =>{
    if(e.target.id ==='close-btn')
        {
            aramaInput.classList.remove('active')
        }
});


/* kategori bilgilerini al
1) api'ye istek at
2) gelen veriyi işle
3) verileri ekrana basacak function ı çalıştır
4) hata oluşursa kullancıyı bilgilendir. */

const baseUrl = 'https://fakestoreapi.com';

function fetchCategories() {
    fetch(`${baseUrl}/products/categories`)

    .then((response) =>{
        return response.json(); //veri gelirse veriyi işleyeceğiz bu sayede. buradaki .then üstten işlediği veriyi bir alt basmağa gönderir.
    })
    .then(renderCategories)

    .catch((error) =>{
        alert('kategoriler alınırken bir hata oluştu.')
    })
}
/* .then((response) => response.json()); bu şekilde yazdığımızda sanki return yazmışız gibi function çalışır tek satırlık function larda böyle süslü parantezler atılarak da yazabiliyorduk*/ 

/* her bir kategori için ekrana kart oluşturma function ı */
function renderCategories(categories){

    console.log(categories)
    categories.forEach((category) =>{ 
    //1) her bir kategori için bir div oluştur

    const categoryDiv = document.createElement("div");

    //2) dive class adı ekle
    categoryDiv.classList.add("category")
    //3) içindeki html ye erişeceğiz

    const randomNum= Math.round(Math.random()*1000)    
    categoryDiv.innerHTML=`
    <img src="https://picsum.photos/300/300?r=${randomNum}"> 
    <h2>${category}</h2>
    `
    //4) html ye gönderme
    categoryList.appendChild(categoryDiv)
});
}

/* ürünlerin verisini çekenfonksiyon */

//Yukarıda .then .catch kullanarak veri tabanından gelmesi zaman alan verilerin gelmesinin beklenmesi ve verilerin alınması için kullandığımız functionlardan birisidir.
//.then .catch yapısının bir benzeri de async await yapısıdır.Ama 1 farkı var o da hata işleme yapısı yoktur.
//işte bu yüzden async await ile yazılan function da olası bir hata oluşursa göstermesi için try catch yapısı kullanırız.

/* ürünlerin verisini çeken fonksiyon */


let data;

async function fetchProducts(){
    
    try{
//apiye istek at
const response = await fetch(`${baseUrl}/products`);
    
//gelen cevabı işle
data = await response.json();// başına await yazmazsan response.json() şeklinde verinin paketten çıkarılması da zaman alır.await yazarak bu verinin paketten çıkmasını bekle demektir.

/* ekrana bas */
renderProducts(data)
    }
    catch(error){
        alert('ürünleri alırken bir hata oluştu.')

    }
       
}


/* birden fazla url e istek atıyorsak async await 
tek function içinde tek url e istek atıyorsam .then .catch */


/* ürünleri ekrana basar */

// function renderProducts(products){

//     const cardHTML = products.map(() => 'yeni kart');//ürünler dizisini döndüm, herbiri için 'yeni kart' yazan dizi oluşturduk.
//     console.log(cardHTML)
// }

function renderProducts(products){
console.log(products)

    /* her bir ürün için bir ürün kartı oluşturma */
    const cardHTML = products.map((product) => 
    `<div class="card">
    <div class="img-wrapper">
    <img src="${product.image}" alt="">
    </div>
    <h4>${product.title}s</h4>
    <h4>electtronic</h4>

    <div class="info">
        <span>${product.price} ₺</span>
        <button onclick="addToBasket(${product.id})">SEPETE EKLE</button>
    </div>
</div>`
)
.join (' ');


//hazırladığımız html i ekrana basar
productList.innerHTML = cardHTML //join yazmadan innerHTML ye ekleyemezsin. Çünkü innerHTML string veri kabul eder. join de dizi şşeklindeki veriyi string e çevirir.
//ürünler dizisini döndüm, herbiri için 'yeni kart' yazan dizi oluşturduk.
    // console.log(cardHTML.join(' '));//diziyi stringe çevirir.
}


/* sepet işlemleri */

let basket = [];
let total = 0;

//modal ı açar
basketBtn.addEventListener('click',() =>{
    modal.classList.add('active');
    renderBasket();
});

/* dışarıya veya çarpıya basınca sepet modal ı kapatır */
document.addEventListener('click',(e) =>{
    if(e.target.classList.contains('modal-wrapper') || e.target.id ==='close-btn')
        {
            modal.classList.remove('active')
        }

    
});

/* sepete ürün ekleme */

function addToBasket (id){
    //dizideki bir elemanın herhangi bir değerine göre o elemanın bilgilerine erişmek istersek find methodunu kullanırız. 
    //!!sepete eklemek istediğim bir ürün var sadece id sini biliyorum. Bu ürünün tüm özelliklerini bana ver deriz:
    
    const product= data.find((i) => i.id===id);
    //sepete ürün daha önce eklendiyse bulma:

    const found = basket.find((i) => i.id ===id);
    
if(found){

    found.amount++;
}else{
    // console.log({...product,amount:1})//zaten var olan product objesşne amount değerini de eklemek için üç nokta(...) kullandık başında
//spread operatörü dağıtma operatörüdür.hem dizi hem objelerde çalışır.
    basket.push({...product,amount:1}); 
}

//toastify js ile hazır kod kullandık.
Toastify({
    text: "Ürününüz sepete eklendi :)",
    duration: 3000,
    close:true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, 0aeeff, #09e3ea)",
    },
  }).showToast();
}

//sepette elemanları listele:
function renderBasket(){
    basketList.innerHTML= basket.map((item) => 
        `<div class="item">
            <img src="${item.image}" >
            <h3 class="title">${item.title}</h3>
            <h4 class="price">${item.price}₺</h4>
            <p>Miktar:${item.amount}</p>
            <img onclick="handleDelete(${item.id})" id="delete-img" src="delete..png">
        </div>
    `
    ).join(' ');
    calculateTotal();

}

//toplam ürün sayısı ve fiyatını hesaplar:

function calculateTotal (){
    console.log(basket)

    //todo: REDUCE: bir dizi içindeki elemanları herhangi değerleri üzerinden 4 işlemden birini yapmamızı sağlar.

    const total= basket.reduce(
        (sum,i)=> sum+i.price*i.amount ,0)

      //?Toplam miktar hesaplama:

const amount= basket.reduce(
    (sum,i) => sum+i.amount,0);

//!hesaplanan total ve amount bilgilerinin ekranda gözükmesini sağlama.
      totalInfo.innerHTML=`
      <span id="count">${amount} ürün</span>
            toplam
            <span id="price">${total.toFixed(2)} ₺</span> 
          `
};


//sepetten elemanı silmek için

function handleDelete(deletedId)
{

    //todo: FİLTER: KALDIRILACAK ÜRÜNÜ DİZİDEN ÇIKARIR.
   basket= basket.filter((i) => i.id !== deletedId)

   //*listeyi günceller:
   renderBasket();

   //*toplamı günceller:
   calculateTotal();
}