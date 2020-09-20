const x = window.localStorage.getItem('y')
const initDate = JSON.parse(x)
const hashMap = initDate || [
    { logo: 'A', url: 'https://www.acfun.cn/', logoType:'img'},
    { logo: 'B', url: 'https://www.bilibili.com', logeType:'img'}
]

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.addSite')

const simplifyUrl = (url) => {
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'');
}

const render = function() { 
    $siteList.find('li:not(.addSite)').remove()
    hashMap.forEach((node,index)=>{
    const $li = $(`<li>
        <div class="site">
            <div class="logo">
                ${node.logo}
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="del">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', ()=>{
        window.open(node.url)
    })
    $li.on('click','.del',(e) => {
        e.stopPropagation()
        hashMap.splice(index,1)
        render()
    })
});
}
render()

$('.addSite')
.on('click',()=>{
    let url = window.prompt('请添加网址.')
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }
    hashMap.push({
         logo: simplifyUrl(url)[0].toUpperCase(),
          url: url, 
          logoType:'text'
        });
    render()
});

// 页面关闭
// window.onbeforeunload = () => {
//     const string = JSON.stringify(hashMap)
//     // application local storage 可以查看
//     // 失效情况,关闭浏览器/清空缓存/无痕窗口
//     window.localStorage.setItem('x', string)
// }

$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})