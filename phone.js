const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}
const displayPhones = (phones) => {
    // console.log(phones)
    // console.log(phones.length)

    // check phones num is greater then 10
    const showAllContainer=document.getElementById('showAll-container');
    if(phones.length > 10 ){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display first 10 phone
    phones=phones.slice(0,10);

    // step 1
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML='';
    phones.forEach(phone => {
        // console.log(phone);
        // step 2
        const phoneCard = document.createElement('div');
        phoneCard.classList = "card w-96 bg-base-500 shadow-xl"
        // step 3
        phoneCard.innerHTML = `
        <figure class="bg-gray-100 m-2"><img src="${phone.image}" alt="Shoes" class="m-4"/></figure>
        <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions justify-end">
           <button class="btn btn-primary">Buy Now</button>
         </div>
        </div>
        `
        // step 4
        phoneContainer.appendChild(phoneCard);
    })
}
const searchHandler=() => {
    const searchInput=document.getElementById('search-input');
    const searchValue=searchInput.value;
    // console.log(searchValue)
    loadPhone(searchValue);
}
// loadPhone();
