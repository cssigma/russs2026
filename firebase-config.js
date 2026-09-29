// ============================================
// firebase-config.js - ГЛАВНЫЙ КОНФИГУРАЦИОННЫЙ ФАЙЛ
// ============================================

// 🔥 КОНФИГУРАЦИЯ FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAcY5ZUvWUQAQFdpIa5Y4aMgwqn0rXce_s",
    authDomain: "mediavolnapp-test-26.firebaseapp.com",
    databaseURL: "https://mediavolnapp-test-26-default-rtdb.firebaseio.com",
    projectId: "mediavolnapp-test-26",
    storageBucket: "mediavolnapp-test-26.firebasestorage.app",
    messagingSenderId: "146069036344",
    appId: "1:146069036344:web:ae57398b51fb509fef75cd"
};

// Инициализация Firebase (compat-версия)
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.database();
    console.log("✅ Firebase инициализирован");
    console.log("📡 Проект:", firebaseConfig.projectId);
} catch (error) {
    console.error("❌ Ошибка Firebase:", error);
    alert("Ошибка подключения к базе данных. Проверьте консоль.");
}

// 📚 10 ЗАДАНИЙ ПО РУССКОМУ ЯЗЫКУ (ЧЕРЕДУЮЩИЕСЯ ГЛАСНЫЕ В КОРНЕ)
window.QUIZ_DATA = {
    id: "russian_vowels_quiz",
    title: "Русский язык - Чередующиеся гласные в корне",
    description: "10 вопросов по теме чередующихся гласных в корне слова",
    subject: "Русский язык",
    author: "Урок русского языка для 9 класса",
    version: "2025.1",
    questions: [
        // ЗАДАНИЯ 1-5: ОСНОВЫ ПРАВОПИСАНИЯ КОРНЕЙ
        {
            id: 1,
            type: "basics",
            text: "В каком слове пропущена буква А?",
            options: [
                "1) прик..сновение",
                "2) заг..реть",
                "3) выр..щенный",
                "4) изл..жить"
            ],
            correct: 2,
            explanation: "В корне -раст-/-ращ-/-рос- перед СТ и Щ пишется А: вырАщенный.",
            points: 1,
            difficulty: "medium"
        },
        {
            id: 2,
            type: "basics",
            text: "В каком слове пропущена буква О?",
            options: [
                "1) з..рница",
                "2) ср..стись",
                "3) заг..рать",
                "4) предл..гать"
            ],
            correct: 2,
            explanation: "В корне -гар-/-гор- без ударения пишется О: загОрать.",
            points: 1,
            difficulty: "medium"
        },
        {
            id: 3,
            type: "basics",
            text: "В каком слове пропущена буква А?",
            options: [
                "1) оз..рённый",
                "2) уг..реть",
                "3) несг..раемый",
                "4) водор..сли"
            ],
            correct: 0,
            explanation: "В корне -зар-/-зор- без ударения пишется А: озАрённый.",
            points: 1,
            difficulty: "medium"
        },
        {
            id: 4,
            type: "basics",
            text: "В каком слове на месте пропуска пишется буква О?",
            options: [
                "1) нар..щение",
                "2) неприк..саемый",
                "3) оз..ряющий",
                "4) пог..релец"
            ],
            correct: 3,
            explanation: "В корне -гар-/-гор- без ударения пишется О: погОрелец.",
            points: 1,
            difficulty: "medium"
        },
        {
            id: 5,
            type: "basics",
            text: "В каком слове выбор гласной в корне не подчиняется общему правилу?",
            options: [
                "1) р..сточек",
                "2) изл..жение",
                "3) к..сательная",
                "4) заг..релый"
            ],
            correct: 0,
            explanation: "Слово РОСТОК — исключение: пишется с буквой О, хотя перед СТ должно быть А.",
            points: 1,
            difficulty: "hard"
        },
        // ЗАДАНИЯ 6-10: ПРИМЕНЕНИЕ ПРАВИЛ
        {
            id: 6,
            type: "applications",
            text: "В каком слове на месте пропуска пишется буква А?",
            options: [
                "1) зар..сли тростника",
                "2) зар..сли травой",
                "3) отр..сли волосы",
                "4) отр..сли производства"
            ],
            correct: 3,
            explanation: "В значении «отрасль» пишется О: отрОсли производства. В остальных случаях — отрАсли.",
            points: 1,
            difficulty: "hard"
        },
        {
            id: 7,
            type: "applications",
            text: "В каком слове на месте пропуска пишется буква О?",
            options: [
                "1) возр..ст не ограничен",
                "2) костюм на выр..ст",
                "3) по возр..станию",
                "4) выр..стить огурцы"
            ],
            correct: 1,
            explanation: "В слове «вырост» (суффикс -ост-) пишется О. В остальных — вырАст-.",
            points: 1,
            difficulty: "hard"
        },
        {
            id: 8,
            type: "applications",
            text: "В каком ряду во всех словах на месте пропусков пишется буква О?",
            options: [
                "1) з..ря, сл..жение, подр..сли",
                "2) к..саться, р..стовщик, пор..сль",
                "3) предл..жение, р..стовский, выг..реть",
                "4) самовозг..раемость, предл..гать, р..стение"
            ],
            correct: 2,
            explanation: "ПредлОжение (перед Ж — О), рОстовский (искл.), выгОреть (без ударения — О).",
            points: 1,
            difficulty: "hard"
        },
        {
            id: 9,
            type: "properties",
            text: "В каком ряду в обоих словах на месте пропусков пишется чередующаяся безударная гласная?",
            options: [
                "1) р..скошный, выр..сший",
                "2) р..стениеводство, ср..статься",
                "3) соприк..саться, к..соворотка",
                "4) г..ристый, г..релый"
            ],
            correct: 1,
            explanation: "РАстениеводство (корень -раст-), сРАстаться (корень -раст-) — чередующиеся гласные.",
            points: 1,
            difficulty: "hard"
        },
        {
            id: 10,
            type: "properties",
            text: "В каком ряду все слова являются однокоренными?",
            options: [
                "1) растереть, растить, растворить",
                "2) росинка, подрос, подросток",
                "3) горизонт, пригорок, сгореть",
                "4) предлагать, возложить, расположить"
            ],
            correct: 3,
            explanation: "Корень -лож-/-лаг-: предлАгать, возлОжить, располОжить — однокоренные.",
            points: 1,
            difficulty: "hard"
        }
    ]
};

