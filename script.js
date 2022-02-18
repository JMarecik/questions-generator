let xmlFile;
let questions = [];

document.addEventListener('DOMContentLoaded', () => {
  let url = "questions.xml";
  fetch(url)
    .then(response => response.text())
    .then(data => {
      let parser = new DOMParser();
      xmlFile = parser.parseFromString(data, "application/xml");
      parseQuestions();
    });
})

function parseQuestions() {
  let data = xmlFile.getElementsByTagName('q');
  for (let i = 0; i < data.length; i++) {
    questions.push(data[i].firstChild.nodeValue);
  }
}

function getQuestion() {
  let genButton = document.getElementById('genButton');
  genButton.classList.add('genBtnDisabled');
  let questionFrame = document.getElementById('questionFrame');
  questionFrame.classList.remove('animation');
  min = Math.ceil(0);
  max = Math.floor(questions.length);
  randomId = Math.floor(Math.random() * (max - min)) + min;
  void questionFrame.offsetWidth;
  questionFrame.classList.add('animation');
  setTimeout(function () {
    document.getElementById('questionFrame').textContent = questions[randomId];
    questions.splice(randomId, 1);
  }, 1500);
  setTimeout(function () {
    genButton.classList.remove('genBtnDisabled');
  }, 3000);
}

document.addEventListener('keyup', event => {
  if (event.code === 'Space' || event.code === 'Enter') {
    getQuestion()
  }
})