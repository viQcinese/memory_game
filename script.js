// DOM ELEMENTS
banner = document.querySelector(".banner")
banner = document.querySelector(".gamebar")
gameDisplay = document.querySelector(".gamedisplay")

// =========================
//           UI CTRL       
// =========================
const UICtrl = (function(){

  const imgDefault = "https://psi.opsicologoonline.com.br/assets/img/foto-perfil-default.png"

  const imgUrls = [
    "https://avatarfiles.alphacoders.com/124/thumb-124988.png",
    "https://avatarfiles.alphacoders.com/979/thumb-97920.png",
    "https://avatarfiles.alphacoders.com/837/thumb-83705.png",
    "https://avatarfiles.alphacoders.com/125/thumb-125742.png",
    "https://avatarfiles.alphacoders.com/699/thumb-69905.png",
    "https://avatarfiles.alphacoders.com/827/thumb-82734.jpg", 
    "https://i.pinimg.com/474x/db/15/ad/db15ad50a4022242d3fb8ddc1aa47548.jpg",
    "https://i.pinimg.com/originals/ef/b8/eb/efb8eb427dc6c0f35a3d72a82b0dee62.png",
    "https://avatarfiles.alphacoders.com/188/thumb-188870.jpg",
    "https://avatarfiles.alphacoders.com/125/thumb-125098.png"
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
      }, 700)
    }
  }

  const clickImg = function(e) {
    
    if (e.target.tagName === "IMG") {

      if (!e.target.classList.contains("current") &&
        	e.target.classList.contains("active")) {

          console.log(e.target)

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

  return {
    
    init: function() {
      gameDisplay.addEventListener('click', clickImg)
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
