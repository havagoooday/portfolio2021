var $menuWrap = $("#gnb .wrap");
var $menu2dep = $menuWrap.find(".menu2dep");
var speed = 500;
var $btnGnb = $("#btnGnb");
var $gnb = $("#gnb");

$menuWrap.on("mouseenter", openSub);
$menuWrap.on("mouseleave", closeSub);


$menu2dep.on("mouseenter", function(){
    $(this).parent("li").children("a").addClass("on");
});

$menu2dep.on("mouseleave", function(){
    $(this).parent("li").children("a").removeClass("on");
});

$menu2dep.on("focusin", function(){
    $(this).parent("li").children("a").addClass("on");
});

$menu2dep.on("focusout", function(){
    $(this).parent("li").children("a").removeClass("on");
});

$menuWrap.on("focusin", openSub);
$menuWrap.last().find("a").last().on("focusout", closeSub);

$btnGnb.on("click", function(e){
    e.preventDefault();
    $btnGnb.toggleClass("on");
    $gnb.toggleClass("on");
});

function openSub() {
    $menu2dep.stop().slideDown(speed);
};

function closeSub() {
    $menu2dep.stop().slideUp(speed / 2);
};