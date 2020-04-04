window.onload=function(){
    let swiper = document.querySelector(".swiper"),
    
    
    pre = swiper.querySelector(".pre"),
        next = swiper.querySelector(".next"),
        _ul = swiper.querySelector(".imgBox"),//图片ul
        ali = _ul.querySelectorAll('li'),
        aImg = swiper.querySelectorAll("li img"),
        imgW = aImg[0].offsetWidth,//需要window.onload
        index = 1,//计算滚动到哪张图片
        isTransitioned = true,//判断动画是否已完成
        item = swiper.querySelector('.item');//圆点
        item.style.width = 24 * aImg.length + "px";//设置圆点栏宽度
    //克隆第一张图片，添加到图片队列的最后面
    let cloneLi = ali[0].cloneNode(true);
    _ul.appendChild(cloneLi);
    //克隆最后一张图片，添加到图片队列的最前面
    let cloneLastLi = ali[ali.length-1].cloneNode(true);
        //插入方法1：
    // _ul.insertBefore(cloneLastLi,ali[0]);
        //插入方法2
    _ul.prepend(cloneLastLi);
    
    //初始化图片队列：
    _ul.style.transform="translateX("+(-imgW*index)+"px)";

    //点击右边按钮
    next.addEventListener("click",()=>{
        if(isTransitioned){
            index++;//先++再设置
            move();
            smallDot(index);  
        }
    })
    
    
    //点击左边按钮
    pre.addEventListener("click",()=>{
        if(isTransitioned){
            index--;
            move();
            smallDot(index);
        }
    })
    
    setInterval(function(){
        if(isTransitioned){
            index++;
            move();
            smallDot(index);
        }
    },4000)
    
    //监听动画结束
    _ul.addEventListener("transitionend",()=>{//给ul加了transi
        if(index == aImg.length+1){//边界判断
            index = 1;
            _ul.classList.toggle("transi");//移除ul的transi
            _ul.style.transform="translateX("+(-imgW*index)+"px)";//瞬间变回第一张
        }
        if(index==0){
            index=aImg.length;
            _ul.classList.toggle("transi");//移除ul的transi
            _ul.style.transform="translateX("+(-imgW*index)+"px)";//瞬间变回第一张
        }
        isTransitioned = true;//每次动画结束都判断
    })
    
    
    //根据图片的张数生成分页器
    for(let i=0;i<aImg.length;i++){
        var newLi = document.createElement('li');
        item.appendChild(newLi);
    }
    //第一个小圆点添加样式
    item.children[0].classList.add('active');
    //给小圆点添加点击事件
    for(let j=0;j<item.children.length;j++){
            item.children[j].addEventListener('click',()=>{
                for(let q=0;q<item.children.length;q++){
                    item.children[q].classList.remove('active');
                }
                item.children[j].classList.add('active');
                index = j+1;
                _ul.classList.add('transi');
                _ul.style.transform="translateX("+(-imgW*index)+"px)";
            })
        }
    //点击左右按钮小圆点跟随
    function smallDot(index){
        for(let k=0;k<item.children.length;k++){
            item.children[k].classList.remove('active');
        }
        index = index -1;
        index = index==item.children.length?0:index;//左按钮边界
        index = index<0?item.children.length-1:index;//右按钮边界
        item.children[index].classList.add('active');
    }
    
    function move(){
        _ul.classList.add("transi");
        _ul.style.transform="translateX("+(-imgW*index)+"px)";
        isTransitioned = false;
    }
}