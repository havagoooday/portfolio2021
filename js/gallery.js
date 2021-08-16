//자주 수정될 정보값들 전역변수로 설정
var url = "https://www.flickr.com/services/rest/?method=flickr.favorites.getList";
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
var key = "311f9091fb106e3a07148f5bb8fa44bb";
var owner = "192919757@N07";
var num = 10;
var targetEl = "#gallery ul";

bindingEvent();

function bindingEvent(){
    getFlickr(url, num);

    $("body").on("click", "#gallery li a", function(e){
        e.preventDefault();

        var imgSrc = $(e.currentTarget).attr("href");
        this.createPop(imgSrc);
    }.bind(this));

    $("body").on("click", ".pop .close", function(e){
        e.preventDefault();
        removePop();
    }.bind(this));
}

function getFlickr(url, num){
    $.ajax({
        url: url,
        dataType: "json",
        data : {
            user_id: owner,
            api_key: key,
            per_page: num,
            format: "json",
            nojsoncallback: 1
        }
    })

    .success(function(data){
        var items = data.photos.photo;
        createList(items);
    })
    .error(function(err){
        console.error(err);
    });
}

function createList(items){
    $(items).each(function(index,data){
        var tit = data.title;
        if(tit=="") tit = "no title";

        $(targetEl)
            .append(
                $("<li>")
                    .append(
                        $("<div class = 'inner'>")
                            .append(
                                $("<a>")
                                    .attr({
                                        href: "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                                    })
                                    .append(
                                        $("<img>")
                                            .attr({
                                                src: "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                                            }),
                                        $("<h2>").text(tit)
                                    )
                            )
                    )
            )
    });

    var imgs = $(targetEl).find("img");
    var count = 0;

    // $(imgs).each(function(index,data){
    //     data.onload = function(){
    //         count++;
    //         if(count == num) isoLayout();
    //     }
    // });
}

function createPop(imgSrc){
    $("body").append(
        $("<aside class='pop'>")
        .append(
            $("<img>").attr("src", imgSrc),
            $("<a href='#' class='close'>")
                .append(
                    $("<div class='line1'>"),
                    $("<div class='line2'>")
                )
        ).fadeIn()
    )
}

function removePop(){
    $(".pop").fadeOut(500, function(){
        $(this).remove();
    })
}

// function isoLayout(){
//     new Isotope(targetEl, {
//         itemSelector : "#gallery ul li",
//         columWidth: "#gallery ul li",
//         transitionDuration: "0.5s"
//     })
// }