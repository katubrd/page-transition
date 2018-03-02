
  let btns = document.querySelectorAll('.js-btn'),
      duration = 0.8,
      isAnimating = false;

  addEventListenerList(btns, "click", function(e){
    if(!isAnimating){
      switchPages(e.currentTarget.dataset.out, e.currentTarget.dataset.in);
    }
  });

  btns.onClick = function(){
    console.log('clicked');
  };

  function switchPages(outFn, inFn){
    isAnimating = true;
    window[outFn](document.querySelector('.is-current'));
    window[inFn](document.querySelector('.js-page:not(.is-current)'));
  }

  function scaleUp(el){
    addClass(el, 'is-current');
    TweenLite.fromTo(el, duration, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      clearProps: 'opacity, scale'
    });
  }

  function scaleDown(el){
    addClass(el, 'is-current');
    TweenLite.fromTo(el, duration, {
      opacity: 1,
      scale: 1
    }, {
      opacity: 0,
      scale: 0.8,
      clearProps: 'opacity, scale',
      onComplete: function(){
        removeClass(el, ['is-onTop', 'is-current'])
      }
    });
  }

  function moveToRight(el){
    addClass(el, ['is-onTop', 'is-current']);
    TweenLite.fromTo(el, duration, {
      xPercent: 0
    }, {
      xPercent: -100,
      clearProps: 'xPercent',
      onComplete: function(){
        removeClass(el, ['is-onTop', 'is-current']);
        isAnimating = false;
      }
    });
  }

  function moveFromRight(el){
    addClass(el, ['is-onTop', 'is-current']);
    TweenLite.fromTo(el, duration, {
      xPercent: 100
    },{
      xPercent: 0,
      clearProps: 'xPercent',
      onComplete: function(){
        removeClass(el, 'is-onTop');
        isAnimating = false;
      }
    });
  }

  function addClass(el, className){
    [].concat(className).forEach(function(n){
      el.classList.add(n);
    });
  }

  function removeClass(el, className){
    [].concat(className).forEach(function(n){
      el.classlist.remove(n);
    });
  }

  function addEventListenerList(list, event, fn){
    for(let i = 0, len = list.length; i < len; i++){
      list[i].addEventListener(event, fn, false);
    }
  }
