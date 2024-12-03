// main.js

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Collapsibles
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {
        accordion: false // Allow multiple sections to be open at once
    });

    // Function to navigate to a specific page
    function navigateTo(page) {
        window.location.href = page;
    }

    // Handle navigation links in the navbar by ID
    const navHome = document.getElementById('nav-home');
    const navLearn = document.getElementById('nav-learn');
    const navAchievements = document.getElementById('nav-achievements');
    const navReferences = document.getElementById('nav-references');

    if (navHome) {
        navHome.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo('home.html'); // Ensure you have a home.html or update the path
        });
    }

    if (navLearn) {
        navLearn.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo('learn.html');
        });
    }

    if (navAchievements) {
        navAchievements.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo('achievements.html');
        });
    }

    if (navReferences) {
        navReferences.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo('references.html'); // Ensure you have a references.html or update the path
        });
    }

    // Handle "Start Learning" and "View Achievements" buttons on home.html
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (target) {
                navigateTo(target);
            }
        });
    });

    // Function to get achievements from Local Storage
    function getAchievements() {
        const achievements = localStorage.getItem('achievements');
        if (achievements) {
            return JSON.parse(achievements);
        } else {
            return [];
        }
    }

    // Function to save achievements to Local Storage
    function saveAchievements(achievements) {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }

    // Function to add an achievement
    function addAchievement(id, title, description, icon = 'star') {
        let achievements = getAchievements();

        // Check if achievement already exists
        const exists = achievements.find(ach => ach.id === id);
        if (!exists) {
            const newAchievement = {
                id: id,
                title: title,
                description: description,
                icon: icon
            };
            achievements.push(newAchievement);
            saveAchievements(achievements);

            // Change the icon to indicate completion
            const header = document.querySelector(`.collapsible-header[data-id="${id}"]`);
            if (header) {
                const iconElement = header.querySelector('.material-icons');
                if (iconElement) {
                    iconElement.textContent = 'check_circle'; // Change to a checkmark icon
                    iconElement.classList.remove('blue'); // Remove blue color
                    iconElement.classList.add('green'); // Add green color to indicate completion
                }
            }
        }
    }

    // Function to display achievements on the Achievements page
    function displayAchievements() {
        const achievements = getAchievements();
        const achievementsList = document.getElementById('achievements-list');
        const noAchievements = document.getElementById('no-achievements');

        if (achievements.length === 0) {
            noAchievements.style.display = 'block';
            achievementsList.style.display = 'none';
            return;
        } else {
            noAchievements.style.display = 'none';
            achievementsList.style.display = 'block';
        }

        // Clear existing list
        achievementsList.innerHTML = '';

        achievements.forEach(ach => {
            const li = document.createElement('li');
            li.className = 'collection-item avatar';

            // Use innerHTML to ensure proper structure
            li.innerHTML = `
                <i class="material-icons circle blue">${ach.icon || 'star'}</i>
                <span class="title">${ach.title}</span>
                <p>${ach.description}</p>
            `;

            achievementsList.appendChild(li);
        });
    }

    // Add event listeners to collapsible headers to unlock achievements
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const id = this.getAttribute('data-id');

            // Extract the title text excluding the icon's text
            let title = '';
            this.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    title += node.textContent;
                }
            });
            title = title.trim();

            // Define descriptions and icons based on id or title
            let description = '';
            let icon = 'star'; // Default icon

            switch (id) {
                case 'lesson1':
                    description = 'You have unlocked the first lesson on Stephen Hawking\'s Black Hole Research.';
                    icon = 'school';
                    break;
                case 'lesson2':
                    description = 'You have unlocked the lesson on Singularities and the Hawking–Penrose Theorems.';
                    icon = 'science';
                    break;
                case 'lesson3':
                    description = 'You have unlocked the lesson on Apparent Horizons and Event Horizons.';
                    icon = 'visibility';
                    break;
                case 'lesson4':
                    description = 'You have unlocked the lesson on Detectability of Black Holes.';
                    icon = 'visibility';
                    break;
                case 'lesson5':
                    description = 'You have unlocked the lesson on Area Theorem and Black Hole Mechanics.';
                    icon = 'functions';
                    break;
                case 'lesson6':
                    description = 'You have unlocked the lesson on No-Hair Theorem and Cosmic Censorship.';
                    icon = 'brush';
                    break;
                case 'lesson7':
                    description = 'You have unlocked the lesson on Black Holes in Alternative Theories of Gravity.';
                    icon = 'science';
                    break;
                case 'lesson8':
                    description = 'You have unlocked the lesson on Multiple Black Holes and BPS States.';
                    icon = 'group';
                    break;
                case 'lesson9':
                    description = 'You have unlocked the lesson on Laws of Black Hole Mechanics.';
                    icon = 'settings';
                    break;
                case 'lesson10':
                    description = 'You have unlocked the lesson on Discovery of Hawking Radiation.';
                    icon = 'lightbulb';
                    break;
                case 'lesson11':
                    description = 'You have unlocked the lesson on Black Hole Entropy and Thermodynamics.';
                    icon = 'assessment';
                    break;
                case 'lesson12':
                    description = 'You have unlocked the lesson on The Information Paradox.';
                    icon = 'help';
                    break;
                case 'lesson13':
                    description = 'You have unlocked the lesson on Euclidean Quantum Gravity and Path Integrals.';
                    icon = 'timeline';
                    break;
                case 'lesson14':
                    description = 'You have unlocked the lesson on Primordial Black Holes.';
                    icon = 'public';
                    break;
                case 'lesson15':
                    description = 'You have unlocked the lesson on Impact on Conservation Laws.';
                    icon = 'balance';
                    break;
                case 'lesson16':
                    description = 'You have unlocked the lesson on Philosophical and Foundational Implications.';
                    icon = 'psychology';
                    break;
                case 'lesson17':
                    description = 'You have unlocked the lesson on Legacy and Continuing Influence.';
                    icon = 'star';
                    break;
                case 'lesson18':
                    description = 'You have unlocked the final lesson: Conclusion - Unifying the Laws of Physics.';
                    icon = 'theaters';
                    break;
                default:
                    description = `You have unlocked the lesson: ${title}`;
                    icon = 'grade';
            }

            addAchievement(id, title, description, icon);
        });
    });

    // Function to reset achievements (Optional Enhancement)
    function resetAchievements() {
        if (confirm('Are you sure you want to reset all achievements?')) {
            localStorage.removeItem('achievements');
            // Reset icons on the Learn page
            collapsibleHeaders.forEach(header => {
                const iconElement = header.querySelector('.material-icons');
                if (iconElement) {
                    // Reset to original icons based on data-id
                    const id = header.getAttribute('data-id');
                    let originalIcon = 'star'; // Default

                    switch (id) {
                        case 'lesson1':
                            originalIcon = 'book';
                            break;
                        case 'lesson2':
                            originalIcon = 'science';
                            break;
                        case 'lesson3':
                            originalIcon = 'visibility';
                            break;
                        case 'lesson4':
                            originalIcon = 'visibility';
                            break;
                        case 'lesson5':
                            originalIcon = 'functions';
                            break;
                        case 'lesson6':
                            originalIcon = 'brush';
                            break;
                        case 'lesson7':
                            originalIcon = 'science';
                            break;
                        case 'lesson8':
                            originalIcon = 'group';
                            break;
                        case 'lesson9':
                            originalIcon = 'settings';
                            break;
                        case 'lesson10':
                            originalIcon = 'lightbulb';
                            break;
                        case 'lesson11':
                            originalIcon = 'assessment';
                            break;
                        case 'lesson12':
                            originalIcon = 'help';
                            break;
                        case 'lesson13':
                            originalIcon = 'timeline';
                            break;
                        case 'lesson14':
                            originalIcon = 'public';
                            break;
                        case 'lesson15':
                            originalIcon = 'balance';
                            break;
                        case 'lesson16':
                            originalIcon = 'psychology';
                            break;
                        case 'lesson17':
                            originalIcon = 'star';
                            break;
                        case 'lesson18':
                            originalIcon = 'theaters';
                            break;
                        default:
                            originalIcon = 'grade';
                    }

                    iconElement.textContent = originalIcon;
                    iconElement.classList.remove('green'); // Remove completion color
                    iconElement.classList.add('blue'); // Add default color
                }
            });

            // If on Achievements page, update the display
            if (document.title.toLowerCase().includes('achievements')) {
                displayAchievements();
            }
        }
    }

    // Check if we're on the Achievements page and display achievements
    const achievementsPage = document.title.toLowerCase().includes('achievements');
    if (achievementsPage) {
        displayAchievements();

        // Handle Reset Achievements Button if it exists
        const resetButton = document.getElementById('reset-achievements');
        if (resetButton) {
            resetButton.addEventListener('click', resetAchievements);
        }
    }
});