console.log(`✅ Загружено ${QUIZ_DATA.questions.length} заданий по русскому языку`);

// 🛠️ СИСТЕМА МОДЕРАТОРОВ
window.moderatorSystem = {
    MODERATOR_PASSWORD: "Russian2025",
    
    isModerator() {
        return localStorage.getItem('isModerator') === 'true';
    },
    
    setModerator(status) {
        localStorage.setItem('isModerator', status);
        console.log(`🔧 Статус модератора: ${status ? 'ВКЛ' : 'ВЫКЛ'}`);
    },
    
    showPasswordModal() {
        const modalHTML = `
            <div id="moderatorModal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                padding: 20px;
            ">
                <div style="
                    background: #1a1a2e;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 400px;
                    width: 100%;
                    border: 3px solid #00adb5;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                ">
                    <h3 style="color: #00ff88; text-align: center; margin-bottom: 20px;">
                        🔧 Режим модератора
                    </h3>
                    <p style="color: #8f8f8f; text-align: center; margin-bottom: 20px;">
                        Введите пароль для доступа к функциям модератора
                    </p>
                    <input type="password" 
                           id="moderatorPassword" 
                           placeholder="Пароль"
                           style="
                                width: 100%;
                                padding: 15px;
                                background: rgba(255,255,255,0.1);
                                border: 2px solid #393e46;
                                border-radius: 8px;
                                color: white;
                                font-size: 16px;
                                margin-bottom: 15px;
                           ">
                    <div style="display: flex; gap: 10px;">
                        <button onclick="moderatorSystem.checkPassword()" 
                                style="
                                    flex: 1;
                                    padding: 15px;
                                    background: #00adb5;
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    font-weight: bold;
                                    cursor: pointer;
                                ">
                            Войти
                        </button>
                        <button onclick="moderatorSystem.hideModal()"
                                style="
                                    padding: 15px 25px;
                                    background: #ff416c;
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    font-weight: bold;
                                    cursor: pointer;
                                ">
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        setTimeout(() => {
            const input = document.getElementById('moderatorPassword');
            if (input) input.focus();
        }, 100);
    },
    
    checkPassword() {
        const input = document.getElementById('moderatorPassword');
        if (!input) return;
        
        if (input.value === this.MODERATOR_PASSWORD) {
            this.setModerator(true);
            this.hideModal();
            this.showModeratorControls();
            alert('✅ Вы вошли как модератор!');
        } else {
            alert('❌ Неверный пароль!');
            input.value = '';
            input.focus();
        }
    },
    
    hideModal() {
        const modal = document.getElementById('moderatorModal');
        if (modal) modal.remove();
    },
    
    showModeratorControls() {
        const style = document.createElement('style');
        style.textContent = `
            .moderator-badge {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff9e00, #ff6d00);
                color: white;
                padding: 10px 15px;
                border-radius: 25px;
                font-weight: bold;
                z-index: 9999;
                box-shadow: 0 4px 15px rgba(255, 106, 0, 0.3);
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }
            
            .moderator-panel {
                position: fixed;
                bottom: 80px;
                right: 20px;
                background: #1a1a2e;
                border: 2px solid #ff9e00;
                border-radius: 10px;
                padding: 15px;
                z-index: 9998;
                min-width: 250px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                display: none;
            }
            
            .moderator-panel.active {
                display: block;
            }
            
            .moderator-btn {
                width: 100%;
                padding: 10px;
                margin: 5px 0;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid #ff9e00;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                text-align: left;
            }
        `;
        document.head.appendChild(style);
        
        if (!document.getElementById('moderatorBadge')) {
            const badge = document.createElement('div');
            badge.id = 'moderatorBadge';
            badge.className = 'moderator-badge';
            badge.innerHTML = '🔧 Модератор';
            badge.onclick = () => {
                const panel = document.getElementById('moderatorPanel');
                if (panel) panel.classList.toggle('active');
            };
            document.body.appendChild(badge);
            
            const panel = document.createElement('div');
            panel.id = 'moderatorPanel';
            panel.className = 'moderator-panel';
            panel.innerHTML = `
                <h4 style="color: #ff9e00; margin-top: 0; margin-bottom: 10px;">Управление игрой</h4>
                <button class="moderator-btn" onclick="moderatorSystem.kickLastPlayer()">
                    🚫 Удалить последнего
                </button>
                <button class="moderator-btn" onclick="moderatorSystem.listPlayers()">
                    📋 Список игроков
                </button>
                <button class="moderator-btn" onclick="moderatorSystem.resetGame()">
                    🔄 Сбросить игру
                </button>
                <button class="moderator-btn" onclick="moderatorSystem.exitModerator()">
                    🚪 Выйти
                </button>
            `;
            document.body.appendChild(panel);
        }
    },
    
    kickLastPlayer() {
        if (!window.currentGameId) {
            alert('Сначала создайте игру!');
            return;
        }
        
        db.ref(`games/${currentGameId}/players`).once('value').then(snapshot => {
            const players = snapshot.val();
            if (!players) {
                alert('Нет игроков в игре');
                return;
            }
            
            const playerNames = Object.keys(players);
            const lastPlayer = playerNames[playerNames.length - 1];
            
            if (confirm(`Удалить игрока "${lastPlayer}"?`)) {
                db.ref(`games/${currentGameId}/players/${lastPlayer}`).remove()
                    .then(() => alert(`Игрок ${lastPlayer} удален`));
            }
        });
    },
    
    listPlayers() {
        if (!window.currentGameId) {
            alert('Сначала создайте игру!');
            return;
        }
        
        db.ref(`games/${currentGameId}/players`).once('value').then(snapshot => {
            const players = snapshot.val();
            if (!players) {
                alert('Нет игроков');
                return;
            }
            
            const list = Object.keys(players).map(name => `• ${name}`).join('\n');
            alert(`Игроки (${Object.keys(players).length}):\n\n${list}`);
        });
    },
    
    resetGame() {
        if (!window.currentGameId) {
            alert('Нет активной игры');
            return;
        }
        
        if (confirm('Сбросить всю игру? Все данные будут удалены.')) {
            db.ref(`games/${currentGameId}`).remove()
                .then(() => {
                    alert('Игра сброшена');
                    window.currentGameId = null;
                });
        }
    },
    
    exitModerator() {
        this.setModerator(false);
        const badge = document.getElementById('moderatorBadge');
        const panel = document.getElementById('moderatorPanel');
        if (badge) badge.remove();
        if (panel) panel.remove();
        alert('Режим модератора выключен');
    }
};

console.log("✅ Система модераторов загружена");
console.log("🔑 Пароль: Russian2025");

// 🔧 ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', function() {
    console.log("📚 Квиз по русскому языку готов к работе!");
    console.log(`Тема: ${QUIZ_DATA.title}`);
    console.log(`Вопросов: ${QUIZ_DATA.questions.length}`);
    
    document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.key === 'M') {
            moderatorSystem.showPasswordModal();
        }
    });
    
    console.log("🔧 Для входа модератора нажмите Shift+M");
});
