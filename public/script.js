      // the elements
      const startScreen = document.getElementById("start-screen");
      const gameplayScreen = document.getElementById("gameplay");
      const newSaveButton = document.getElementById("new-save");
      const miscButton = document.getElementById("misc-button");
      const miscSection = document.getElementById("misc-section");
      const clickMeButton = document.getElementById("click-me");
      const moneyDisplay = document.getElementById("money-display");
      const dropdownContent = document.getElementById("dropdowncontent");
      const homeButton = document.getElementById("home-button"); // Home button
      const dropdownMenu = document.getElementById("dropdown-menu"); // Dropdown menu
      const dropdownBtn = document.getElementById("dropdown-btn"); // Dropdown button
      const backgroundmusic = document.getElementById("music"); //Background Music ID
      backgroundmusic.volume = 0.06; //Background Music Volume
      const audio = document.getElementById("clicksound");
      clicksound.volume = 0.55;
      // Variables for the game
     
    let money = 0;
      let clickValue = 1;
      let passiveIncome = 0;
      const stalls = {
        1: {
          cost: 10, //cost of the stall
          income: 1, //amount it produces
          upgradeCost: 20, //default upgrade cost
          multiplier: 1.5, //price multiplier for exponential upgrade price thing
          owned: false, //default: shows that you dont own it
        },
        2: {
          cost: 100, //default cost
          income: 10, //amount it produces
          upgradeCost: 200, //default upgrade cost
          multiplier: 1.5, //upgrade price multiplier to make exponential
          owned: false, //default: you dont own it
        },
        3: {
          cost: 1000, //default cost
          income: 100, //amount it produces
          upgradeCost: 2000, //upgrade price multiplier
          multiplier: 1.5, // upgrade price multiplier exponential
          owned: false, //default: means you dont own it
        },
      };

      // Dropdown menu stuff
      dropdownBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("hidden"); //doesnt show it
      });

      // Close the dropdown menu if clicked 
      window.addEventListener("click", (event) => {
        if (
          !event.target.closest("#dropdown-btn") &&
          !event.target.closest("#dropdown-menu")
        ) {
          dropdownMenu.classList.add("hidden"); 
        }
      });

      // Game progress part (Money and Progress Bars)
      setInterval(() => {
        money += passiveIncome;
        updateMoneyDisplay();
        updateProgressBars();
      }, 1000);

      function updateProgressBars() {
        Object.keys(stalls).forEach((stallId) => {
          const progressBar = document.getElementById(
            `progress-${stallId}-bar`
          );
          const stall = stalls[stallId];

          if (stall.owned) {
            progressBar.classList.add("animate");
          } else {
            progressBar.classList.remove("animate");
          }
        });
      }

      function updateMoneyDisplay() {
        moneyDisplay.textContent = `Money: $${money}`;
      }

      function updateProgressBars() {
        Object.keys(stalls).forEach((id) => {
          const stall = stalls[id];
          if (!stall.owned) return;

          const progressBar = document.getElementById(`progress-${id}-bar`);
          const progress = Math.min((money / stall.cost) * 100, 100);
          progressBar.style.width = `${progress}%`;
        });
      }

      // event listener for the play button
      newSaveButton.addEventListener("click", () => {
        setTimeout(() => {
          startScreen.style.display = "none";
          gameplayScreen.classList.add("active");
        }, 1000);
      });

      // event listener for the home button
      homeButton.addEventListener("click", () => {
        gameplayScreen.classList.remove("active");
        startScreen.style.display = "block";
      });

      // misc button clicky (Show misc section)
      miscButton.addEventListener("click", () => {
        // Toggle the "hidden" class to show/hide the misc options
        miscSection.classList.toggle("hidden");
      });

      // click the click me button to earn money each click
      clickMeButton.addEventListener("click", () => {
        money += clickValue;
        updateMoneyDisplay();
      });
//
      clickMeButton.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });
      // buying a stall and updating the progress bar
      function buyStall(id, cost, income) {
        if (money >= cost) {
          money -= cost;
          passiveIncome += income;
          stalls[id].owned = true;
          document
            .getElementById(`stall-${id}`)
            .querySelector("button").disabled = true;
          document.getElementById(`upgrade-${id}`).disabled = false;
          updateMoneyDisplay();
          updateProgressBars();
        } else {
          alert("Not enough money!");
        }
      }

      // upgrading the stalls and updating the prices
      function upgradeStall(id) {
        const stall = stalls[id];
        if (stall.owned && money >= stall.upgradeCost) {
          money -= stall.upgradeCost;
          stall.income *= stall.multiplier;
          passiveIncome += stall.income / stall.multiplier;
          stall.upgradeCost = Math.ceil(
            stall.upgradeCost * Math.pow(1.5, stall.multiplier)
          );
          document.getElementById(
            `upgrade-${id}`
          ).textContent = `Upgrade ($${stall.upgradeCost})`;
          updateMoneyDisplay();
        } else if (!stall.owned) {
          alert("You need to own the stall first!");
        } else {
          alert("Not enough money!");
        }
      }

      document
        .getElementById("description-btn")
        .addEventListener("click", function () {
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });

      window.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown")) {
          document.getElementById("dropdowncontent").style.display = "none";
        }
      });

      // show the how to play section
      document.getElementById("how-to-play").addEventListener("click", () => {
        document.getElementById("misc-section").classList.add("hidden");
        document
          .getElementById("how-to-play-section")
          .classList.remove("hidden");
      });

      // back to the misc section
      document.getElementById("back-to-misc").addEventListener("click", () => {
        document.getElementById("how-to-play-section").classList.add("hidden");
        document.getElementById("misc-section").classList.remove("hidden");
      });


      document
        .getElementById("new-save-button")
        .addEventListener("click", () => {
          alert(
            "New Save feature is currently in beta! Stay tuned for more updates."
          );
        });

      document
        .getElementById("settings-button")
        .addEventListener("click", () => {
          alert(
            "Settings feature is currently in beta! Stay tuned for more updates."
          );
        });
       


