const input = document.getElementById("terminalInput");
const outputArea = document.getElementById("outputArea");
const promptText = document.getElementById("promptText");

const commands = {
    "help": {
        description: "get list of commands",
        action: () => {
            let helpText = "Available Commands:\n";
            const padLength = 14;

            for (const cmd in commands) {
                const formattedCmd = cmd.padEnd(padLength, " ");
                helpText += `${formattedCmd}${commands[cmd].description}\n`;
            }
            typewriter(helpText);
        },
    },
    "about me": {
        description: "more about me",
        action: () =>
            typewriter(
`Hey! I'm Chia Jia En, a full-stack developer in training.\n
I enjoy building solutions that not only look great but actually make my life, and hopefully others, easier. \
With experience in React, Flutter, Django, Node.js, and Firebase, \
I've worked across both frontend and backend from design to deployment.\n
I’m always curious, always learning, and excited to contribute to meaningful projects where I can grow and make an impact.`
              ),
            },
    "resume": {
        description: "view my resume",
        action: () => {

          typewriter("Resume opened in another window.");
          window.open("assets/ChiaJiaEn_resume.pdf", "_blank");
        },
    },
    "projects":{
        description: "list of my projects",
        action: () => typewriter("Projects coming soon..."),
    },
    "links": {
        description: "my socials",
        action: () =>
          typewriter(
            `<strong style="color:#ff6138 !important;">GitHub:</strong> ` +
            `<a href="https://github.com/jeeem-bit" target="_blank">github.com/jeeem-bit</a><br>` +
            `<strong style="color:#ff6138 !important;">LinkedIn:</strong> ` + 
            `<a href="https://linkedin.com/in/jia-en-chia-686b5a26b" target="_blank">linkedin.com/in/ChiaJiaEn</a>`
          ),
    },
    "contact me": {
        description: "my email",
        action: () => typewriter(`📬 You can reach me at: <a href="mailto:jiaen873@gmail.com" style="color:#60a5fa !important; font-weight:bold;">jiaen873@gmail.com</a><br>` +
    `Looking forward to hearing from you!`),
    },
    "clear": {
        description: "clear terminal",
        action: () => (outputArea.innerHTML = ""),
    },
};

function getPrompt() {
  const now = new Date().toLocaleString();
  return `guest@jiaen_portfolio [${now}] ~$`;
}

function updatePrompt() {
  promptText.textContent = getPrompt();
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const value = input.value.trim().toLowerCase();
    input.value = "";
    handleCommand(value);
  }
});

function handleCommand(cmd) {
  const command = commands[cmd];
  if (command && command.action) {
    command.action();
  } else {
    typewriter(
      `'${cmd}' is not a recognized command. Type 'help' for options.`
    );
  }
}

function typewriter(htmlText) {
  outputArea.innerHTML = ""; // clear output
  let i = 0;
  let isTag = false;
  let currentTag = "";
  let displayText = "";

  function typeNext() {
    if (i >= htmlText.length) return;

    let char = htmlText[i];

    if (char === "<") {
      isTag = true;
      currentTag += char;
    } else if (char === ">") {
      currentTag += char;
      displayText += currentTag;
      outputArea.innerHTML = displayText;
      currentTag = "";
      isTag = false;
    } else if (isTag) {
      currentTag += char;
    } else {
      displayText += char;
      outputArea.innerHTML = displayText;
    }

    i++;
    setTimeout(typeNext, isTag ? 0 : 10); // skip delay for tags
  }

  typeNext();
}

updatePrompt();
setInterval(updatePrompt, 1000);