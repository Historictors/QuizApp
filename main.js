import { sendData as Rawdata } from "./data.js";

const data = Rawdata.key;

const main = document.querySelector("#main")

let selectedQuestion = []
let answersHTML = " ";

// selects questions
const qstnSelector = (data) => {
    let random
    for (let i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * 1000)
        selectedQuestion.push(data[random])
    }


    console.log(selectedQuestion);

}

const start = document.querySelector("#startQuiz")
const next = document.querySelector("#next")
const scoreEle = document.querySelector("#score")

const questionAdder = (selQest) => {

    if (index >= 10) {
        alert(`your score is ${score}`)
        answerCont.style.display = "block"
        againbtn.style.display ="block"
        func()
        return
    }
    const quizTemplate = `
    <h2> score : <h3 id="score">${score}</h3></h2>
<form action="get" id="form">
<h2 id="qstnNum">Question ${index + 1}</h2>
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
    next.style.display = "inline"
    scoreEle.innerHTML = score

    let anss = selQest[index].ans

    answerCont.innerHTML += quizTemplate


}

const againbtn = document.querySelector("#againBtn")
const checkIsAnswered = () => {

    for (let i = 1; i <= 4; i++) {

        const inputs = document.querySelector(`#opt${i}`)

        if (inputs.checked == true) {

            if (index >= 10) {
                againbtn.style.display = "block"
               
                answersOnDom()


            }
            let condition = (selectedQuestion[index].ans == i)


            if (condition) score += 10


            return true
        }

    }
    return false
}
let index = 0
let score = 0;


next.addEventListener('click', () => {

    let val = checkIsAnswered();

    if (val == true) {
        index += 1
        questionAdder(selectedQuestion, index, score)

    }


})


start.addEventListener('click', () => {
    qstnSelector(data)
    questionAdder(selectedQuestion, 0, 0)
   

})

againbtn.addEventListener('click', (e) => {
    console.log(index);
    index = 0
    score = 0
    questionAdder(selectedQuestion, score);
    answerCont.innerHTML = ""

})
const answerCont = document.querySelector("#answers")
answerCont.style.display = "none"


const func = () => {
    for (let i = 0; i < 10; i++) {

        let ansIndex = selectedQuestion[i].ans
        console.log(ansIndex);

        // let lb = `lb${ansIndex}`
        let domTreeAccess = answerCont.children[i].children[3].children

        if (ansIndex == 0) 
                            domTreeAccess.lb1.style.backgroundColor = "green"

        else if (ansIndex == 1) 
                            domTreeAccess.lb2.style.backgroundColor = "green"

        else if (ansIndex == 2) 
                            domTreeAccess.lb3.style.backgroundColor = "green"

        else 
            domTreeAccess.lb4.style.backgroundColor = "green"



    }
}


// 10 questions ka object bnana hai -> 
// fir serial wise unko access krna hai 
// agr checked value sahi hai to point +1 
// last me sabhi ka correct or incorrect answer