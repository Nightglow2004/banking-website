

/*Carousel*/

const gallery = document.querySelector('.gallery');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');


backBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: -900, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: 900, behavior: 'smooth' });
});


/*Frequently Asked Questions*/
function faqshow() {
    document.getElementById('faq').style.display = 'block flex';
    document.getElementById('less').style.display = 'block';
    document.getElementById('more').style.display = 'none';
    document.getElementById('bottom1').style.background = '#262626';
    document.getElementById('bottom2').style.background = '#262626';


}


function faqhide() {
    document.getElementById('faq').style.display = 'none';
    document.getElementById('more').style.display = 'block';
    document.getElementById('less').style.display = 'none';
    document.getElementById('bottom1').style.background = 'linear-gradient(to bottom, #252525 50%, rgba(0, 0, 0, 0.75) 100%)';
    document.getElementById('bottom2').style.background = 'linear-gradient(to bottom, #252525 50%, rgba(0, 0, 0, 0.75) 100%)';
}



/*Dropdown*/
function nav() {
    let menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}


/*faq answer and question toggle*/
function toggleAnswer(answerId) {
    const answerElement = document.getElementById(answerId);
    const Hide = answerElement.classList.contains('hidden');
    answerElement.classList.toggle('hidden', !Hide);
}


/*logout*/
function logout() {
    let answer = prompt("Do you want to logout? Y/N");
    if (answer && answer.toUpperCase() === 'Y') {
        localStorage.removeItem('loginEmail');
        localStorage.removeItem('password');
        alert("You have successfully logged out!");
        window.location.href = "login.html";
    } else if (answer && answer.toUpperCase() === 'N') {
        alert("Logout cancelled.");
    }
}