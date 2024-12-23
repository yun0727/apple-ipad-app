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
const searchInputEl = searchWrapEl.querySelector('.textfield')
const searchH3El = searchWrapEl.querySelector('h3')
const searchDelayEls = [searchInputEl,searchH3El,...searchWrapEl.querySelectorAll('li')]

console.log(searchDelayEls)

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
}
function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  searchDelayEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + "s"
  })
  searchDelayEls.reverse()
}
