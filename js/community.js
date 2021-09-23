var notice = document.querySelector('.notice');
var faq = document.querySelector('.faq');
var btnNotice = document.querySelector('.btnNotice');
var btnFaq = document.querySelector('.btnFaq');
var bar = document.querySelector('.bar');

var answer = document.querySelector('.answer');

btnNotice.onclick = function() {
    btnNotice.classList.remove("on");
    btnFaq.classList.remove("on");

    btnNotice.classList.add("on");

    bar.classList.remove("move");

    faq.classList.add("hide");
    notice.classList.remove("hide");
}

btnFaq.onclick = function() {
    btnNotice.classList.remove("on");
    btnFaq.classList.remove("on");

    btnFaq.classList.add("on");

    bar.classList.add("move");

    notice.classList.add("hide");
    faq.classList.remove("hide");
}