// 针对哔哩哔哩视频播放下方商品推广去除
let body = $response.body;
if (body) {
    try {
        let t = JSON.parse(body);
        if (t.result?.cards?.length) {
            t.result.cards = t.result.cards.filter(t => t.type != 2);
        }
        body = JSON.stringify(t);
    } catch (i) {
        console.log("bilibili recommend:" + i);
    }
    $done({ body });
} else {
    $done({});
}