const dot = document.querySelector(".slider-dot");
const slider = document.querySelector(".slider");
let root = document.documentElement;
const keys = document.querySelectorAll(".key");
const input = document.querySelector(".input");
const calcul = document.querySelector(".calcul");


const moveClasses = ["move01","move12","move20"];
changeTheme(localStorage.getItem("theme"));

let first = true;

let result = 0;
let op = "";
let previousisOp=false;
let equal = false;

for (const key of keys) {
    key.addEventListener("click",()=>{
        
        if(equal && (!isNaN(parseInt(key.textContent)) || key.textContent==="DEL" || key.textContent===".")){
            reset();
        }
        else{
            equal = false;
        }
        updateCalcul(key.textContent);
        if(first && !isNaN(parseInt(key.textContent))){
            input.textContent = key.textContent;
            first=false;
            previousisOp = false;
            return;
        }

        if(input.offsetWidth<500 && !isNaN(parseInt(key.textContent))){
            input.textContent += key.textContent;
            previousisOp = false;
        }
            
        if(!previousisOp && key.textContent === "." && input.textContent.split("").indexOf('.')===-1){
            input.textContent += key.textContent;
            previousisOp = true;
            first = false;
        }

        if(!previousisOp && key.textContent === "DEL"){
            input.textContent = input.textContent.slice(0,input.textContent.length-1);
            if(input.textContent.length == 0){
                input.textContent = "0";
                first = true;
            }
        }

        if(!previousisOp && isNaN(parseInt(key.textContent)) && key.textContent !== "." && key.textContent !== "DEL"){
            previousisOp = true;
            operation(op);

            op = key.textContent;
            first=true;
            input.textContent = result;
        }
    });
}

function updateCalcul(key){
    let isNum = !isNaN(parseInt(key));
    if(key!=="DEL" && (isNum || !isNaN(parseInt(calcul.textContent[calcul.textContent.length-1]))))
        calcul.textContent += key;
    if(key === "DEL" && !isNaN(parseInt(calcul.textContent[calcul.textContent.length-1])))
        calcul.textContent = calcul.textContent.slice(0,calcul.textContent.length-1);
    if(first && key===".")
        calcul.textContent +="0.";
}

function operation(op){
    if (op === "+")
        result += parseFloat(input.textContent);
    else if (op === "-")
        result -= parseFloat(input.textContent);
    else if (op === "/" && parseFloat(input.textContent) !== 0)
        result /= parseFloat(input.textContent);
    else if (op === "x")
        result *= parseFloat(input.textContent);
    else {
        result = parseFloat(input.textContent);
    }
    result = Math.floor(parseFloat(result)*1000)/1000;
    console.log(result);
}

document.querySelector(".reset").addEventListener("click",()=>{
    reset();
});

function reset(){
    result=0;
    first=true;
    input.textContent=0;
    calcul.textContent = "";
    equal =false;
}

document.querySelector(".equal").addEventListener("click",()=>{
    if (previousisOp)
        return;
    operation(op);
    input.textContent = result;
    first=true;
    op="";
    equal = true;
    // result = 0;
});

slider.addEventListener('click',() =>{
    if(dot.classList.length == 1){
        dot.classList.add("move01");
        localStorage.setItem("theme","move01");
    }
    else{
        let current = dot.classList[1];
        let next = (moveClasses.indexOf(current)+1)%3;
        dot.classList.remove(current);
        dot.classList.add(moveClasses[next]);
        localStorage.setItem("theme",moveClasses[next]);
    }
    changeTheme(dot.classList[1]);
})

function changeTheme(theme){
    
    if(!dot.classList.contains(theme))
    dot.classList.add(theme);

    if (theme==="move01"){
        root.style.setProperty('--bg-main', "hsl(0, 0%, 90%)");
        root.style.setProperty('--bg-screen', "hsl(0, 0%, 93%)");
        root.style.setProperty('--bg-toggle', "hsl(0, 5%, 81%)");

        root.style.setProperty('--bg-keyBlue', "hsl(185, 42%, 37%)");
        root.style.setProperty('--shadow-keyBlue', "hsl(185, 58%, 25%)");

        root.style.setProperty('--bg-keyRed', "hsl(25, 98%, 40%)");
        root.style.setProperty('--shadow-keyRed', "hsl(25, 99%, 27%)");

        root.style.setProperty('--bg-key', "hsl(45, 7%, 89%)");
        root.style.setProperty('--shadow-key', "hsl(35, 11%, 61%)");

        root.style.setProperty('--text-white', "hsl(60, 10%, 19%)");
        root.style.setProperty('--text-gray', "hsl(60, 10%, 19%)");
        root.style.setProperty('--text-2', "white");
        root.style.setProperty('--text-equal', "white");

    }
    else if(theme==="move12"){
        root.style.setProperty('--bg-main', "hsl(268, 75%, 9%)");
        root.style.setProperty('--bg-screen', "hsl(268, 71%, 12%)");
        root.style.setProperty('--bg-toggle', "hsl(268, 71%, 12%)");

        root.style.setProperty('--bg-keyBlue', "hsl(281, 89%, 26%)");
        root.style.setProperty('--shadow-keyBlue', "hsl(285, 91%, 52%)");

        root.style.setProperty('--bg-keyRed', "hsl(176, 100%, 44%)");
        root.style.setProperty('--shadow-keyRed', "hsl(177, 92%, 70%)");

        root.style.setProperty('--bg-key', "hsl(268, 47%, 21%)");
        root.style.setProperty('--shadow-key', "hsl(290, 70%, 36%)");

        root.style.setProperty('--text-white', "hsl(52, 100%, 62%)");
        root.style.setProperty('--text-gray', "hsl(52, 100%, 62%)");
        root.style.setProperty('--text-2', "white");
        root.style.setProperty('--text-equal', "hsl(198, 20%, 13%)");

    }
    else if(theme==="move20"){
        root.style.setProperty('--bg-main', "hsl(222, 26%, 31%)");
        root.style.setProperty('--bg-screen', "hsl(224, 36%, 15%)");
        root.style.setProperty('--bg-toggle', "hsl(223, 31%, 20%)");

        root.style.setProperty('--bg-keyBlue', "hsl(225, 21%, 49%)");
        root.style.setProperty('--shadow-keyBlue', "hsl(224, 28%, 35%)");

        root.style.setProperty('--bg-keyRed', "hsl(6, 63%, 50%)");
        root.style.setProperty('--shadow-keyRed', "hsl(6, 70%, 34%)");

        root.style.setProperty('--bg-key', "hsl(30, 25%, 89%)");
        root.style.setProperty('--shadow-key', "hsl(28, 16%, 65%)");

        root.style.setProperty('--text-gray', "hsl(221, 14%, 31%)");
        root.style.setProperty('--text-white', "white");
        root.style.setProperty('--text-2', "white");
        root.style.setProperty('--text-equal', "white");
        
    }
}

