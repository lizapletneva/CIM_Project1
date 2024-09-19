document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button.option, button.correct"); // Select all answer buttons
    let scoreElement = document.querySelector(".score");
    let questions = document.querySelectorAll(".question"); // Get all question divs
    let startBtn = document.getElementById("start-btn"); // Get the start button
    let nextBtn = document.createElement("button"); // Create the next button dynamically
    let olympicIMG = document.getElementById("olympic-image");
    nextBtn.textContent = "Next"; // Set button text
    nextBtn.id = "next-btn"; // Set an ID for the next button
    let score = 0;
    let currentQuestionIndex = 0; // Track which question is being shown

    // Initially, hide all questions and the next button
    function initializeQuiz() {
        for (let i = 0; i < questions.length; i++) {
            questions[i].style.display = "none"; // Hide all questions
        }
        nextBtn.style.display = "none"; // Hide the next button initially
        document.body.appendChild(nextBtn); // Add the next button to the document
    }

    // Show the next question
    function nextQuestion() {
        questions[currentQuestionIndex].style.display = "none"; // Hide the current question
        nextBtn.style.display = "none"; // Hide the "Next" button after it's clicked
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
            document.querySelector("#finish").style.display = "block"; // Show the completion message
            nextBtn.style.display = "none"; // Hide the next button
        }
    }

    // Check the answer when the button is clicked
    function check(event) {
        let button = event.target; // Find the clicked button
        let question = button.closest(".question"); // Find the current question
        let name = button.className; // Get class name of the button

        // Display either correct or wrong for the selected button
        if (name === "correct") {
            button.style.background = "green";
            button.style.color = 'white';
            score++;
            scoreElement.textContent = score;
            let explanation = question.querySelector(".correctex");
            explanation.style.display = "block";
        } else {
            button.style.background = "red";
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
        
        // Show the "Next" button to move to the next question
        nextBtn.style.display = "inline-block";
    }

    // Show the first question when the start button is clicked
    startBtn.addEventListener("click", () => {
        startBtn.style.display = "none"; // Hide the start button
        olympicIMG.style.display = "none"; //FIX
        questions[0].style.display = "block"; // Show the first question
    });

    // Attach the check function to each answer button
    for (let button of buttons) {
        button.onclick = check;
    }

    // Attach the nextQuestion function to the "Next" button
    nextBtn.addEventListener("click", nextQuestion);

    // Initialize quiz to hide all questions initially
    initializeQuiz();
});
