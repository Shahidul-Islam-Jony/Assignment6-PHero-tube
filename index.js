const phTube = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const arrObj = data.data;
    tab(arrObj)
}


const tab = (data) => {
    const tabField = document.getElementById('tab');
    data.forEach(tab => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick=defaultCardView('${tab.category_id}');sortCardView('${tab.category_id}') class='btn capitalize active:bg-red-500'>${tab.category}</button>
    `;
        tabField.appendChild(div);
    })
}

 const cardContainer = document.getElementById('card-container');

const showCard = (categoryData) => {
    cardContainer.textContent = '';

    // no content handler
    const noContent = document.getElementById('no-content');
    if (categoryData.length === 0) {
        noContent.classList.remove('hidden');
    }
    else {
        noContent.classList.add('hidden');
    }

    // content handler
    categoryData.forEach(cardData => {

        // Time calculating
        const time = parseInt(cardData.others.posted_date);
        const hour = parseInt(time / 3600);
        const min = parseInt((time - (hour * 3600)) / 60);

        // creating card
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-base-100 h-full rounded-lg shadow-xl">
            <div class="relative">
                <figure><img class="h-72 rounded-lg" src="${cardData.thumbnail}" alt="Shoes" /></figure>
                <p class="absolute right-2 bottom-2 px-2 py-1 rounded-lg text-white bg-black">${time ? `${hour}hrs ${min} min ago` : ''}</p>
            </div>
            <div class="card-body flex flex-row">
                <img src="${cardData.authors[0].profile_picture}" class="w-10 h-10 rounded-full" alt="img">
                <div>
                    <h2 class="card-title">${cardData.title}</h2>
                    <div class="flex flex-row">
                        <p>${cardData.authors[0].profile_name}</p>
                        <p>${cardData.authors[0].verified ? '<img src="image/verified.svg"></img>' : ''}</p>
                    </div>
                    <p>${cardData.others.views} views</p>
                </div>
            </div>
        </div>
    `;
        cardContainer.appendChild(card);
    })
}

const sortCardView = async(category_id = '1000') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    let categoryData = data.data;
     // Sort view
    const sortBtn = document.getElementById('sort-view').addEventListener('click',function(){
        categoryData.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
        showCard(categoryData);
    })

}


const defaultCardView = async (category_id = '1000') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    let categoryData = data.data;
    showCard(categoryData);

}

defaultCardView();
sortCardView();

phTube();