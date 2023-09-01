const phTube = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const arrObj = data.data;
    // console.log(arrObj);
    tab(arrObj)
}

const tab = (data) => {
    // console.log(data);
    const tabField = document.getElementById('tab');
    data.forEach(tab => {
        const div = document.createElement('div');
        // console.log(tab);
        div.innerHTML = `
        <button onclick=showCard('${tab.category_id}'); class='btn capitalize active:bg-red-500'>${tab.category}</button>
    `;
        tabField.appendChild(div);
    })
}

const showCard = async (category_id = 1000) => {
    // console.log(category_id);
    const cardContainer = document.getElementById('card-container');
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    // console.log(data);
    const categoryData = data.data;
    // console.log(categoryData);

    cardContainer.textContent = '';

    const noContent = document.getElementById('no-content');
    if (categoryData.length === 0) {
        noContent.classList.remove('hidden');
    }
    else {
        noContent.classList.add('hidden');
    }
    categoryData.forEach(cardData => {
        // console.log(cardData);

        // Time calculating
        const time = parseInt(cardData.others.posted_date);
        const hour = parseInt(time / 3600);
        // console.log(hour);
        const min = parseInt((time - (hour * 3600)) / 60);
        // console.log(min);
        // creating card
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <div class="relative">
                <figure><img class="h-72" src="${cardData.thumbnail}" alt="Shoes" /></figure>
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




/* <p class="absolute right-0 bottom-0 bg-red-400 text-white">${hour ? hour:''}hrs ${min ? min:''} min ago</p> */

showCard();
phTube();