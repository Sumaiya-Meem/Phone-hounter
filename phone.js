const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll) => {
    // console.log(phones)
    // console.log(phones.length)

    // check phones num is greater then 10
    const showAllContainer=document.getElementById('showAll-container');
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // display first 10 phone if not show all
    if(!isShowAll){
        phones=phones.slice(0,10);
    }
    

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
         <div class="card-actions justify-center">
           <button class="btn btn-primary" onclick="showDetails('${phone.slug}')">Show Details</button>
         </div>
        </div>
        `
        // step 4
        phoneContainer.appendChild(phoneCard);

        // loading spinner
        loadHandler(false) ;
    })
}
// search handle function
const searchHandler=(isShowAll) => {
    loadHandler(true) ;
    const searchInput=document.getElementById('search-input');
    const searchValue=searchInput.value;
    // console.log(searchValue)
    loadPhone(searchValue,isShowAll);
}
// loading handle function
const loadHandler=(isLoading) =>{
    const loadContainer=document.getElementById('loading-container');
    if(isLoading){
        loadContainer.classList.remove('hidden');
    }
    else{
        loadContainer.classList.add('hidden');
    }
}
// function for show all phone
const handleShowAll = () =>{
    searchHandler(true);
}
// handle show details to load data
const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
//   console.log(data);
  const phone =data.data;

  showPhoneDetails(phone);
}
// function for show all phone details
const showPhoneDetails = (phone) => {
    console.log(phone);
    
    const showDetailContainer=document.getElementById('show_detail_container');
    showDetailContainer.innerHTML=`
    <div class="flex justify-center bg-gray-100 mb-4"><img src="${phone.image}" alt="image" class="m-2"></div>
    <p class="font-bold text-2xl mb-2">${phone.name}</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Isaem, ab lorem ipsum dolor sit amet </p>
    <p><span class="font-bold text-base">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold text-base">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold text-base">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold text-base">Memory:</span> ${phone?.mainFeatures?.memory? phone.mainFeatures.memory : ""}</p>
    <p><span class="font-bold text-base">Slug:</span> ${phone?.slug}</p>
    <p><span class="font-bold text-base">Release Date:</span> ${phone?.releaseDate}</p>
    <p><span class="font-bold text-base">Brand:</span> ${phone?.brand}</p>
    <p><span class="font-bold text-base">GPS:</span> ${phone?.others?.GPS ? phone.others.GPS : ""}</p> 

    `
    show_details_modal.showModal();
    
}

// loadPhone();
