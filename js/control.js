$(document).ready(function(){
    getlistvideo();
    getlistmovie();
    getlistcartoon();

})

window.onload = function() {
    initSlide();
    document.body.addEventListener('touchmove' , function(e){
    　　var e=e||window.event;
    　　e.preventDefault();
    },{ passive: false })
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
                var line2 = '<div class="itempic"><img id="videopost' + i + '" src="' + data.projects[0][i].pic_url + '" onerror=postpicerror("videopost' + i + '") /><img src="img/play.png" class="fakeplay"/></div>';
                var line3 = '<div class="iteminfo"><div>编号：<span>' + data.projects[0][i].item_id + '</span></div>';
                var line4 = '<div>作品名称：<span>' + data.projects[0][i].title + '</span></div>';
                var line5 = '<div>报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></div></div>';
                var line6 = '<div class="itemvotecount">' + data.projects[0][i].vote_count + '&nbsp;<img src="img/thumb.png" /></div></li>';
                linetmp = line1 + line2 + line3 + line4 + line5 + line6;
                line += linetmp;

                var modaltmp = '';
                var modal1 = '<div class="modal fade" data-backdrop="static" id="modalforvideo' + i + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document">';
                var modal2 = '<div class="modalmain modal-content"><div class="modaltitlepic"><img src="img/modaltitle.png"></div>';
                var modal3 = '<div class="modalcontent"><p class="modaldetailintro">标题：<span>' + data.projects[0][i].title + '</span></p><br/>';
                var modal4 = '<p class="modaldetailintro">报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></p>';
                var modal5 = '<video id="videox' + i + '" class="fsvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + data.projects[0][i].url + '"></video>';
                var modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1] + '</div>';
                var modal7 = '<button class="vote" onclick=voteconfirm(' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>投票</button><button class="cancelvote" data-dismiss="modal" onclick=$("#videox' + i + '")[0].pause()>关闭</button></div></div></div></div>';
                modaltmp = modal1 + modal2 + modal3 + modal4 + modal5 + modal6 + modal7;
                modal += modaltmp;

            }
            $("#microvideo").html(line);
            $("#modalsmicrovideo").html(modal)
        },
        error: function(){
            console.log('getlistvideofailed');
            alert("当前投票人数过多，请稍后重试");
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
                var line2 = '<div class="itempic"><img src="' + data.projects[0][i].pic_url + '" onerror=postpicerror("moviepost' + i + '")/><img src="img/play.png" class="fakeplay"/></div>';
                var line3 = '<div class="iteminfo"><div>编号：<span>' + data.projects[0][i].item_id + '</span></div>';
                var line4 = '<div>作品名称：<span>' + data.projects[0][i].title + '</span></div>';
                var line5 = '<div>报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></div></div>';
                var line6 = '<div class="itemvotecount">' + data.projects[0][i].vote_count + '&nbsp;<img src="img/thumb.png" /></div></li>';
                linetmp = line1 + line2 + line3 + line4 + line5 + line6;
                line += linetmp;

                var modaltmp = '';
                var modal1 = '<div class="modal fade" data-backdrop="static" id="modalformovie' + i + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document">';
                var modal2 = '<div class="modalmain modal-content"><div class="modaltitlepic"><img src="img/modaltitle.png"></div>';
                var modal3 = '<div class="modalcontent"><p class="modaldetailintro">标题：<span>' + data.projects[0][i].title + '</span></p><br/>';
                var modal4 = '<p class="modaldetailintro">报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></p>';
                var modal5 = '<video id="moviex' + i + '" class="fsvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + data.projects[0][i].url + '"></video>';
                var modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1] + '</div>';
                var modal7 = '<button class="vote" onclick=voteconfirm(' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>投票</button><button class="cancelvote" data-dismiss="modal" onclick=$("#moviex' + i + '")[0].pause()>关闭</button></div></div></div></div>';
                modaltmp = modal1 + modal2 + modal3 + modal4 + modal5 + modal6 + modal7;
                modal += modaltmp;
            }
            $("#micromovie").html(line);
            $("#modalsmicromovie").html(modal)
        },
        error: function(){
            console.log('getlistmoviefailed');
            alert("当前投票人数过多，请稍后重试");
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
                var line2 = '<div class="itempic"><img src="' + data.projects[0][i].pic_url + '" onerror=postpicerror("cartoonpost' + i + '") /><img src="img/play.png" class="fakeplay"/></div>';
                var line3 = '<div class="iteminfo"><div>编号：<span>' + data.projects[0][i].item_id + '</span></div>';
                var line4 = '<div>作品名称：<span>' + data.projects[0][i].title + '</span></div>';
                var line5 = '<div>报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></div></div>';
                var line6 = '<div class="itemvotecount">' + data.projects[0][i].vote_count + '&nbsp;<img src="img/thumb.png" /></div></li>';
                linetmp = line1 + line2 + line3 + line4 + line5 + line6;
                line += linetmp;

                var modaltmp = '';
                var modal1 = '<div class="modal fade" data-backdrop="static" id="modalforcartoon' + i + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document">';
                var modal2 = '<div class="modalmain modal-content"><div class="modaltitlepic"><img src="img/modaltitle.png"></div>';
                var modal3 = '<div class="modalcontent"><p class="modaldetailintro">标题：<span>' + data.projects[0][i].title + '</span></p><br/>';
                var modal4 = '<p class="modaldetailintro">报送单位：<span>' + data.projects[0][i].content.split("报送单位:")[1].split("作品简介:")[0] + '</span></p>';
                var modal5 = '<video id="cartoonx' + i + '" class="fsvideo" controls="controls" poster="' + data.projects[0][i].pic_url + '" preload="none" src="' + data.projects[0][i].url + '"></video>';
                var modal6 = '<div class="modaldetail">' + data.projects[0][i].content.split("作品简介:")[1] + '</div>';
                var modal7 = '<button class="vote" onclick=voteconfirm(' + data.projects[0][i].exam + ',' + data.projects[0][i].id + ')>投票</button><button class="cancelvote" data-dismiss="modal" onclick=$("#cartoonx' + i + '")[0].pause()>关闭</button></div></div></div></div>';
                modaltmp = modal1 + modal2 + modal3 + modal4 + modal5 + modal6 + modal7;
                modal += modaltmp;
            }
            $("#microcartoon").html(line);
            $("#modalsmicrocartoon").html(modal)
        },
        error: function(){
            console.log('getlistcartoonfailed');
            alert("当前投票人数过多，请稍后重试");
        }
    })
}

function voteconfirm(type,vote_list){
    $.ajax({
        type:"get",
        url: link + 'exam/add_vote_count/?exam_id=' + type + '&openid=' + openid + '&vote_list=' + vote_list,
        dataType:"json",
        success:function(data){
            // console.log(data)
            alert(data.msg);
            window.location.reload();
        },
        error: function(){
            console.log('voteconfirm*****xxx');
            alert("当前投票人数过多，请稍后重试");
        }
    })
}

function postpicerror(item){
    // $('#' + item).attr('src','/img/logo-fs.png');
    // $('#' + item).attr('οnerrοr',null); 
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}