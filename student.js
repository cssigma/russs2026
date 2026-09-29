// ============================================
// student.js - СТРАНИЦА УЧЕНИКА
// ============================================

let playerName = null;
let gameId = null;
let currentQuestionId = null;
let selectedOption = null;
let answerSubmitted = false;
let questionListener = null;
let gameStateListener = null;
let playersCountListener = null;
let questionStartTime = null;

// ================ ПОДКЛЮЧЕНИЕ К ИГРЕ ================
function joinGame() {
    const nameInput = document.getElementById('playerName');
    const codeInput = document.getElementById('gameCode');
    
    if (!nameInput || !codeInput) return;
    
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    
    if (!name) {
        alert('❌ Введите ваше имя!');
        nameInput.focus();
        return;
    }
    
    if (name.length < 2) {
        alert('❌ Имя должно быть не короче 2 символов!');
        nameInput.focus();
        return;
    }
    
    if (!code || code.length !== 8 || !/^\d+$/.test(code)) {
        alert('❌ Введите корректный код из 8 цифр!');
        codeInput.focus();
        return;
    }
    
    const gameIdToCheck = "game_" + code;
    
    console.log(`🔍 Проверяю игру: ${gameIdToCheck}`);
    
    db.ref('games/' + gameIdToCheck).once('value')
        .then(snapshot => {
            const game = snapshot.val();
            
            if (!game) {
                alert('❌ Игра с таким кодом не найдена!\n\nПроверьте код у учителя.');
                return;
            }
            
            if (game.status === 'finished') {
                alert('❌ Эта игра уже завершена!');
                return;
            }
            
            playerName = name;
            gameId = gameIdToCheck;
            
            console.log(`✅ Подключаюсь к игре ${gameId} как ${playerName}`);
            
            const playerData = {
                name: playerName,
                score: 0,
                joined: Date.now(),
                device: getDeviceType(),
                answers: {}
            };
            
            return db.ref(`games/${gameId}/players/${playerName}`).set(playerData);
        })
        .then(() => {
            if (!gameId) return;
            
            console.log(`✅ Игрок ${playerName} добавлен в игру`);
            
            if (gameStateListener) gameStateListener();
            if (playersCountListener) playersCountListener();
            
            showScreen('waitingScreen');
            
            const displayName = document.getElementById('displayName');
            const displayCode = document.getElementById('displayCode');
            if (displayName) displayName.textContent = playerName;
            if (displayCode) displayCode.textContent = gameId.replace('game_', '');
            
            listenToGameState();
            listenToPlayersCount();
        })
        .catch(error => {
            console.error('❌ Ошибка подключения:', error);
            alert('Ошибка подключения: ' + error.message);
        });
}

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) return '📱 iPhone';
    if (/Android/i.test(ua)) return '📱 Android';
    if (/Windows/i.test(ua)) return '💻 Windows';
    if (/Mac/i.test(ua)) return '💻 Mac';
    if (/Linux/i.test(ua)) return '💻 Linux';
    return '📱 Устройство';
}

function listenToGameState() {
    if (!gameId) return;
    
    console.log(`👂 Слушаю состояние игры ${gameId}`);
    
    db.ref(`games/${gameId}`).on('value', snapshot => {
        const game = snapshot.val();
        if (!game) {
            console.log('⚠️ Игра была удалена');
            leaveGame();
            return;
        }
        
        console.log(`📊 Статус игры: ${game.status}, вопрос: ${game.currentQuestion}`);
        
        if (game.status === 'question_active' && game.currentQuestion) {
            if (currentQuestionId !== game.currentQuestion) {
                currentQuestionId = game.currentQuestion;
                loadQuestion(currentQuestionId);
            }
        } else if (game.status === 'showing_results') {
            showResult();
        } else if (game.status === 'lobby') {
            showScreen('waitingScreen');
        }
    });
}

function listenToPlayersCount() {
    if (!gameId) return;
    
    db.ref(`games/${gameId}/players`).on('value', snapshot => {
        const players = snapshot.val() || {};
        const count = Object.keys(players).length;
        
        const roomPlayers = document.getElementById('roomPlayers');
        if (roomPlayers) roomPlayers.textContent = count;
    });
}

