const content = document.getElementById('content');
let start = 0;
let limit = 5;

const createPost = ({url, thumbnailUrl, title}) => {
    return `<div class="post">
        <img class="post-image" src="${url}" />
        <div class="title">
            <img src="${thumbnailUrl}" />
            <span>${title}</span>
        </div>
    </div>`
}

function getData(start, limit) {
    const url = `http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
    fetch(url).then(res => res.json()).then(res => {
        console.log(res)
        const htmlString = res.map(item => {
            return createPost(item);
        }).join('');
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        content.appendChild(div);
    });
}


const debounce = (fn, delay) => {
    let timer = null;
    return (...arg) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...arg), delay);
    }
}

const newFunction = debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
        console.log('Reached end');
        start = start + 5;
        getData(start, limit);
    }
}, 1000);

window.addEventListener('scroll', newFunction);

getData(start, limit);