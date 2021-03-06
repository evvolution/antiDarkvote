$(document).ready(function(){
    // getlistvideo();
    // getlistmovie();
    // getlistcartoon();

    alert("点赞已经结束");
    getrank("video","15");
    getrank("movie","13");
    getrank("cartoon","14");
})

window.onload = function() {
    initSlide();
}

var link = "http://server.foshanplus.com/";
var openid = getParam('openid');
// var openid = "1234567890123456789012345675";

function initSlide(){
    var tabsSwiper = new Swiper('#mainpages', {
        autoHeight: true,
        speed: 800,
        on: {
            slideChangeTransitionStart: function() {
                $(".tabs .active").removeClass('active');
                $(".tabs a").eq(this.activeIndex).addClass('active');
            }
        }
    })
    $(".tabs a").on('click', function(e) {
        e.preventDefault()
        $(".tabs .active").removeClass('active')
        $(this).addClass('active')
        tabsSwiper.slideTo($(this).index())
    })
}

function getrank(item,id){
    $.ajax({
        type:"get",
        url: link + 'exam/get_vote_rank/?exam_id=' + id + '&top=10',
        dataType:"json",
        success:function(data){
            // console.log(data)
            // console.log(data[0].votes.length)
            var line = "";
            for(var i=0;i<data[0].votes.length;i++){
                var linetmp = '';
                var line1 = '';
                if(i == 0){
                    line1 = '<div class="rankitem"><span class="rankorder"><strong>1</strong></span><div class="rankprize"><img src="img/1.png" style="width: 100%;"/></div>'
                }else if(i == 1){
                    line1 = '<div class="rankitem"><span class="rankorder"><strong>2</strong></span><div class="rankprize"><img src="img/2.png" style="width: 100%;"/></div>'
                }else if(i == 2){
                    line1 = '<div class="rankitem"><span class="rankorder"><strong>3</strong></span><div class="rankprize"><img src="img/3.png" style="width: 100%;"/></div>'
                }else{
                    line1 = '<div class="rankitem"><span class="rankorder"><strong>' + (i+1) + '</strong></span>'
                }
                var line2 = '<div class="rankinfo">作品编号：' + data[0].votes[i].item_id + '&nbsp;&nbsp;点赞数：' + data[0].votes[i].vote_count + '</div>';
                var line3 = '<div class="rankinfo">作品名称：' + data[0].votes[i].title + '</div>';
                var line4 = '<div class="rankinfo">报送单位：' + data[0].votes[i].content.split("报送单位:")[1].split("作品简介")[0] + '</div></div>';
                linetmp = line1 + line2 + line3 + line4
                line += linetmp;
            }
            $('#micro' + item + 'rank').html(line);
        },
        error: function(data){
            console.log(data);
            console.log('get' + item + 'failed');
            alert("当前人数过多，请稍后重试");
        }
    })
}

/*-----------------投票部分----------------*/
function getlistvideo(){
    $.ajax({
        type:"get",
        url: link + "/exam/get_vote/?exam_id=15",
        dataType:"json",
        success:function(data){
            // console.log(data) onclick=$("#videox' + i + '")[0].play()
            var line = "";
            var modal = "";
            for(var i=0;i<data.projects[0].length;i++){
                var linetmp = '';
                var line1 = '<li class="list-group-item" data-toggle="modal" data-target="#modalforvideo' + i + '">';
                var line2 = '<div class="itempic"><img id="videopost' + i + '" src="' + data.projects[0][i].pic_url + '" /><img src="img/play.png" class="fakeplay"/></div>';
                var line3 = '<div class="iteminfo"><div>编号：<span>' + data.projects[0][i].item_id + '</span></div>';
                var line4 = '<div>作品名称：<span>' + data.projects[0][i].title + '</span></div>';
                var line5 = '<div>报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></div></div>';
                var line6 = '<div class="itemvotecount" id="videogood' + i +'">' + data.projects[0][i].vote_count + '&nbsp;<img src="img/thumb.png" /></div></li>';
                linetmp = line1 + line2 + line3 + line4 + line5 + line6;
                line += linetmp;

                var modaltmp = '';
                var modal1 = '<div class="modal fade" data-backdrop="static" id="modalforvideo' + i + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document">';
                var modal2 = '<div class="modalmain modal-content"><div class="modaltitlepic"><img src="img/modaltitle.png"></div>';
                var modal3 = '<div class="modalcontent"><p class="modaldetailintro">标题：<span>' + data.projects[0][i].title + '</span></p><br/>';
                var modal4 = '<p class="modaldetailintro">报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></p>';
                var modal5 = '';
                var modal6 = '';
                var modal7 = '';
                if(data.projects[0][i].good == 1){
                    // console.log(JSON.parse(data.projects[0][i].content.split("作品简介:")[1].split("++++")[1]));
                    var mutilvideosjson = JSON.parse(data.projects[0][i].content.split("作品简介:")[1].split("++++")[1]);
                    var mutilcount = mutilvideosjson.length;
                    var modal5x = '';
                    for(var j=0; j<mutilcount; j++){
                        modal5x = '<p class="mutiltitle">' + mutilvideosjson[j].name + '</p><video x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline id="videomx' + j + '" class="fsmultvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + mutilvideosjson[j].url + '"></video><br/>';
                        modal5 += modal5x;
                    }
                    modal5 = '<div class="multvideocontent">' + modal5 + '</div>';
                    modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1].split("++++")[0] + '</div><button class="vote" onclick=voteconfirm("videogood' + i + '",' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>点赞</button>';
                    modal7 = '<button class="cancelvote" data-dismiss="modal" onclick=pausemutilvideo("videomx",' + mutilcount + ')>关闭</button></div></div></div></div>';
                }else{
                    modal5 = '<video x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline id="videox' + i + '" class="fsvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + data.projects[0][i].url + '"></video>';
                    modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1] + '</div><button class="vote" data-dismiss="modal" onclick=voteconfirm("videogood' + i + '",' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>点赞</button>';
                    modal7 = '<button class="cancelvote" data-dismiss="modal" onclick=$("#videox' + i + '")[0].pause()>关闭</button></div></div></div></div>';
                }
                modaltmp = modal1 + modal2 + modal3 + modal4 + modal5 + modal6 + modal7;
                modal += modaltmp;

            }
            $("#microvideo").html(line);
            $("#modalsmicrovideo").html(modal)
        },
        error: function(){
            console.log('getlistvideofailed');
            alert("当前点赞人数过多，请稍后重试");
        }
    })
}

