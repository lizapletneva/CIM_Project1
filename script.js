

document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button.option, button.correct"); // Select all answer buttons
    let scoreElement = document.querySelector(".score");
    let questions = document.querySelectorAll(".question"); // Get all question divs
    let startBtn = document.getElementById("start-btn"); // Get the start button

    //let olympicIMG = document.getElementById("olympic-image");
    let olympicSlider = document.querySelector(".image-slider");

    let nextButtons = document.querySelectorAll(".next-btn"); // Select all "Next" buttons
    let learnMoreButtons = document.querySelectorAll(".learn-more-btn"); // Select all "Learn More" buttons
    let score = 0;
    let currentQuestionIndex = 0; // Track which question is being shown




    // Initially, hide all questions and next buttons
    function initializeQuiz() {
        for (let i = 0; i < questions.length; i++) {
            questions[i].style.display = "none"; // Hide all questions
            nextButtons[i].style.display = "none"; // Hide all "Next" buttons initially
            learnMoreButtons[i].style.display = "none"; // Hide all "Learn More" buttons initially
        }
    }







      // Show the first question when the start button is clicked
    startBtn.addEventListener("click", () => {
        startBtn.style.display = "none"; // Hide the start button
        olympicSlider.style.display = "none"; // Hide the Olympic image
        document.querySelector(".image-container").style.display = "none"; // Hide the image slider
        questions[0].style.display = "block"; // Show the first question
    });







    // Show the next question
    function nextQuestion() {
        questions[currentQuestionIndex].style.display = "none"; // Hide the current question
        nextButtons[currentQuestionIndex].style.display = "none"; // Hide the "Next" button after it's clicked
        learnMoreButtons[currentQuestionIndex].style.display = "none"; // Hide the "Learn More" button

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++; // Move to the next question
            questions[currentQuestionIndex].style.display = "block"; // Show the next question
            
            // Reset button styles and enable them for the new question
            let questionButtons = questions[currentQuestionIndex].querySelectorAll("button.option, button.correct");
            for (let button of questionButtons) {
                button.disabled = false;
                button.style.background = ""; // Reset to default
                button.style.color = ''; // Reset to default
                button.classList.remove("no-transform"); // Remove class to enable hover effect and cursor
            }
        } else {
            // Quiz complete
           finishQuiz();
        }
    }







    // Check the answer when the button is clicked
    function check(event) {
        let button = event.target; // Find the clicked button
        let question = button.closest(".question"); // Find the current question
        let name = button.className; // Get class name of the button

        // Display either correct or wrong for the selected button
        if (name === "correct") {
            button.style.background = "#4CAF50";
            button.style.color = 'white';
            score++;
            scoreElement.textContent = score;
            let explanation = question.querySelector(".correctex");
            explanation.style.display = "block";
        } else {
            button.style.background = "#FF474C";
            let explanation = question.querySelector(".incorrectex");
            explanation.style.display = "block";
        }

        let questionButtons = question.querySelectorAll("button.option, button.correct"); // Find all buttons in the current question

        // Disable all buttons after one is clicked
        for (let button of questionButtons) {
            button.disabled = true;
            button.style.color = 'white';
            button.classList.add("no-transform"); // Add class to disable transform effect and cursor
        }
        
        // Show the "Next" and "Learn More" buttons to move to the next question
        nextButtons[currentQuestionIndex].style.display = "inline-block";
        learnMoreButtons[currentQuestionIndex].style.display = "inline-block";
    }








    // Show additional information when "Learn More" is clicked
    function learnMore(event) {
        let question = event.target.closest(".question");
        let learnMoreText = question.querySelector(".learn-more");
        learnMoreText.style.display = (learnMoreText.style.display === "none" || learnMoreText.style.display === "") ? "block" : "none";

        event.target.style.display = "none";

        // Show the "Next" button again
        nextButtons[currentQuestionIndex].style.display = "inline-block";
    }







    function finishQuiz() {
        // Hide all questions
        for (let i = 0; i < questions.length; i++) {
            questions[i].style.display = "none";
        }
    
        // Hide the finish message initially
        let finishMessage = document.getElementById("finish");
        finishMessage.style.display = "block"; // Show the completion message
    
        // Update the score in the finish section
        let finalScoreElement = document.querySelector("#finish .score");
        finalScoreElement.textContent = score;
    }

    // Attach the check function to each answer button
    for (let button of buttons) {
        button.onclick = check;
    }

    // Attach the nextQuestion function to each "Next" button
    for (let button of nextButtons) {
        button.addEventListener("click", nextQuestion);
    }

    // Attach the learnMore function to each "Learn More" button
    for (let button of learnMoreButtons) {
        button.addEventListener("click", learnMore);
    }

    // Initialize quiz to hide all questions initially
    initializeQuiz();
});
