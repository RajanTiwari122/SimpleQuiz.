const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

//make an array that stores questions and answers
const quiz =[
    {
        question:"Q1. There are _____ levels of heading in HTML?",
        choices:["Three"," Four","Five","Six"],
        answer:"Six"
    },
    {
        question:"Q2. The purpose of Markup is to?",
        choices:["add hypertext capabilities"," enhance the document;","both A & B","None of the above"],
        answer:"both A & B"
    },
    {
        question:"Q3. Which of the following tag do not require a terminator?",
        choices:["<u>"," <br>","<b>","<ul>"],
        answer:"<br>"
    },
    {
        question:"Q4. To get the ordered list we use?",
        choices:["<h1>","<ml>","<ul>","<ol>"],
        answer:"<ol>"
    },
    {
        question:"Q5. Which of the following tag is used to insert graphics in the webpage?",
        choices:["<image>","<images>","<img>","<graphics>"],
        answer:"<img>"
    },
    {
        question:"Q6. Which of the following is not a CSS box model property?",
        choices:["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },
    {
        question:"Q7. Which of the following tag is used to embed CSS in HTML page?",
        choices:["<css>","<!DOCTYPE html>","<script>","<style>"],
        answer:"<style>"
    },
    {
        question:"Q8. Which of the following CSS selectors are used to specify a group of elements?",
        choices:["tag","id","class","None of the above"],
        answer:"class"
    },
    {
        question:"Q9. Which of the following CSS framework is used to create a responsive design?",
        choices:["django","rails","larawell","bootstrap"],
        answer:"bootstrap"
    },
    {
        question:"Q10. Which of the following selector is used to specify a rule to bind a particular unique element?",
        choices:["tag","id","class","both class and tag"],
        answer:"id"
    },
    {
        question:"Q11. In how many ways javaScript can be added to HTML?",
        choices:["two","three","four","one"],
        answer:"two"
    },
    {
        question:"Q12. JavaScript is an _____ language?",
        choices:["Object-Oriented","Object-based","Procedural","None of th above"],
        answer:"Object-Oriented"
    },
    

{
    question:"Q13. Which of the following is a valid way to declare a function in javscript?",
    choices:["function myfunction() {}"," let myFunction = function() {};","myFunction: function(){}","def functionName(){}"],
    answer:"myFunction: function(){}"
},
{
    question:"Q14. Which of the following is not a JavaScript data type?",
    choices:["string","boolean","object","float"],
    answer:"float"
},
{
    question:"Q15. What is the purpose of this keyword in JavaScript?",
    choices:["It refers to the current function.","It refers to the current object.","It refers to the data type","None of the above"],
    answer:"It refers to the current object."
},
]

//Making variables 
let currentQuestionIndex=0;
let score=0;
let quizOver=false;
let timeLeft=15;
let timerId=null;


//Arrow func to show questions
const ShowQuestions=()=>{
    const questionsDetails=quiz[currentQuestionIndex];
    questionBox.textContent =questionsDetails.question;

    choicesBox.textContent="";
    for(let i=0;i<questionsDetails.choices.length;i++){
        const currentChoice=questionsDetails.choices[i];
        const choiceDiv =document.createElement('div');
        choiceDiv.textContent=currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
         
        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');

            }else{
                choiceDiv.classList.add('selected');

            }

        });
    }
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}


//function to check answer
const checkAnswer= ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent ===  quiz[currentQuestionIndex].answer){
       // alert("Correct Answer!");
        displayAlert("Correct Answer!")
        score++;
    }else{
       // alert("Wrong Answer!");
        displayAlert("Wrong Answer! "+ quiz[currentQuestionIndex].answer+" is your Correct Answer");
    }
    timeLeft=15;
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
        ShowQuestions();
    }else{
        showscore();
        stopTimer();
        quizOver=true;
        timer.style.display="none";
    }
}

//function for stop timer
const stopTimer=()=>{
  clearInterval(timerId);
}


//function for calculating scores
const showscore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    if(score>=10){
      scoreCard.textContent=` GREAT JOB! You scored ${score} out of ${quiz.length}`;
      displayAlert("You have completed your Quiz");
    }
    else if(score<10 && score>5){
        scoreCard.textContent=`AVERAGE!You scored ${score} out of ${quiz.length}`;
        displayAlert("You have completed your Quiz");  
    }
    else{
        scoreCard.textContent=` BETTER LUCK NEXT TIME! You scored ${score} out of ${quiz.length}`;
        displayAlert("You have completed your Quiz");  
    }
    
    nextBtn.textContent="Try Again";
    quizOver=true;   
}

// Function to display alert on the top
const displayAlert=(msg) =>{
    alert.style.display="block";
    alert.textContent=msg;
    setTimeout(()=>{
        alert.style.display="none";   
    },2000)
    
}
//function to start timer
const startTimer=()=>{
    clearInterval(timerId);
    timer.textContent=timeLeft;
    const countDown = () =>{
        timeLeft--;
        timer.textContent=timeLeft;
    
    if(timeLeft===0){
        
        const confirmUser = confirm("Time Up!!! Do You want to play the Quiz Again");
        
        if(confirmUser){
            timeLeft=15;
            startQuiz();
        }
        else{
            startBtn.style.display= "block";
            container.style.display= "none";
            return;
        }
    }
}
   timerId= setInterval(countDown,1000);  
}

//function to start quiz
const startQuiz=()=>{
    timeLeft=15;
    timer.style.display="flex";
    shuffleQuestions();
}

//Function to shuffle questions
const shuffleQuestions = ()=> {
    for(let i=quiz.length-1 ; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    ShowQuestions();
}

//adding event to start buton
startBtn.addEventListener('click',()=>{
    startBtn.style.display= "none";
    container.style.display="block";
    startQuiz();
});


nextBtn.addEventListener('click', ()=>{
    const selectedChoice= document.querySelector('.choice.selected');
       if(!selectedChoice && nextBtn.textContent==="Next"){
       // alert("Select Your Answer");
        displayAlert("Select Your Answer");
        return;
       }
       if(quizOver){
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        startQuiz();
        quizOver=false;
        score=0;
       }
       else{
        checkAnswer();
       }  

});

