import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// basket
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation()
  if (basketEl.classList.contains('show')){
    hideBasket()
  } else{
    showBasket()
  }
})

basketEl.addEventListener('click', function(event){
  event.stopPropagation()
})

window.addEventListener('click',function(){
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}
function hideBasket(){
  basketEl.classList.remove('show')
}

// search
const headerEl = document.querySelector('header')
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStartEL = headerEl.querySelector('.search-starter')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEls = searchWrapEl.querySelector('.textfield')
const searchInputEl = searchWrapEl.querySelector('input')
const searchH3El = searchWrapEl.querySelector('h3')
const searchDelayEls = [searchInputEls,searchH3El,...searchWrapEl.querySelectorAll('li')]

searchStartEL.addEventListener('click', function(event){
  event.stopPropagation()
  if(headerEl.classList.contains('searching')){
    hideSearch()
  } else{
    showSearch()
  }
})
searchWrapEl.addEventListener('click',function(event){
  event.stopPropagation()
})
window.addEventListener('click',hideSearch)

function showSearch(){
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + "s"
  })
  setTimeout(function(){
    searchInputEl.focus()
  }, 600)
}
function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  searchDelayEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + "s"
  })
  searchDelayEls.reverse()
  searchInputEl.value=''
}

//요소의 가시성 관찰
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})

// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('.this-year')
thisYearEl.textContent = new Date().getFullYear()