//자주 수정될 정보값들 전역변수로 설정
var url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
var key = "311f9091fb106e3a07148f5bb8fa44bb";
var num = 10;
var targetEl = "#gallery ul";

getFlickr(url, num);

function getFlickr(url, num){
    $.ajax({
        url: url,
        dataType: "json",
        data : {
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
                                                src: "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_m.jpg"
                                            })
                                    ),
                                $("<h2>").text(tit)
                            )
                    )
            )
    });

    var imgs = $(targetEl).find("img");
    var count = 0;

    $(imgs).each(function(index,data){
        data.onload = function(){
            count++;
            if(count == num) isoLayout();
        }
    });
}

function isoLayout(){
    new Isotope(targetEl, {
        itemSelector : "#gallery ul li",
        columWidth: "#gallery ul li",
        transitionDuration: "0.5s"
    })
}