function getlistmovie(){
    $.ajax({
        type:"get",
        url: link + "/exam/get_vote/?exam_id=13",
        dataType:"json",
        success:function(data){
            // console.log(data);onclick=$("#moviex' + i + '")[0].play()
            var line = "";
            var modal = "";
            for(var i=0;i<data.projects[0].length;i++){
                var linetmp = '';
                var line1 = '<li class="list-group-item" data-toggle="modal" data-target="#modalformovie' + i + '">';
                var line2 = '<div class="itempic"><img src="' + data.projects[0][i].pic_url + '" /><img src="img/play.png" class="fakeplay"/></div>';
                var line3 = '<div class="iteminfo"><div>编号：<span>' + data.projects[0][i].item_id + '</span></div>';
                var line4 = '<div>作品名称：<span>' + data.projects[0][i].title + '</span></div>';
                var line5 = '<div>报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></div></div>';
                var line6 = '<div class="itemvotecount" id="moviegood' + i +'">' + data.projects[0][i].vote_count + '&nbsp;<img src="img/thumb.png" /></div></li>';
                linetmp = line1 + line2 + line3 + line4 + line5 + line6;
                line += linetmp;

                var modaltmp = '';
                var modal1 = '<div class="modal fade" data-backdrop="static" id="modalformovie' + i + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document">';
                var modal2 = '<div class="modalmain modal-content"><div class="modaltitlepic"><img src="img/modaltitle.png"></div>';
                var modal3 = '<div class="modalcontent"><p class="modaldetailintro">标题：<span>' + data.projects[0][i].title + '</span></p><br/>';
                var modal4 = '<p class="modaldetailintro">报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></p>';
                var modal5 = '';
                var modal6 = '';
                var modal7 = '';
                if(data.projects[0][i].good == 1){
                    // console.log(JSON.parse(data.projects[0][i].content.split("作品简介:")[1].split("++++")[1]));
                    var mutilvideosjson = JSON.parse(data.projects[0][i].content.split("作品简介:")[1].split("++++")[1]);
                    var mutilcount = mutilvideosjson.length;
                    var modal5x = '';
                    for(var j=0; j<mutilcount; j++){
                        modal5x = '<p class="mutiltitle">' + mutilvideosjson[j].name + '</p><video x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline id="moviemx' + j + '" class="fsmultvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + mutilvideosjson[j].url + '"></video><br/>';
                        modal5 += modal5x;
                    }
                    modal5 = '<div class="multvideocontent">' + modal5 + '</div>';
                    modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1].split("++++")[0] + '</div><button class="vote" onclick=voteconfirm("moviegood' + i + '",' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>点赞</button>';
                    modal7 = '<button class="cancelvote" data-dismiss="modal" onclick=pausemutilvideo("moviemx",' + mutilcount + ')>关闭</button></div></div></div></div>';
                }else{
                    modal5 = '<video x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline id="moviex' + i + '" class="fsvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + data.projects[0][i].url + '"></video>';
                    modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1] + '</div><button class="vote" data-dismiss="modal" onclick=voteconfirm("moviegood' + i + '",' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>点赞</button>';
                    modal7 = '<button class="cancelvote" data-dismiss="modal" onclick=$("#moviex' + i + '")[0].pause()>关闭</button></div></div></div></div>';
                }
                
                modaltmp = modal1 + modal2 + modal3 + modal4 + modal5 + modal6 + modal7;
                modal += modaltmp;
            }
            $("#micromovie").html(line);
            $("#modalsmicromovie").html(modal)
        },
        error: function(){
            console.log('getlistmoviefailed');
            alert("当前点赞人数过多，请稍后重试");
        }
    })
}

