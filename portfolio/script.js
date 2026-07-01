// =======================
// Mobile Navbar
// =======================


const navLinks = document.querySelector(".nav-links");


const menuBtn = document.createElement("div");


menuBtn.innerHTML = "☰";

menuBtn.classList.add("menu-btn");


document.querySelector("nav").appendChild(menuBtn);



menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});




// =======================
// Smooth Scroll
// =======================


document.querySelectorAll("a[href^='#']")
    .forEach(link => {


        link.addEventListener("click", function (e) {

            e.preventDefault();


            document
                .querySelector(this.getAttribute("href"))
                .scrollIntoView({

                    behavior: "smooth"

                });


        });


    });





// =======================
// Contact Form
// =======================


// =======================
// Contact Form EmailJS
// =======================


const form = document.querySelector("form");


if(form){


form.addEventListener("submit", function(e){


e.preventDefault();



emailjs.sendForm(

"service_u5afshu",

"template_otwqiwh",

form


)

.then(()=>{


alert(
"Message sent successfully 🚀"
);


form.reset();



})

.catch((error)=>{


console.log(error);


alert(
"Message failed. Try again."
);



});


});

}


// =======================
// Footer Year
// =======================


const footer = document.querySelector("footer");


if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Anish Halamandage`;

}





// =======================
// Scroll Reveal
// =======================


const sections =
    document.querySelectorAll("section");



const observer =
    new IntersectionObserver((entries) => {


        entries.forEach(entry => {


            if (entry.isIntersecting) {


                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";


            }


        });


    });



sections.forEach(section => {


    section.style.opacity = "0";

    section.style.transform = "translateY(30px)";

    section.style.transition = "0.6s ease";


    observer.observe(section);


});





console.log("Portfolio loaded successfully 🚀");