// Selecting elements
const container = document.querySelector(".container");
const logButton = document.getElementById("log-btn");
const skillInput = document.getElementById("skill");
const durationInput = document.getElementById("duration");
const goalSkillInput = document.getElementById("goal-skill");
const goalDurationInput = document.getElementById("goal-duration");
const setGoalButton = document.getElementById("set-goal-btn");
const goalProgressBars = document.getElementById("goal-progress-bars");
const skillTipsSection = document.getElementById("skill-tips");

// Load skill goals from localStorage if available
let skillGoals = JSON.parse(localStorage.getItem("skillGoals")) || {};
let skillData = []; // Initialize an empty array for skill data

// Event listeners
logButton.addEventListener("click", logPractice);
setGoalButton.addEventListener("click", setSkillGoal);

// Log skill practice function
function logPractice() {
  const skill = skillInput.value.trim();
  const duration = parseFloat(durationInput.value);

  if (!skill || isNaN(duration) || duration <= 0) {
    return;
  }

  skillData.push({ skill, duration, color: getRandomColor() });
  updateProgressChart();
  updateSkillTips(skill);
  updateGoalProgress();
  skillInput.value = "";
  durationInput.value = "";
}

// Set skill goal function
function setSkillGoal() {
    const selectedSkill = goalSkillInput.value.trim();
    const goalDuration = parseFloat(goalDurationInput.value);
  
    if (!selectedSkill || isNaN(goalDuration) || goalDuration <= 0) {
      return;
    }
  
    skillGoals[selectedSkill] = goalDuration;
    updateGoalList();
    updateProgressChart();
    updateGoalProgress();
    goalSkillInput.value = "";
    goalDurationInput.value = "";
  
    // Save skill goals to localStorage
    localStorage.setItem("skillGoals", JSON.stringify(skillGoals));
}
  
// Update goal list function
function updateGoalList() {
  const goalList = document.createElement("ul");
  goalList.innerHTML = "";

  for (const skill in skillGoals) {
    const listItem = document.createElement("li");
    listItem.textContent = `${skill}: ${skillGoals[skill]} hours`;
    goalList.appendChild(listItem);
  }

  goalProgressBars.innerHTML = "";
  goalProgressBars.appendChild(goalList);
}

// Rest of your functions (updateGoalProgress, updateSkillTips, updateProgressChart, getRandomColor)



// Update goal list function
function updateGoalList() {
    const goalList = document.createElement("ul");
    goalList.innerHTML = "";
  
    for (const skill in skillGoals) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${skill}: ${skillGoals[skill]} hours <button class="delete-goal-btn" onclick="deleteGoal('${skill}')">Delete</button>`;
      goalList.appendChild(listItem);
    }
  
    goalProgressBars.innerHTML = "";
    goalProgressBars.appendChild(goalList);
  }
 // Delete goal function
// Delete goal function
function deleteGoal(skill) {
    delete skillGoals[skill];
    updateGoalList();
    updateProgressChart();
    updateGoalProgress();

    // Update skill goals in localStorage
    localStorage.setItem("skillGoals", JSON.stringify(skillGoals));
}
function updateGoalList() {
    const goalList = document.createElement("ul");
    goalList.innerHTML = "";

    for (const skill in skillGoals) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${skill}: ${skillGoals[skill]} hours <button class="delete-goal-btn" onclick="deleteGoal('${skill}')">Delete</button>`;
        goalList.appendChild(listItem);
    }

    goalProgressBars.innerHTML = "";
    goalProgressBars.appendChild(goalList);
}

  
// Update goal progress function
function updateGoalProgress() {
  goalProgressBars.innerHTML = "";

  for (const skill in skillGoals) {
    const goalProgress = skillData.reduce((total, data) => {
      if (data.skill === skill) {
        return total + data.duration;
      }
      return total;
    }, 0);

    const goalRemaining = skillGoals[skill] - goalProgress;

    const goalProgressElement = document.createElement("div");
    goalProgressElement.className = "goal-progress";
    goalProgressElement.innerHTML = `
      <span class="goal-label">${skill} Goal Progress:</span>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${(goalProgress / skillGoals[skill]) * 100}%"></div>
      </div>
    `;

    const goalRemainingElement = document.createElement("div");
    goalRemainingElement.className = "goal-progress";
    goalRemainingElement.innerHTML = `
      <span class="goal-label">${skill} Goal Remaining:</span>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${(goalRemaining / skillGoals[skill]) * 100}%"></div>
      </div>
    `;

    goalProgressBars.appendChild(goalProgressElement);
    goalProgressBars.appendChild(goalRemainingElement);
  }
}

// Update skill tips function
function updateSkillTips(selectedSkill) {
    const constantTip = "I have goals to keep and miles to go before I sleep";
  
    skillTipsSection.innerHTML = "";
    const tipParagraph = document.createElement("p");
    tipParagraph.textContent = `Tip for ${selectedSkill}: ${constantTip}`;
    skillTipsSection.appendChild(tipParagraph);
  }
  
function updateProgressChart() {
    const skills = [];
    const durations = [];
    const colors = [];
  
    for (const data of skillData) {
      skills.push(data.skill);
      durations.push(data.duration);
      colors.push(data.color); // Use the color stored in skillData
    }
  
    const ctx = document.querySelector("#progress-chart canvas").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: skills,
        datasets: [
          {
            label: "Skill Mastery Progress (hours)",
            data: durations,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Populate skill options function
function populateSkillOptions() {
  const skillOptions = ["Programming", "Cooking", "Guitar", "Dancing"];

  for (const skill of skillOptions) {
    const option = document.createElement("option");
    option.value = skill;
    option.textContent = skill;
    goalSkillSelect.appendChild(option);
  }
}

// Initialize app function
// Initialize app function
function initializeApp() {
    updateGoalList();
    updateProgressChart();
    updateGoalProgress();
}

initializeApp();

