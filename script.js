const API_KEY = 'E0jNeEOo6dandj4HhojRNZMYPlHfvnKc8E1GU8ya';

const state = {
  correct: 0,
  incorrect: 0,
  currentDifficulty: null,
  currentQuestion: null
};

const els = {
  welcome: document.getElementById('welcome-screen'),
  quiz: document.getElementById('quiz-screen'),
  difficultyButtons: document.querySelectorAll('.difficulty-btn'),
  questionText: document.getElementById('question-text'),
  answerForm: document.getElementById('answer-form'),
  result: document.getElementById('result-message'),
  correctCount: document.getElementById('correct-count'),
  incorrectCount: document.getElementById('incorrect-count'),
  resetBtn: document.getElementById('reset-btn')
};

function saveStats() {
  localStorage.setItem('quizStats', JSON.stringify({ correct: state.correct, incorrect: state.incorrect }));
}

function loadStats() {
  const raw = localStorage.getItem('quizStats');
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.correct === 'number') state.correct = parsed.correct;
    if (typeof parsed.incorrect === 'number') state.incorrect = parsed.incorrect;
  } catch {}
}

function updateScoreboard() {
  els.correctCount.textContent = state.correct;
  els.incorrectCount.textContent = state.incorrect;
  saveStats();
}

function showWelcome() {
  els.quiz.classList.add('hidden');
  els.welcome.classList.remove('hidden');
  els.result.classList.add('hidden');
  els.answerForm.innerHTML = '';
  els.questionText.textContent = '';
}

async function loadQuiz(difficulty) {
  state.currentDifficulty = difficulty;
  els.welcome.classList.add('hidden');
  els.quiz.classList.remove('hidden');
  els.result.classList.add('hidden');
  els.answerForm.innerHTML = '';
  els.questionText.textContent = 'Loading...';
  try {
    const url = `https://quizapi.io/api/v1/questions?limit=1&difficulty=${encodeURIComponent(difficulty)}`;
    const res = await fetch(url, { headers: { 'X-Api-Key': API_KEY } });
    if (!res.ok) throw new Error('bad status');
    const data = await res.json();
    const q = Array.isArray(data) && data.length ? data[0] : null;
    if (!q) throw new Error('no question');
    state.currentQuestion = q;
    renderQuestion(q);
  } catch {
    els.questionText.textContent = 'Unable to load a question. Please try again.';
  }
}

function renderQuestion(q) {
  els.result.classList.add('hidden');
  els.questionText.textContent = q.question || 'Question';
  els.answerForm.innerHTML = '';
  const answerKeys = ['answer_a','answer_b','answer_c','answer_d','answer_e','answer_f'];
  answerKeys.forEach(k => {
    const label = q.answers && q.answers[k];
    if (!label) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'answer-btn';
    btn.textContent = label;
    const isCorrect = q.correct_answers && q.correct_answers[`${k}_correct`] === 'true';
    btn.dataset.correct = isCorrect ? '1' : '0';
    btn.addEventListener('click', onAnswerClick);
    els.answerForm.appendChild(btn);
  });
}

function onAnswerClick(e) {
  const buttons = els.answerForm.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  const isCorrect = e.currentTarget.dataset.correct === '1';
  if (isCorrect) {
    state.correct += 1;
    els.result.textContent = 'Correct!';
    els.result.style.color = 'green';
  } else {
    state.incorrect += 1;
    els.result.textContent = 'Incorrect!';
    els.result.style.color = 'red';
  }
  updateScoreboard();
  els.result.classList.remove('hidden');
  setTimeout(showWelcome, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  updateScoreboard();
  els.difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => loadQuiz(btn.dataset.difficulty));
  });
  els.resetBtn.addEventListener('click', () => {
    state.correct = 0;
    state.incorrect = 0;
    updateScoreboard();
    showWelcome();
  });
  showWelcome();
});
