const url = "https://jsonplaceholder.typicode.com/users";



//fetch methodu: API lere istek atmamızı sağlayan yerleşik bir java script methodudur.

// fetch(url)//fetch methodu bizden yalnızca istek atacağımız url i ister. Bu noktada ya url yi kopyalayıp yapıştırırım ya da yukarıdaki gibi değişken de tanımlayıp değişken adını .

//Şimdi apıye kullanıcıları getir isteği attık. Bu cevabı almam lazım.

// const data = fetch(url);

// console.log(data)// böyle yapınca bana Promise döner.

/* //PROMISE: Gerçekleşmesi zaman alır ve cevap olarak 2 dönüş yapar.
olumlu veya olumsuz. Bu noktada da then/catch methodu devreye girer. */


// fetch (url) //Then catch mehtoduyla apıden cevap geç gelebilir gelene kadar bekleme diğerlerini çalıştır cevap gelince de bunu çalıştır diyoruz aslında.

// .then(() => {
//     console.log("APIDEN CEVAP OLUMLU")
// })

// .catch(() =>{
//     console.log("APIDEN CEVAP OLUMSUZ.")
// });

//callback function: bir fonksiyon trf çağrılan fonksiyonlardır.

// fetch (url) //Then catch mehtoduyla apıden cevap geç gelebilir gelene kadar bekleme diğerlerini çalıştır cevap gelince de bunu çalıştır diyoruz aslında.

// .then((response) => {
//     console.log(response); //console a response objesi yazılır.
// })

/* gelen obje içinde şunlar yer alır:

Response {type: 'basic', url: "http://127.0.0.1:5500/'https://jsonplaceholder.typicode.com/users", redirected: false, status: 404, ok: false, …}
body: (...)
bodyUsed: false
headers:Headers {}
ok:false
redirected:false
status:404 : isteğin durumu burada belirtilir. veri tabanından gelen cevaplarda bu kod hep vardır.
1**: Bilgilendirici koddur. Bu kod sunucunun isteği işleme devam ettiğini gösterir. 
2**:Başarılı. Bu kodlar isteğe başrıyla yanıt verildiğini gösterir.Örneğin 200 kodu sunucunun isteğe yanıt verirken herhangi bir sorun yaşamadığını gösterir.
3**:Yönlendirme. SERVER yolu değiştiği farklı yola kaydığı götergesidir. Örneğin 301 MOVED PERMANENTLY sunucunun bir kaynağının başka bir url ye taşındığını göseterir.
4**:İstemci hatasıdur. HATA BİZDEDİR. Örneğin kullanıcı bilgisi istiyorum, kullanıcı adı şifresini yazdım ama profil foto göndermeden istek attığım yani eksik istek attığım için hatalıdır. Ya da yanlış url ye istek attım. Bu kodlar isteğin yanlış olduğunu veya eksik bilgi içerdiğini gösterrir. 404 BAD REQUEST sunucu isteğinin geçersiz olduğunu belirtir.
5**: SERVER HATASI sunucu hatası olduğunu gösterir. Örnerğin: 500 server error kodu sunucunun isteği işleyemeyebileceği bir hata olduğunu belirtir.
statusText:"Not Found"
type:"basic"
url: "http://127.0.0.1:5500/'https://jsonplaceholder.typicode.com/users" */


// .catch((error) =>{
//     console.log("APIDEN CEVAP OLUMSUZ."+error);
// });

// fetch(url)
// .then((response) => {
//    return response.json() //gelen json verisini java scriptte kullanılır hale getirir.
// })

//gelen veriyi js de okunacak şekle getirme de süre aldığından tekrar .then methodu yazarız.

// .then ((data) =>{
//     console.log(data)
// })

// .catch((error) =>{
//     console.log("apiden cevap olumsuz")
// })

// Yukarıda response, data ve error u tanımlamasak da bu verilere ulaşabildik. çünkü buradaki respınse, data ve error fonksiyonumuza gönderilen parametrelerdir. 
//Yani örneğin response .then otomatik olarak kendisi gönderir. aynı şekilde .catch de error u döndürür.
//return ile veriyi döndürürüz ikinci olarak yazdığımız .then ile de bu data ya erişmiş oluruz. data ismine takılma, veri de diyebilirsin, gelen dersin fark etmez. return ile bir veri döndürdün ya adı önemli değil ona erişmeni sağlar.
//yani buradaki return bir nevi şunu yazmış gibi veriyi almamızı sağladı. const data = return response.json();


// yukarıdaki fonksiyon ile apı den gelen veriye java scriptte eriştik. Artık bu veriyi nasıl ve ne şekilde kullanacağımıza karar vermemiz gerekiyor.

/* 2. olarak yazdığımız .then ile bir fonksiyon da çağırabilirdik. Örneğin:*/

// fetch(url)
// .then((response) => {
//     return response.json();
// })
// .then(renderUser) //buradaki then 86.satırdaki .then'in görevinin bitmesini bekliyor.Bittiği noktada ne return ettiysek onu çalıştırdığı function a gönderir.

// .catch((error) =>{
//     console.log("apıden veri alınamadı.")
// })

//gelen veri içindeki kullancıları ekrana yazdıacak function:

// function renderUser(data){
//     data.forEach((user) => document.write(user.name + '<br>'));
// }