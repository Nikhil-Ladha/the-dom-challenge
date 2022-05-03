const runBtn = document.getElementById("run");
const progressBar = document.getElementById("bar");
const counter = document.getElementById("counter");
let count = 0;

runBtn.addEventListener("click", (e) => {
    
    if(!count) {
        fillProgressBar();
    }
    count += 1;
    counter.innerHTML = count;
    if(!counter.classList.contains('add-count')) {
        counter.classList.add('add-count');
    }
})

function fillProgressBar() {
    let width = 0;
    const i = setInterval(() => {
        width += 1;
        progressBar.style.width = `${width}px`;
        if(width > 800) {
            progressBar.style.width = `0px`;
            updateCount();
            clearInterval(i);
        }
    }, 3/800);       // Since the width of the bar is 800px, and the total time is 3sec
}

function updateCount() {
    count--;
    let tempCount = parseInt(counter.innerHTML) - 1;
    if(!tempCount) {
        counter.innerHTML = ""
        counter.classList.remove('add-count')
    } else {
        counter.innerHTML = tempCount;
        fillProgressBar();
    }
}