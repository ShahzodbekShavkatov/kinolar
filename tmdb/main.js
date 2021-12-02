let API_KEY1 = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'
let api1 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY1}&page=1`
let api2 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY1}&page=1`
let api3 = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY1}&page=1`

let btnss = document.querySelectorAll(".btns")
let append = document.querySelector(".append")
let butn = document.querySelector(".btn")
let search = document.querySelector("#search")
let min = document.querySelector(".min")
let max = document.querySelector(".max")
let score = document.querySelector("#score")
let arr = []
async function getElements(api) {
    let ap = api ? api : api1
    let responce = await fetch (ap)
    let result = await responce.json()
    render(result)
}

btnss.forEach(btn => {
    btn.addEventListener("click", event => {
        event.preventDefault()
        if (btn.value == 'top_rated') {
            getElements(api1)
        }
        if (btn.value == 'popular') {
            getElements(api2)
        }
        if (btn.value == 'upcoming') {
            getElements(api3)
        }
    })
})


function render(res) {
    append.innerHTML = null
    let base = res.results ? res.results : arr
    for (let i of base) {
        let obj = {
            img: i.poster_path,
            title: i.title,
            vote: i.vote_average,
            date: i.release_date
        }
        arr.push(obj)
        let div = document.createElement("div")
        div.setAttribute("class", "movie")
        div.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${i.poster_path}" alt="${i.title}">
            <div class="movie-info">
                <h3>${i.title}</h3>
                <span class="orange">${i.vote_average}</span>
            </div>
            <span class="date">${i.release_date}</span>
        `
    append.append(div)
    }

    localStorage.setItem('info', JSON.stringify(arr))
}


butn.addEventListener("click", event => {
    event.preventDefault()
    let info = JSON.parse(localStorage.getItem('info'))
    console.log(info);
    filters(info)
})

function filters(arr) {
    let array = [...arr]
    let ar = []
    let search_count = 0
    array.forEach( element => {
        if (element.title.includes(search.value)) {
            ar.push(element)
            search_count = 0
        }
        else search_count = 1
    } )
    if (search_count == 0) ar.push(...array)

    let arrr_fromto = []
    let elll_count = 0
    // ar.forEach( element => {
    //     if ( (min.value) && (max.value)) {
    //         if (min.value && max.value) {
    //             if (element.year >= min.value && element.year <= max.value) {
    //                 arrr_fromto.push(element)
    //                 elll_count = 1
    //             }
    //         }
    //         else if (min.value) {
    //             if (element.date >= min.value) {
    //                 arrr_fromto.push(element)
    //                 elll_count = 1
    //             }
    //         }
    //         else if (max.value) {
    //             if (element.date <= max.value) {
    //                 arrr_fromto.push(element)
    //                 elll_count = 1
    //             }
    //         }
    //     }
    //     else elll_count = 0
    // } )
    // if (elll_count == 1) ar = arrr_fromto

    let arrr = []
    let count = 0
    ar.forEach(element => {
        if (score.value !== '') {
            if (element.vote >= score.value) {
                arrr.push(element)
                count = 1
            }
        }
    })
    if (count == 1) ar = arrr
    render(ar)
}

getElements()