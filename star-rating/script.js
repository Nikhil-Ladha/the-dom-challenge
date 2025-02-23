
// My solution - Partially correct

function paintStar(e, state, displayFn) {
    const starDiv = document.getElementById("star");
    const starList = starDiv.childNodes;
    let indx = 0;
    for(let x of starList.entries()) {
        if(x[1] != e.target)
            indx++;
        else
            break;
    }
    for(let i=0; i<=indx; i++) {
        if(state === "enter") {
            starList[i].classList.remove("fa", "fa-star-o");
            starList[i].classList.add("fa", "fa-star");
        } else if(state == "leave") {
            starList[i].classList.remove("fa", "fa-star");
            starList[i].classList.add("fa", "fa-star-o");
        } else {
            starList[i].classList.remove("fa", "fa-star-o");
            starList[i].classList.add("fa", "fa-star");
            displayFn(indx+1);
        }
    }
}

/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {

    const parentDiv = document.querySelector(el);

    for(let i=0; i<=count; i++) {
        let iEle = document.createElement("i")
        parentDiv.appendChild(iEle);
        iEle.setAttribute("id", `star${i+1}`);
        iEle.classList.add("fa", "fa-star-o");
        iEle.addEventListener("mouseenter", (e) => paintStar(e, "enter"));
        iEle.addEventListener("mouseleave", (e) => paintStar(e, "leave"));
        iEle.addEventListener("click", (e) => paintStar(e, "click", callback));
    }

}


// Given Solution

/*
function Star(el, count, callback) {
    let active = -1;
    const element = document.querySelector(el);
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= count; i++) {
      const iElem = document.createElement("i");
      iElem.classList.add("fa");
      iElem.classList.add("fa-star-o");
      iElem.dataset.ratingVal = i;
      fragment.appendChild(iElem);
    }
    element.appendChild(fragment);
    element.addEventListener("mouseover", onMouseOver);
    element.addEventListener("click", onClick);
    element.addEventListener("mouseleave", onMouseLeave);
  
    function onMouseOver(e) {
      const ratingVal = e.target.dataset.ratingVal;
      if (!ratingVal) {
        return;
      }
      fill(ratingVal);
    }
  
    function fill(ratingVal) {
      for (let i = 0; i < count; i++) {
        if (i < ratingVal) {
          element.children[i].classList.add("fa-star");
        } else {
          element.children[i].classList.remove("fa-star");
        }
      }
    }
  
    function onMouseLeave(e) {
      fill(active);
    }
  
    function onClick(e) {
      active = e.target.dataset.ratingVal;
      fill(active);
      callback(active);
    }
}*/