function loadQuestion(questionId) {
    console.log(`📥 Загружаю вопрос ${questionId}`);
    
    const question = QUIZ_DATA.questions.find(q => q.id == questionId);
    
    if (!question) {
        console.error(`❌ Вопрос ${questionId} не найден`);
        return;
    }
    
    selectedOption = null;
    answerSubmitted = false;
    questionStartTime = Date.now();
    
    const currentQ = document.getElementById('currentQ');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const answerStatus = document.getElementById('answerStatus');
    const questionType = document.getElementById('questionType');
    
    if (currentQ) currentQ.textContent = QUIZ_DATA.questions.indexOf(question) + 1;
    if (questionText) questionText.textContent = question.text;
    if (answerStatus) {
        answerStatus.textContent = 'Выберите вариант ответа';
        answerStatus.style.color = 'var(--success)';
    }
    if (questionType) questionType.textContent = 'Русский язык';
    
    if (optionsContainer) {
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button class="option-btn" onclick="selectOption(${index})" data-index="${index}">
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span>${option}</span>
            </button>
        `).join('');
    }
    
    showScreen('questionScreen');
}

function selectOption(index) {
    if (answerSubmitted) {
        console.log('⚠️ Ответ уже отправлен');
        return;
    }
    
    selectedOption = index;
    
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    const answerStatus = document.getElementById('answerStatus');
    if (answerStatus) {
        answerStatus.textContent = '✅ Ответ выбран! Отправка...';
        answerStatus.style.color = 'var(--warning)';
    }
    
    submitAnswer();
}

function submitAnswer() {
    if (!gameId || !playerName || !currentQuestionId || selectedOption === null) {
        console.error('❌ Недостаточно данных для отправки ответа');
        return;
    }
    
    if (answerSubmitted) return;
    answerSubmitted = true;
    
    const question = QUIZ_DATA.questions.find(q => q.id == currentQuestionId);
    if (!question) return;
    
    const isCorrect = selectedOption === question.correct;
    const timeSpent = questionStartTime ? Math.round((Date.now() - questionStartTime) / 1000) : 0;
    
    const answerData = {
        answerIndex: selectedOption,
        isCorrect: isCorrect,
        timeSpent: timeSpent,
        timestamp: Date.now()
    };
    
    console.log(`📤 Отправляю ответ:`, answerData);
    
    db.ref(`games/${gameId}/answers/${currentQuestionId}/${playerName}`).set(answerData)
        .then(() => {
            console.log('✅ Ответ отправлен');
            
            if (isCorrect) {
                db.ref(`games/${gameId}/players/${playerName}/score`).transaction(currentScore => {
                    return (currentScore || 0) + 1;
                });
            }
            
            const answerStatus = document.getElementById('answerStatus');
            if (answerStatus) {
                answerStatus.textContent = isCorrect 
                    ? '✅ Правильно! Ждём остальных...' 
                    : '❌ Неправильно. Ждём остальных...';
                answerStatus.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
            }
        })
        .catch(error => {
            console.error('❌ Ошибка отправки ответа:', error);
            alert('Ошибка отправки ответа: ' + error.message);
            answerSubmitted = false;
        });
}

function showResult() {
    console.log('📊 Показываю результат');
    
    const question = QUIZ_DATA.questions.find(q => q.id == currentQuestionId);
    if (!question) return;
    
    const correctAnswer = question.options[question.correct];
    const wasCorrect = selectedOption === question.correct;
    
    const resultContent = document.getElementById('resultContent');
    if (resultContent) {
        resultContent.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">
                ${wasCorrect ? '✅' : '❌'}
            </div>
            <h3 style="color: ${wasCorrect ? 'var(--success)' : 'var(--danger)'}; margin-bottom: 20px; font-size: 1.5rem;">
                ${wasCorrect ? 'Правильно!' : 'Неправильно'}
            </h3>
            <div style="background: rgba(0, 255, 136, 0.1); padding: 20px; border-radius: 12px; margin: 20px 0; border: 2px solid var(--success);">
                <p style="color: var(--gray); margin-bottom: 10px;">Правильный ответ:</p>
                <p style="color: var(--success); font-weight: bold; font-size: 1.1rem;">${correctAnswer}</p>
            </div>
            <p style="color: var(--gray); font-style: italic; text-align: left; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                ${question.explanation}
            </p>
        `;
    }
    
    showScreen('resultScreen');
}

function leaveGame() {
    if (!gameId || !playerName) {
        showScreen('joinScreen');
        return;
    }
    
    if (confirm('Вы уверены, что хотите выйти из игры?')) {
        db.ref(`games/${gameId}/players/${playerName}`).remove()
            .then(() => {
                console.log('✅ Игрок удален из игры');
                
                if (gameStateListener) gameStateListener();
                if (playersCountListener) playersCountListener();
                
                gameId = null;
                playerName = null;
                currentQuestionId = null;
                selectedOption = null;
                answerSubmitted = false;
                
                showScreen('joinScreen');
                
                const nameInput = document.getElementById('playerName');
                const codeInput = document.getElementById('gameCode');
                if (nameInput) nameInput.value = '';
                if (codeInput) codeInput.value = '';
            })
            .catch(error => {
                console.error('❌ Ошибка выхода:', error);
                showScreen('joinScreen');
            });
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

window.joinGame = joinGame;
window.leaveGame = leaveGame;
window.selectOption = selectOption;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Student page loaded');
    
    const codeInput = document.getElementById('gameCode');
    if (codeInput) {
        codeInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '').slice(0, 8);
        });
        
        codeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                joinGame();
            }
        });
    }
    
    const nameInput = document.getElementById('playerName');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const codeInput = document.getElementById('gameCode');
                if (codeInput) codeInput.focus();
            }
        });
    }
});
