var frame = $(".video .inner")
var key = "AIzaSyAwk7QCovluqq9t9wm1AFqNHiSHbJ7sH-Q";
var playList = "PLhoc2Etk5EQjPf3k_ycaX66qfqG-3ZWFe";
var count = 12

bindingEvent();

function bindingEvent(){
    callData();

    $("body").on("click", "article a", function(e){
        e.preventDefault();
        var vidId = $(e.currentTarget).attr("href");
        this.createPop(vidId);
    }.bind(this));

    $("body").on("click", ".pop .close", function(e){
        e.preventDefault();
        removePop();
    }.bind(this));
}

function callData(){
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        dataType: "jsonp",
        data: {
            part: "snippet",
            key: key,
            playlistId: playList,
            maxResults: count
        }
    })

    .success(function(data){
        var items = data.items;
        createList(items);
    })
    .error(function(err){
        console.error(err);
    })
}

function createList(items){
    $(items).each(function(index, data){
        var tit = data.snippet.title;
        var txt = data.snippet.description;
        var date = data.snippet.publishedAt.split("T")[0];
        var imgSrc = data.snippet.thumbnails.maxres.url;
        var vidId = data.snippet.resourceId.videoId;

        tit = tit.replace(tit.substr(0,9),"");

        if(txt.length>1000){
            txt = txt.substr(0,1000)+"...";
        }

        $(frame)
            .append(
                $("<article>")
                    .append(
                        $("<a class='pic'>")
                            .attr({ href: vidId })
                            .css({ backgroundImage: "url("+imgSrc+")" }),
                        $("<div class='con'>")
                            .append(
                                $("<h2>").text(tit),
                                $("<p>").text(txt),
                                $("<span>").text(date)
                            )
                    )
            )
    })
}

function createPop(vidId){
    $("body")
        .append(
            $("<aside class='pop'>")
                .css({
                    width: "100%", height: "100%",
                    position: "fixed", top: 0, left: 0,
                    backgroundColor: "rgba(255, 68, 0, 0.9)",
                    display: "none", boxSizing: "border-box"
                })
                .append(
                    $("<img src='../img/loading.gif'>") //loading 이미지 직접 제작
                        .css({
                            width: 500,
                            position: "absolute",
                            top: "50%", left: "50%",
                            transform: "translate(-50%,-50%)"
                        })
                )
                .append(
                    $("<div class='con'>")
                        .css({
                            width: "100%", height: "100%",
                            position: "relative",
                            display: "none"
                        })
                        .append(
                            $("<iframe>")
                                .attr({
                                    src: "https://www.youtube.com/embed/"+vidId,
                                    width: "100%", height: "100%",
                                    frameborder: 0,
                                    allowfullscreen: true
                                })
                        )
                )
                .append(
                    $("<a href='#' class='close'>")
                        .append(
                            $("<div class='line1'>"),
                            $("<div class='line2'>")
                        )
                ).fadeIn()
        );

        setTimeout(function(){
            $(".pop .con").fadeIn(500, function(){
                $(".pop > img").remove();
            })
        }, 500);
}

function removePop(){
    $(".pop").fadeOut(500, function(){
        $(this).remove();
    })
}