// ==UserScript==
// @name         Pter Internal Uploady
// @namespace    https://pterclub.com/forums.php?action=viewtopic&topicid=3391
// @version      0.1.1
// @description  Auto get movie&TV info from douban&imdb for Pterclub
// @author       scatking
// @match        https://pterclub.com/PTer.php*
// @require      https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @icon         https://pterclub.com/favicon.ico
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function fill_form(response) {
    let data = response.response;
    $('textarea[name="movieinfo"]').val(data['format']);
    var trans_titles='',directors='',casts='';
    if (data['foreign_title'].length == 0){ trans_titles= data['chinese_title']}
    else {
        data.trans_title.forEach(function (trans_title) {
            trans_titles += trans_title + ' '
        });
    }
    data.director.forEach(function (director) {
        directors = /(.+?)\s/.exec(director['name']).pop()
    });
    var actors = data.cast.slice(0,3);
    actors.forEach(function (cast) {
        casts += /(.+?)\s/.exec(cast['name']).pop()+' '
    });
    const subtitle = trans_titles + ' | ' + "导演：" + directors + ' | ' + '主演：' + casts;
    $('#smalldescription').val(subtitle)
}

(function() {
    $('#smalldescription').parent().parent().after("<tr><td>豆瓣地址</td><td><input style='width: 450px;' id='douban' /></td></tr>");
    $('#douban').after('<a href="javascript:;" id="Auto_Fill" style="color:green">Auto Fill</a>');
    $('#Auto_Fill').click(function () {
        GM.xmlHttpRequest({
            method: "GET",                  //We call the Steam API to get info on the game
            url: "https://autofill.scatowl.workers.dev/?url=" + $("#douban").val(),
            responseType: "json",
            onload: fill_form
        });
    })
})();