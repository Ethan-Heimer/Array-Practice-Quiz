class Question{
    constructor(question, rightAnswer, answer2, answer3, answer4){
        this.question = question;

        this.answers = [
            this.rightAnswer = rightAnswer,
            this.answer2 = answer2,
            this.answer3 = answer3,
            this.answer4 = answer4 
        ];
    }

    checkAnswer(answer){
        QuizHandler.ValidateAnswer(answer===this.answers[0]);
    }
}

class QuizHandler{
    static Questions = [new Question("Which of the following browser supports HTML5 in its latest version?", "Both", "Opera", "Firefox", "None"),
                        new Question("Which of the following tag represents a section of the document intended for navigation in HTML5?", "Nav", "Footer", "Section", "Dialog"),
                        new Question("Which of the following input control is used for input fields that should contain an e-mail address in Web Form 2.0?", "email", "url", "number", "range"),
                        new Question("Which of the following tag provides a hint to the user of what can be entered in the field in HTML5?", "Placeholder", "Output", "Autofocus", "Required"),
                        new Question("Which value of Socket.readyState atribute of WebSocket indicates that the connection has been closed or could not be opened?", "3", "2", "1", "0")];

    static currentQuestionId = 0;

    static ValidateAnswer(isAnswerCorrect){
        if(isAnswerCorrect && this.currentQuestionId < this.Questions.length){
            UI.AddScore();
        }

        this.currentQuestionId = this.currentQuestionId < this.Questions.length ? this.currentQuestionId+1 : this.currentQuestionId; 
        UI.displayQuestion(this.Questions[this.currentQuestionId]);
    }

    static StartQuiz(){
        this.currentQuestionId = 0;
        UI.displayQuestion(this.Questions[this.currentQuestionId]);
    }
}

class UI{
    static displayQuestion(question){
        const questionDisplay = document.getElementById("question");
        
        const buttons = [document.getElementById("answer1"),
                        document.getElementById("answer2"), 
                        document.getElementById("answer3"),
                        document.getElementById("answer4")];

        questionDisplay.textContent = question.question;
        
        const possableAnswers = [...question.answers]; 

        for(var i = 0; i < question.answers.length; i++){
            let answerId = Math.floor(Math.random()*possableAnswers.length);
            let answer = possableAnswers[answerId];

            buttons[i].textContent = answer;
            buttons[i].onclick = () => question.checkAnswer(answer);

            possableAnswers.splice(answerId,1);
        }
    }

    static score = 0;
    static AddScore(){
        this.score += 1; 

        const scoreBar = document.getElementById("scoreBar");

        scoreBar.textContent = `Score: ${this.score}/${QuizHandler.Questions.length}`;
        scoreBar.style.width = (this.score/QuizHandler.Questions.length) * 75 + "%"
    }
}

QuizHandler.StartQuiz();