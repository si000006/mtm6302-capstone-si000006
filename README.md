# Mock up Explaining
The quiz website uses simple colors and layout to make it easy for users to understand and use. A white background keeps the page clean, while blue buttons help users know where to click. Green and red are used to show correct and wrong answers, which most people recognize quickly. The font is modern and easy to read on both big and small screens. The layout changes depending on screen size, so the website looks good on phones, tablets, and computers.

When users open the site, they first choose a difficulty level. Then they see one quiz question with answer choices. After selecting an answer, they are told if they are correct or not. The number of correct and wrong answers is shown on the screen and saved in the browser, so the user doesn’t lose their progress. A restart button lets them start over anytime. The design is simple but clear, helping users focus on learning and answering.




When I built my quiz website, I started by creating a welcome page where users could select a difficulty level using three buttons. I used HTML to structure the page with a header, footer, and two main sections: the welcome screen and the quiz screen. I styled everything with CSS to match the design mockups, making sure it was clean and responsive. Then, I added JavaScript so that when a user clicked a difficulty button, the welcome screen would disappear and a placeholder question with answer buttons would appear.

I ran into a few issues along the way. At first, clicking the difficulty buttons didn’t do anything. I checked my HTML and found I had accidentally included two sections with the same ID, which confused the JavaScript. After fixing that, the page still didn’t switch screens. I realized the loadQuiz() function was defined inside another function, making it inaccessible. I moved it outside, and everything worked. To solve these problems, I reviewed my code, Googled error messages, and asked classmates to review and give me advice.