

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    
    function setActiveSection() {
        const sections = ['home', 'about', 'rules', 'terms', 'discord'];
        const scrollPosition = window.scrollY + 100;
        
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`[data-section="${section}"]`);
                    if (activeLink) activeLink.classList.add('active');
                    break;
                }
            }
        }
    }
    
    window.addEventListener('scroll', setActiveSection);
    
    
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const audio = document.getElementById('background-audio');
    const playIcon = playBtn.querySelector('.play-icon');
    const volumeIcon = document.getElementById('volume-icon');
    
    let isPlaying = false;
    let isMuted = false;
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.classList.remove('playing');
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
            playIcon.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
    
    muteBtn.addEventListener('click', function() {
        audio.muted = !isMuted;
        isMuted = !isMuted;
        volumeIcon.textContent = isMuted ? '🔇' : '🔊';
    });
    
  
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.8 + 0.2;
            
            const colors = ['#ff6b35', '#f7931e', '#ffcb05', '#ff4500'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            this.opacity = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3 + 0.5;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    
   const rules = [
    {
        title: "Respect Everyone",
        description: "Keep trash talk in-game. Personal attacks, racism, sexism, or hate speech will result in a ban."
    },
    {
        title: "No Cheating Talk or Exploits",
        description: "Don’t share cheats, exploits, or anything that promotes unfair gameplay. Permanent ban applies."
    },
    {
        title: "Spam = Timeout / Kick",
        description: "No spamming text, voice, or pings. Keep it chill or face a timeout or kick."
    },
    {
        title: "No NSFW Content",
        description: "This isn’t the place for that. Keep it clean unless there’s a specific, age-gated channel for it."
    },
    {
        title: "English Only in Main Channels",
        description: "This helps everyone understand and be part of the conversation."
    },
    {
        title: "No Advertising = Timeout / Warning",
        description: "Don’t self-promote or drop links unless allowed in a specific channel."
    },
    {
        title: "Use Common Sense",
        description: "If it feels like it might get you in trouble—it probably will. Think before you act."
    },
    {
        title: "Respect Staff Decisions",
        description: "Mods are here to help. Don’t argue with them in public; use DMs if needed."
    },
    {
        title: "Have Fun (But Don’t Be a Cunt!)",
        description: "We’re all here for Rust and a good time. Chill, relax, and game till you can’t no more."
    }
];

    
   
    const rulesList = document.getElementById('rules-list');
    rules.forEach((rule, index) => {
        const ruleItem = document.createElement('div');
        ruleItem.className = 'rule-item';
        ruleItem.style.transitionDelay = `${index * 100}ms`;
        ruleItem.innerHTML = `
            <div class="rule-number">${index + 1}</div>
            <div class="rule-content">
                <h3>${rule.title}</h3>
                <p>${rule.description}</p>
            </div>
            <svg class="rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
            </svg>
        `;
        rulesList.appendChild(ruleItem);
    });
    
    
   const terms = [
    {
        title: "General Conduct",
        content: "Be respectful to all members—no harassment, hate speech, or discrimination of any kind. Do not spam messages, links, or commands. Keep discussions in the appropriate channels. No NSFW content, excessive profanity, or illegal activities."
    },
    {
        title: "In-Game Behavior",
        content: "Cheating, exploiting, or hacking in Rust is strictly prohibited. Team-killing, griefing, or sabotaging clan efforts will result in removal. All loot and resources collected during official clan runs must be shared as agreed upon by leadership."
    },
    {
        title: "Activity Requirements",
        content: "Members are expected to be active during wipes and clan events unless otherwise excused. Inactivity for more than [X days] without notice may result in removal from the clan. Participation in voice comms during raids and events is required unless pre-approved."
    },
    {
        title: "Clan Hierarchy & Roles",
        content: "Leadership decisions are final. Respect clan leaders, admins, and designated ranks. Promotions are based on activity, loyalty, and contribution to the clan. Issues or disputes should be reported to clan leadership respectfully and privately."
    },
    {
        title: "Voice Chat Etiquette",
        content: "No mic spam, soundboards, or disruptive background noise. Use push-to-talk if you're in a noisy environment. Respect others during discussions, planning, and raids."
    },
    {
        title: "Privacy and Security",
        content: "Do not share personal information of yourself or others. Do not record voice chats or stream clan activities without permission. Clan base designs, codes, and strategies must remain confidential."
    },
    {
        title: "Disciplinary Actions",
        content: "Violations of these terms may result in: warnings, temporary or permanent mute, temporary or permanent ban from the Discord or clan. Decisions are at the discretion of the clan leadership."
    },
    {
        title: "Agreement",
        content: "By joining the [Your Clan Name] Discord server, you acknowledge and agree to these terms. These terms may be updated at any time, and continued participation implies acceptance of any changes."
    }
];

  
    const termsList = document.getElementById('terms-list');
    terms.forEach((term, index) => {
        const termItem = document.createElement('div');
        termItem.className = 'term-item';
        termItem.style.transitionDelay = `${index * 100}ms`;
        termItem.innerHTML = `
            <div class="term-header">
                <div class="term-number">${index + 1}</div>
                <div class="term-content">
                    <h3>${term.title}</h3>
                    <p>${term.content}</p>
                </div>
                <svg class="term-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6.2 9.5L9 6.7l7.6 7.6-2.8 2.8z"/>
                    <path d="M9 6.7L21 3l-3.7 12L9 6.7z"/>
                    <path d="M9 15l-3 3"/>
                </svg>
            </div>
        `;
        termsList.appendChild(termItem);
    });
    
   
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('rule-item') || entry.target.classList.contains('term-item')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
   
    document.querySelectorAll('.rule-item, .term-item').forEach(item => {
        observer.observe(item);
    });
    
   
    const rulesCheckbox = document.getElementById('rules-checkbox');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const discordBtn = document.getElementById('discord-join-btn');
    const discordWarning = document.getElementById('discord-warning');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    
    function updateDiscordButton() {
        const canJoin = rulesCheckbox.checked && termsCheckbox.checked;
        
        if (canJoin) {
            discordBtn.classList.add('enabled');
            discordBtn.disabled = false;
            discordWarning.classList.add('hidden');
        } else {
            discordBtn.classList.remove('enabled');
            discordBtn.disabled = true;
            discordWarning.classList.remove('hidden');
        }
    }
    
    rulesCheckbox.addEventListener('change', updateDiscordButton);
    termsCheckbox.addEventListener('change', updateDiscordButton);
    
    discordBtn.addEventListener('click', function() {
    if (rulesCheckbox.checked && termsCheckbox.checked) {
        window.open('https://discord.gg/GtubJtktyD', '_blank');
    } else {
        modal.classList.add('show');
    }
});

    
    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});


function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('data-section');
        scrollToSection(sectionId);
    }
});