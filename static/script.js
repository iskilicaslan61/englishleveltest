let shuffledQuestions = [];
let selectedAnswers = {};

function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function startTest() {
  const nameInput = document.getElementById('student-name');
  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }
  const sanitizedName = sanitizeInput(name);
  if (sanitizedName !== name || name.match(/[<>\"&]/)) {
    alert("Invalid characters in name. Please use letters, numbers, and spaces only.");
    return;
  }

  document.getElementById('name-section').classList.add('hidden');
  document.getElementById('test-section').classList.remove('hidden');
  document.getElementById('progress').innerText = `Question 1 of ${questions.length}`;

  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';
  shuffledQuestions.forEach((q, index) => {
    const questionHTML = `
      <div class="question-card p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <p class="text-lg font-medium text-gray-800">${index + 1}. ${q.text}</p>
        <div class="mt-4 space-y-2">
          ${q.options.map(option => `
            <label class="block">
              <input type="radio" name="q${index}" value="${option}" 
                ${selectedAnswers[`q${index}`] === option ? 'checked' : ''} 
                required class="mr-2" onchange="saveAnswer(${index}, this.value)">
              ${option}
            </label>
          `).join('')}
        </div>
      </div>
    `;
    questionsDiv.innerHTML += questionHTML;
  });
}

function saveAnswer(index, value) {
  selectedAnswers[`q${index}`] = value;
}

function goBack() {
  document.getElementById('test-section').classList.add('hidden');
  document.getElementById('name-section').classList.remove('hidden');
}

document.getElementById('test-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  for (let i = 0; i < shuffledQuestions.length; i++) {
    if (!selectedAnswers[`q${i}`] && !document.querySelector(`input[name="q${i}"]:checked`)) {
      alert(`Please answer question ${i + 1} before submitting.`);
      return;
    }
  }

  if (!confirm("Are you sure you want to submit your answers?")) return;

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  submitBtn.innerText = 'Submitting...';

  const name = sanitizeInput(document.getElementById('student-name').value.trim());
  let score = 0;
  shuffledQuestions.forEach((q, index) => {
    const selected = selectedAnswers[`q${index}`] || 
                     (document.querySelector(`input[name="q${index}"]:checked`)?.value);
    if (selected === q.correct) score += 1;
  });

  let level;
  if (score >= 0 && score <= 15) level = "A1"; // Beginner
  else if (score >= 16 && score <= 24) level = "A2"; // Elementary
  else if (score >= 25 && score <= 31) level = "B1"; // Intermediate
  else if (score >= 32 && score <= 36) level = "B2"; // Upper-Intermediate
  else if (score >= 37 && score <= 40) level = "B2+"; // Advanced
  else level = "Invalid score"; // Handle scores outside 0-40

  document.getElementById('test-section').classList.add('hidden');
  document.getElementById('results-section').classList.remove('hidden');
  document.getElementById('student-result').innerText = `${name}, your English level is: ${level} (Score: ${score}/6)`;

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score, level })
    });
    if (response.ok) {
      document.getElementById('email-status').innerText = "Results sent to your teacher!";
    } else {
      const errorData = await response.json();
      document.getElementById('email-status').innerText = `Failed to send results: ${errorData.error || 'Unknown error'}`;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    document.getElementById('email-status').innerText = "Error sending results: Network issue.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.innerText = 'Submit Test';
    selectedAnswers = {};
  }
});