function getlistcartoon(){
    $.ajax({
        type:"get",
        url: link + "/exam/get_vote/?exam_id=14",
        dataType:"json",
        success:function(data){
            // console.log(data); onclick=$("#cartoonx' + i + '")[0].play()
            var line = "";
            var modal = "";
            for(var i=0;i<data.projects[0].length;i++){
                var linetmp = '';
                var line1 = '<li class="list-group-item" data-toggle="modal" data-target="#modalforcartoon' + i + '">';
                var line2 = '<div class="itempic"><img src="' + data.projects[0][i].pic_url + '" /><img src="img/play.png" class="fakeplay"/></div>';
                var line3 = '<div class="iteminfo"><div>编号：<span>' + data.projects[0][i].item_id + '</span></div>';
                var line4 = '<div>作品名称：<span>' + data.projects[0][i].title + '</span></div>';
                var line5 = '<div>报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></div></div>';
                var line6 = '<div class="itemvotecount" id="cartoongood' + i +'">' + data.projects[0][i].vote_count + '&nbsp;<img src="img/thumb.png" /></div></li>';
                linetmp = line1 + line2 + line3 + line4 + line5 + line6;
                line += linetmp;

                var modaltmp = '';
                var modal1 = '<div class="modal fade" data-backdrop="static" id="modalforcartoon' + i + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document">';
                var modal2 = '<div class="modalmain modal-content"><div class="modaltitlepic"><img src="img/modaltitle.png"></div>';
                var modal3 = '<div class="modalcontent"><p class="modaldetailintro">标题：<span>' + data.projects[0][i].title + '</span></p><br/>';
                var modal4 = '<p class="modaldetailintro">报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></p>';
                var modal5 = '';
                var modal6 = '';
                var modal7 = '';
                if(data.projects[0][i].good == 1){
                    // console.log(JSON.parse(data.projects[0][i].content.split("作品简介:")[1].split("++++")[1]));
                    var mutilvideosjson = JSON.parse(data.projects[0][i].content.split("作品简介:")[1].split("++++")[1]);
                    var mutilcount = mutilvideosjson.length;
                    var modal5x = '';
                    for(var j=0; j<mutilcount; j++){
                        modal5x = '<p class="mutiltitle">' + mutilvideosjson[j].name + '</p><video x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="ttrue" x5-playsinline id="cartoonmx' + j + '" class="fsmultvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + mutilvideosjson[j].url + '"></video><br/>';
                        modal5 += modal5x;
                    }
                    modal5 = '<div class="multvideocontent">' + modal5 + '</div>';
                    modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1].split("++++")[0] + '</div><button class="vote" onclick=voteconfirm("cartoongood' + i + '",' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>点赞</button>';
                    modal7 = '<button class="cancelvote" data-dismiss="modal" onclick=pausemutilvideo("cartoonmx",' + mutilcount + ')>关闭</button></div></div></div></div>';
                }else{
                    modal5 = '<video x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline id="cartoonx' + i + '" class="fsvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + data.projects[0][i].url + '"></video>';
                    modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1] + '</div><button class="vote" data-dismiss="modal" onclick=voteconfirm("cartoongood' + i + '",' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>点赞</button>';
                    modal7 = '<button class="cancelvote" data-dismiss="modal" onclick=$("#cartoonx' + i + '")[0].pause()>关闭</button></div></div></div></div>';
                }
                modaltmp = modal1 + modal2 + modal3 + modal4 + modal5 + modal6 + modal7;
                modal += modaltmp;
            }
            $("#microcartoon").html(line);
            $("#modalsmicrocartoon").html(modal)
        },
        error: function(){
            console.log('getlistcartoonfailed');
            alert("当前点赞人数过多，请稍后重试");
        }
    })
}

function voteconfirm(item,type,vote_list){
    $.ajax({
        type:"get",
        url: link + 'exam/add_vote_count/?exam_id=' + type + '&openid=' + openid + '&vote_list=' + vote_list,
        dataType:"json",
        success:function(data){
            console.log(data)
            if(data.is_error == true){
                alert(data.msg);
            }else{
                var newcount = String(Number($('#' + item).html().split("&nbsp;")[0]) + Number(1)) + '&nbsp;<img src="img/thumb.png" />';
                $('#' + item).html(newcount);
                alert(data.msg);
            }
            // window.location.reload();
        },
        error: function(){
            console.log('voteconfirm*****xxx');
            alert("当前点赞人数过多，请稍后重试");
        }
    })
}

function pausemutilvideo(item,num){
    for(var i=0; i<num; i++){
        $('#' + item + i)[0].pause();
    }
}



function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}