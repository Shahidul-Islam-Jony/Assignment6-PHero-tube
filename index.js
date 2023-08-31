const phTube = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const arrObj = data.data;
    // console.log(arrObj);
    tab(arrObj)
}

const tab = (data) =>{
    // console.log(data);
    const tabField = document.getElementById('tab');
    data.forEach(tab =>{
        const div = document.createElement('div');
        console.log(tab);
        div.innerHTML = `
        <button class='btn capitalize active:bg-red-600'>${tab.category}</button>
    `;
    tabField.appendChild(div);
    })
}



phTube();