document.getElementById('askButton').addEventListener('click', () => {
    const question = document.getElementById('questionInput').value;
    if (question.trim() !== '') {
      addMessage('user', question);
      fetchMessage(question);
    }
  });
  
  document.getElementById('surpriseButton').addEventListener('click', () => {
    const surpriseQuestions = ["What's the weather like today?", "Tell me a joke.", "What's the capital of France?"];
    const randomQuestion = surpriseQuestions[Math.floor(Math.random() * surpriseQuestions.length)];
    addMessage('user', randomQuestion);
    fetchMessage(randomQuestion);
  });
  
  function fetchMessage(question) {
    fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })
    .then(response => response.json())
    .then(data => {
      addMessage('model', data.answer);
    })
    .catch(error => console.error('Error fetching message:', error));
  }
  
  function addMessage(sender, message) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.innerText = `${sender === 'user' ? 'You' : 'AI'}: ${message}`;
    chatBox.appendChild(messageDiv);
  }
  