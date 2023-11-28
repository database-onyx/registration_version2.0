const time = gsap.timeline({
    default: {
        stagger: true,
        delay: 1,
        ease: "forwards",
        duration: 3
    },
});



gsap.set(".continer", { rotateZ: -35 });


time.fromTo('.testing', { opacity: 0 }, { opacity: 1 })

time.fromTo('.diag', { x: "-50rem" }, { x: "50rem", duration: 2.5 }, "<")

time.fromTo('.diag2', { x: "-50rem" }, { x: "50rem", duration: 2.5 }, "<")

time.fromTo('.diag1', { x: "50rem" }, { x: "-50rem", duration: 2.5 }, "<")


time.fromTo('.continer', { opacity: 1 }, {
    opacity: 0,
    onComplete: () => {
        const remove = document.querySelector(".continer")
        gsap.to(remove, { display: "none" })
    }
})