const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldButtonRegex = /<a href="https:\/\/wa\.me\/2348160761870\?text=Hello%20M%26B%20Fashion%20World%2C%20I%20want%20to%20order" class="floating-wa-usa.*?<\/a>/s;

const newWidgetHtml = `
    <!-- WhatsApp Widget -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        <!-- Chat Popup -->
        <div id="wa-widget-popup" class="bg-white rounded-2xl shadow-2xl w-80 mb-4 overflow-hidden transform scale-0 origin-bottom-right transition-transform duration-300 opacity-0 pointer-events-none">
            <!-- Header -->
            <div class="bg-green-600 p-4 text-white flex items-center gap-3">
                <div class="relative">
                    <img src="https://i.ibb.co/9HzZCWjP/logo5.png" alt="M&B Fashion World" class="w-10 h-10 rounded-full bg-white object-contain p-1 border-2 border-green-400">
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <h4 class="font-bold text-sm">M&B Fashion World</h4>
                    <p class="text-xs text-green-100">Typically replies instantly</p>
                </div>
                <button id="wa-widget-close" class="ml-auto text-white/80 hover:text-white focus:outline-none min-h-[48px] px-2" aria-label="Close chat">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <!-- Chat Body -->
            <div class="bg-[#e5ddd5] p-4 h-48 overflow-y-auto relative" style="background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-size: cover; background-blend-mode: overlay; background-color: rgba(229, 221, 213, 0.9);">
                <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-sm inline-block max-w-[85%] text-sm text-gray-800 relative mb-2">
                    Hi there! 👋 <br><br>Welcome to M&B Fashion World. Are you looking to make a custom bespoke inquiry or explore our collections?
                    <span class="text-[10px] text-gray-400 absolute bottom-1 right-2 block text-right mt-1" id="wa-time">10:00</span>
                </div>
            </div>
            
            <!-- Chat Input area -->
            <div class="p-3 bg-gray-50 border-t border-gray-100 flex gap-2 items-center">
                <input type="text" id="wa-widget-input" class="w-full bg-white border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="Type a message..." aria-label="Type your message">
                <button id="wa-widget-send" class="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition-colors focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center" aria-label="Send message">
                    <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                </button>
            </div>
        </div>

        <!-- Floating Button -->
        <button id="wa-widget-toggle" class="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center transform hover:scale-110 min-h-[48px] focus:outline-none relative" aria-label="Open WhatsApp Chat">
            <!-- Notification Badge -->
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">1</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.388 0 12.037c0 2.128.555 4.195 1.611 6.012L.15 23.475l5.576-1.46c1.761.968 3.743 1.481 5.795 1.481h.01c6.645 0 12.035-5.387 12.035-12.036C23.565 5.388 18.18 0 12.031 0zm.01 21.498h-.008c-1.802 0-3.568-.485-5.112-1.401l-.367-.218-3.8.995.998-3.705-.239-.379a9.972 9.972 0 0 1-1.528-5.387c0-5.503 4.476-9.982 9.98-9.982 5.505 0 9.982 4.479 9.982 9.982 0 5.503-4.477 9.981-9.982 9.981zM17.5 14.156c-.302-.152-1.789-.884-2.066-.985-.276-.102-.477-.152-.678.152-.202.304-.779.985-.955 1.188-.176.202-.353.228-.654.076-1.54-.777-2.614-1.391-3.619-2.646-.263-.328.026-.307.319-.893.101-.202.05-.38-.025-.532-.075-.152-.678-1.636-.931-2.244-.246-.593-.497-.512-.678-.521-.176-.008-.378-.008-.579-.008s-.528.076-.805.38c-.277.304-1.055 1.03-1.055 2.511s1.08 2.912 1.231 3.115c.151.202 2.124 3.242 5.143 4.545.719.31 1.28.495 1.718.634.721.229 1.378.196 1.895.119.58-.087 1.789-.731 2.041-1.439.252-.708.252-1.314.176-1.439-.075-.125-.277-.201-.579-.353z"></path>
            </svg>
        </button>
    </div>

    <!-- WhatsApp Widget Script -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const toggleBtn = document.getElementById('wa-widget-toggle');
            const closeBtn = document.getElementById('wa-widget-close');
            const popup = document.getElementById('wa-widget-popup');
            const sendBtn = document.getElementById('wa-widget-send');
            const inputField = document.getElementById('wa-widget-input');
            const timeSpan = document.getElementById('wa-time');
            
            // Set current time
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            if(timeSpan) timeSpan.innerText = hours + ':' + minutes + ' ' + ampm;

            function togglePopup() {
                if(popup.classList.contains('scale-0')) {
                    popup.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
                    popup.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
                    // Hide notification badge when opened
                    const badge = toggleBtn.querySelector('span.animate-pulse');
                    if(badge) badge.style.display = 'none';
                    // Focus input
                    setTimeout(() => inputField.focus(), 300);
                } else {
                    popup.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
                    popup.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
                }
            }

            function sendMessage() {
                const message = inputField.value.trim() || 'Hello M&B Fashion World, I want to order';
                const url = \`https://wa.me/2348160761870?text=\${encodeURIComponent(message)}\`;
                window.open(url, '_blank');
                inputField.value = '';
                togglePopup(); // Optional: close widget after sending
            }

            if(toggleBtn) toggleBtn.addEventListener('click', togglePopup);
            if(closeBtn) closeBtn.addEventListener('click', togglePopup);
            
            if(sendBtn) sendBtn.addEventListener('click', sendMessage);
            if(inputField) {
                inputField.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') sendMessage();
                });
            }
        });
    </script>
`;

html = html.replace(oldButtonRegex, newWidgetHtml);
fs.writeFileSync('index.html', html);
console.log('Replaced WA button with widget');
