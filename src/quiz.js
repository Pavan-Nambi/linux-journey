const createQuiz = (question, correctAnswer) => {
    const quiz = document.querySelector("#quiz");
    
    const questionPara = document.createElement("p");
    questionPara.textContent = question;
    quiz.appendChild(questionPara);
    
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.id = "answer";
    quiz.appendChild(answerInput);
    
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.id = "submit-button";
    quiz.appendChild(submitButton);
    
    const result = document.createElement("p");
    result.id = "result";
    quiz.appendChild(result);
    
    const responses = [
      "lets go mate, time to hack NASA!",
      "My boy is on roll!",
      "Incredible! You're on fire today!",
      "You are winning son!!",

    ];

    
    submitButton.addEventListener("click", () => {
      const answer = answerInput.value.toLowerCase();
      const correctAnswerLower = correctAnswer.toLowerCase();
      result.textContent = (answer === correctAnswerLower)
        ? responses[Math.floor(Math.random() * responses.length)]
        : `Oh no! Better luck next time. The correct answer is ${correctAnswer}.`;
    });
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    createQuiz("Who developed the Linux kernel?", "Linus Torvalds");
  });
  