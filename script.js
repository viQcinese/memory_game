// DOM ELEMENTS
gameDisplay = document.querySelector(".gamedisplay")
gameButton = document.querySelector(".banner button")

// =========================
//           UI CTRL       
// =========================
const UICtrl = (function(){

  const imgDefault = "https://psi.opsicologoonline.com.br/assets/img/foto-perfil-default.png"

  const imgUrls = [
      "./images/avatar-1.png",
      "./images/avatar-2.png",
      "./images/avatar-3.png",
      "./images/avatar-4.png",
      "./images/avatar-5.png",
      "./images/avatar-6.jpg",
      "./images/avatar-7.jpg",
      "./images/avatar-8.png",
      "./images/avatar-9.jpg",
      "./images/avatar-10.png",
    ]

    const shuffle = function (arr){
      for (let i=arr.length-1; i>=0; i--){
      let j = Math.floor(Math.random()*i);
      let placeholder = arr[i];
      arr[i] = arr[j];
      arr[j] = placeholder;
      }
      return arr;
    }

    const duplicate = function(arr) {
      const urlList = []
      for (let i=0; i<arr.length; i++) {
        urlList.push(arr[i]);
        urlList.push(arr[i])
      }
      return urlList
    }

    const buildUrlList = function() {
      let list = imgUrls;
      list = duplicate(list)
      list = shuffle(list)
      return list
    }

  return {

    init: function() {
      this.cleanImages()
      this.displayImages()
    },

    displayImages: function() {
      const urlList = buildUrlList(imgUrls)
      const defaultImg = imgDefault

      for (let i=0; i<urlList.length; i++) {
        const image = document.createElement("img")
        image.src = defaultImg
        image.id = `${urlList[i]}`
        image.className = "active"
        gameDisplay.appendChild(image)
      }
    },

    cleanImages: function() {
      const images = document.querySelectorAll("img") 
      images.forEach( image => image.remove() )
    },

    revealImg: function(element) {
      element.src = element.id
    },

    hideImg: function(element) {
      element.src = imgDefault
    } 

  }

})()

// ===========================
//           GAME CTRL    
// ===========================

const GameCtrl = (function(){

  let e1;
  let e2;

  const compareImages = function() {

    if (e1.id === e2.id) {
      e1.classList.remove("active", "current")
      e2.classList.remove("active", "current")
      e1 = undefined;
      e2 = undefined;

    } else {
      setTimeout( () => {
        UICtrl.hideImg(e1)
        UICtrl.hideImg(e2)
        e1.classList.remove("current")
        e2.classList.remove("current")
        e1 = undefined;
        e2 = undefined;
      }, 500)
    }
  }

  const clickImg = function(e) {
    
    if (e.target.tagName === "IMG") {

      if (!e.target.classList.contains("current") &&
        	e.target.classList.contains("active")) {

        if (!e1) {
          e1 = e.target
          UICtrl.revealImg(e.target)
          e.target.classList.add("current")

        } else if (!e2) {
          e2 = e.target
          UICtrl.revealImg(e.target)
          e.target.classList.add("current")
          compareImages()
          
        }
      }
      
    }
  }

  const clickBtn = function() {
    UICtrl.init();
  }

  return {
    
    init: function() {
      gameDisplay.addEventListener('click', clickImg)
      gameButton.addEventListener('click', clickBtn)
    }

  }

})()

// ===========================
//           APP CTRL    
// ===========================
const App = (function(UICtrl, GameCtrl){
  
  return {

    init: function() {
      UICtrl.init() 
      GameCtrl.init() 
    }
  }

})(UICtrl, GameCtrl)

App.init()
