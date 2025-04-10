import { sendData as Rawdata } from "./data.js";

const data = Rawdata.key;

const main = document.querySelector("#main")

let selectedQuestion =[]
let answersHTML=" ";

// selects questions
const qstnSelector = (data) => {
    let random
    for (let i = 0; i < 10; i++) {
         random = Math.floor(Math.random()* 1000)
         selectedQuestion.push(data[random])
    }

    
    console.log(selectedQuestion); 

}

const start = document.querySelector("#startQuiz")
const next = document.querySelector("#next")

const questionAdder = (selQest) => {

    if(index >=10) {
        answersOnDom()
        return
    }
        const quizTemplate = `
<form action="get" id="form">
<h2 id="qstnNum">Question ${index+1}</h2>
<br>
<h3 id="qstn">${selQest[index].quest}</h3>
<div id="inputs">
<input type="radio" name ="options" id="opt1" val = ${selQest[index].options[0]}>
<label id="lb1">${selQest[index].options[0]}</label>
<br>

<input type="radio" name ="options" id="opt2" val = ${selQest[index].options[1]}>
<label id="lb2" >${selQest[index].options[1]}</label>
<br>


<input type="radio" name ="options" id="opt3" val = ${selQest[index].options[2]}>
<label id="lb3" >${selQest[index].options[2]}</label>
<br>


<input type="radio" name ="options" id="opt4" val = ${selQest[index].options[3]}>
<label id="lb4" >${selQest[index].options[3]}</label>
<br>
<div>

</form>`

main.innerHTML = quizTemplate
next.style.display ="inline"
let ans = selQest[index].ans 
let highlight = document.querySelector(`#lb${ans}`)
console.log(ans);
highlight.style.color ="green"

answersHTML +=quizTemplate



}

const againbtn =document.querySelector("#againBtn")
const checkIsAnswered = () => {
    
    for (let i = 1; i <= 4; i++) {
        
        const inputs =document.querySelector(`#opt${i}`)
       
       if(inputs.checked == true){ 

        if(index >=10){
            againbtn.style.display ="block"
            alert(`your score is ${score}`)
            answersOnDom()

            
        }
           let condition = (selectedQuestion[index].ans == i)
           
           
           if( condition ) score +=10
           

        return true
    }
       
    }
    return false
}
let index =1;
let score =0;


next.addEventListener('click', () => {
    
let val = checkIsAnswered();

if ( val == true ) {
   questionAdder(selectedQuestion,index,score)

    index+=1
}

    
})


start.addEventListener('click', () => {
   qstnSelector(data)
    questionAdder(selectedQuestion,0,0)
   
})

againBtn.addEventListener('click',(e) =>{
    console.log(index);
    index =0
    score =0
    questionAdder(selectedQuestion,score);
   
})
const answerCont = document.querySelector("#answers") 

const answersOnDom = () =>{
    answerCont.innerHTML = answersHTML 
}



// 10 questions ka object bnana hai -> 
// fir serial wise unko access krna hai 
// agr checked value sahi hai to point +1 
// last me sabhi ka correct or incorrect answer
