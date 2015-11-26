$(document).ready(function() {
	
	// Fade in
	$('body').animate({'opacity': 1}, 1000);
	
	// Init
	var height = $(window).height();
	var width = $(window).width();
	$('.mobile').height(height);
	$('.home .item h1').css('line-height', $('.home .item').width() + 'px');
	
	// Mobile
	$('.menu-icon').click(function() {
		if($('.mobile').hasClass('active')) {
			$('.mobile').removeClass('active');
			$('.menu-icon .fa-remove').attr('class', 'fa fa-bars');
		} else {
			$('.mobile').addClass('active');
			$('.menu-icon .fa-bars').attr('class', 'fa fa-remove');
		}
	});
	if(WURFL.is_mobile){
		var mobile = true;
		$(window).bind('orientationchange', function(e) {
			
		});
	}
	
	// Clean contenteditable
	if($('.content').length) $('.content').attr('contenteditable', 'false');
	
	// Article page
	// Clean article links and put para within div
	if($('.article').length) {
		$('.article.container figure img').attr('src', $('.article.container figure img').attr('src').replace('../', '../../'));
		$('.article-container > .content, .article.container > figure').wrap('<div class="col-lg-12 nopadding"></div>');
	}
	
	// Manager
	if($('.manager').length) {
		$('.manager .fa-plus').writer();
		$('.media h2 .fa-pencil').editor();
		$('.media h2 .fa-remove').deleter();
		$('.portfolio .add').portfolioAdd();
		$('.portfolio .item .fa-edit').portfolioEdit();
		$('.portfolio .item .fa-remove').portfolioDel();
	}
	
	// Home
	if($('.home').length) {
		if(width >= 1200) {
			$('.holder').width((width / 3) * $('.holder figure').length);
			$('.holder figure').width(width / 3);
			setInterval(function() { 
				if(parseInt($('.holder').css('margin-left')) <= - ($('.holder figure').length - 4) * (width / 3)) $('.holder').animate({'margin-left': '0px'}, 1200, 'easeOutCubic');
				else $('.holder').animate({'margin-left': '-=' + width / 3 + 'px'}, 600, 'easeOutCubic');
			}, 6000);
		} else if(width < 1200 && width >= 600) {
			$('.holder').width((width / 2) * $('.holder figure').length);
			$('.holder figure').width(width / 2);
			setInterval(function() { 
				if(parseInt($('.holder').css('margin-left')) <= - ($('.holder figure').length - 3) * (width / 2)) $('.holder').animate({'margin-left': '0px'}, 1200, 'easeOutCubic');
				else $('.holder').animate({'margin-left': '-=' + width / 2 + 'px'}, 600, 'easeOutCubic');
			}, 6000);
		} else if(width < 600) {
			$('.holder').width(width * $('.holder figure').length);
			$('.holder figure').width(width);
			setInterval(function() { 
				if(parseInt($('.holder').css('margin-left')) <= - ($('.holder figure').length - 1) * width) $('.holder').animate({'margin-left': '0px'}, 1200, 'easeOutCubic');
				else $('.holder').animate({'margin-left': '-=' + width + 'px'}, 600, 'easeOutCubic');
			}, 6000);
		}
		
		/*$.each($('.home .item').get().sort(function() { return Math.random()*10 > 5 ? 1 : -1 }), function(i, element) {
			$(element).css('opacity', 0).stop().delay(i * 90).animate({'opacity': 1}, 600, 'easeOutCubic', function() { $(element).find('figure').addClass('smooth') });
		});*/
		$('.overlay .overlay-logo').mouseover(function() {
			$('.overlay').stop().animate({backgroundColor: 'black'}, 600);
		}).mouseout(function() {
			$('.overlay').stop().animate({backgroundColor: 'white'}, 600);
		});
		$('.overlay').click(function() { $('.overlay').fadeOut(600, function() { 
			$(this).remove();
			$('body').prepend('<div class="scrolldown smooth"><i class="fa fa-chevron-circle-down"></i></div>');
			$('.scrolldown').click(function() { $('body').animate({scrollTop: height}, 600, 'easeOutCubic'); });
		}); });
	}
	
	// contact page
	if($('.contact').length) {
		// Instagram
		var instaFeed = new Instafeed({
			get: 'user',
			userId: 1707742711,
			accessToken: '1200610988.17f057d.79066d461597400f9a8c20ed7378313f',
			sortBy: 'most-recent',
			limit: 6,
			resolution: 'standard_resolution',
			template: '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-2 nopadding"><figure><img src="{{image}}" /></figure></div>'
		}).run();
		
		$('#contact').validator().on('submit', function (e) {
		  if (e.isDefaultPrevented()) {
			// handle the invalid form...
		  } else {
			$.post('../static/scripts/contact.php', $(this).serialize(), function(result) {
				$('#contact').hide(300);
				$('.contact .alert-success').show(300);
			}).fail(function() {
				$('#contact').hide(300);
				$('.contact .alert-danger').show(300);
			});
		  }
		});
	}
	
	// Portfolio Slideshow
	if($('._portfolio').length) {
		// Set up slideshow
		$('.slideshow').find('figure').each(function(index, element) {
            $(element).find('img').each(function(_index, _element) {
                $(_element).attr('src', 'img.php?src=' + $(_element).attr('src') + '&width=1170&height=750&crop-to-fit').wrap('<figure></figure>');
            });
			$(element).find('figure').unwrap();
			if(index === 0) {
				$('.slideshow').width($('.slideshow-holder').outerWidth() * $('.slideshow').find('figure').length);
				$('.slideshow').find('figure').width($('.slideshow-holder').outerWidth());
			}
        });
		var slideRight = function() { $('._portfolio .slideshow-holder').find('.fa-chevron-right').click() };
		var slideTimer = setInterval(function() { slideRight() }, 6000);
		$('._portfolio .slideshow-holder').find('.fa-chevron-right').click(function() {
			if(parseInt($('._portfolio .slideshow').css('margin-left')) <= - ($('._portfolio .slideshow').find('figure').length - 1) * $('.slideshow-holder').outerWidth()) $('._portfolio .slideshow').animate({'margin-left': '0px'}, 1200, 'easeOutCubic');
			else $('._portfolio .slideshow').animate({'margin-left': '-=' + $('.slideshow-holder').outerWidth() + 'px'}, 600, 'easeOutCubic');
			clearInterval(slideTimer);
			slideTimer = setInterval(function() { slideRight() }, 6000);
		});
		$('._portfolio .slideshow-holder').find('.fa-chevron-left').click(function() {
			if($('._portfolio .slideshow').css('margin-left') >= '0px') $('._portfolio .slideshow').animate({'margin-left': '-' + ($('._portfolio .landing-image').find('figure').length - 1) * $('.slideshow-holder').outerWidth() + 'px'}, 1200, 'easeOutCubic');
			else $('._portfolio .slideshow').animate({'margin-left': '+=' + $('.slideshow-holder').outerWidth() + 'px'}, 600, 'easeOutCubic');
			clearInterval(slideTimer);
			slideTimer = setInterval(function() { slideRight() }, 6000);
		});
	}
	
	// Project
	if($('.project').length) {
		$('.holder').width($('.holder').width() * ($('.holder figure').length + 1));
		$('.holder figure').width($('.project-slide').outerWidth());
		var slideRight = function() { $('.project .project-slide').find('.fa-chevron-right').click() };
		var slideTimer = setInterval(function() { slideRight() }, 6000);
		$('.project .project-slide').find('.fa-chevron-right').click(function() {
			if(parseInt($('.project .holder').css('margin-left')) <= - ($('.project .holder').find('figure').length - 1) * $('.project .project-slide').outerWidth()) $('.project .holder').animate({'margin-left': '0px'}, 1200, 'easeOutCubic');
			else $('.project .holder').animate({'margin-left': '-=' + $('.project .project-slide').outerWidth() + 'px'}, 600, 'easeOutCubic');
			clearInterval(slideTimer);
			slideTimer = setInterval(function() { slideRight() }, 6000);
		});
		$('.project .project-slide').find('.fa-chevron-left').click(function() {
			if($('.project .holder').css('margin-left') >= '0px') $('.project .holder').animate({'margin-left': '-' + ($('.project .holder').find('figure').length - 1) * $('.project .project-slide').outerWidth() + 'px'}, 1200, 'easeOutCubic');
			else $('.project .holder').animate({'margin-left': '+=' + $('.project .project-slide').outerWidth() + 'px'}, 600, 'easeOutCubic');
			clearInterval(slideTimer);
			slideTimer = setInterval(function() { slideRight() }, 6000);
		});
	}
	
	// On resize
	$(window).resize(function() {
		height = $(window).height();
		width = $(window).width();
		$('.mobile').height(height);
		$('.home .item h1').css('line-height', $('.home .item').width() + 'px');
	});
	
	// Scroll functions
	var userScrolled = false;

	$(window).scroll(function() {
		userScrolled = true;
	});
	
	setInterval(function() {
	  	if (userScrolled) {
			
			// Header
			if(!mobile) {
				if($(window).scrollTop() > 48) {
					$('.header').addClass('onscroll');
				} else {
					$('.header').removeClass('onscroll');
				}
			}
			
			if($(window).scrollTop() > height / 2) {
					$('.scrolldown').addClass('inactive');
				} else {
					$('.scrolldown').removeClass('inactive');
				}

			userScrolled = false;
	  	}
	}, 10);
	
	// contact form
	if($('#contact').length) {
		/*
		$('#contact').formValidation({
			message: 'Please enter correct details.',
			submitButtons: '#submit',
			trigger: null
		}).on('success.form.fv', function(e){
			e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('bootstrapValidator');
			$.post($form.attr('action'), $form.serialize(), function(result) {
				$('#contact').hide(300);
				$('.contact .alert-success').show(300);
			}).fail(function() {
				$('#contact').hide(300);
				$('.contact .alert-danger').show(300);
			});
		});*/
	}
	
});
/* Background Colour Animate */
!function(r){function t(t){var a;return t&&t.constructor==Array&&3==t.length?t:(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t))?[parseInt(a[1]),parseInt(a[2]),parseInt(a[3])]:(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t))?[2.55*parseFloat(a[1]),2.55*parseFloat(a[2]),2.55*parseFloat(a[3])]:(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t))?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t))?[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]:(a=/rgba\(0, 0, 0, 0\)/.exec(t))?e.transparent:e[r.trim(t).toLowerCase()]}function a(a,e){var o;do{if(o=r.css(a,e),""!=o&&"transparent"!=o||r.nodeName(a,"body"))break;e="backgroundColor"}while(a=a.parentNode);return t(o)}r.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(e,o){r.fx.step[o]=function(r){r.colorInit||(r.start=a(r.elem,o),r.end=t(r.end),r.colorInit=!0),r.elem.style[o]="rgb("+[Math.max(Math.min(parseInt(r.pos*(r.end[0]-r.start[0])+r.start[0]),255),0),Math.max(Math.min(parseInt(r.pos*(r.end[1]-r.start[1])+r.start[1]),255),0),Math.max(Math.min(parseInt(r.pos*(r.end[2]-r.start[2])+r.start[2]),255),0)].join(",")+")"}});var e={white:[247,247,247],black:[0,0,0]}}(jQuery);
/*
 * jQuery Easing v1.3.2 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
*/
(function(h){h.easing.jswing=h.easing.swing;h.extend(h.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return h.easing[h.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){return 1>
(a/=d/2)?b/2*a*a*a+c:b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,a,
c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return 0==a?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){return 0==a?c:a==d?c+b:1>(a/=d/2)?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c},easeInCirc:function(e,a,c,b,d){return-b*
(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){return 1>(a/=d/2)?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(1==(a/=d))return c+b;f||(f=.3*d);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*--a)*Math.sin(2*(a*d-e)*Math.PI/f))+c},easeOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==
a)return c;if(1==(a/=d))return c+b;f||(f=.3*d);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin(2*(a*d-e)*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(2==(a/=d/2))return c+b;f||(f=.3*d*1.5);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return 1>a?-.5*g*Math.pow(2,10*--a)*Math.sin(2*(a*d-e)*Math.PI/f)+c:g*Math.pow(2,-10*--a)*Math.sin(2*(a*d-e)*Math.PI/f)*.5+b+c},easeInBack:function(e,a,c,b,d,f){void 0==
f&&(f=1.70158);return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){void 0==f&&(f=1.70158);return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){void 0==f&&(f=1.70158);return 1>(a/=d/2)?b/2*a*a*(((f*=1.525)+1)*a-f)+c:b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-h.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=d)<1/2.75?7.5625*b*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+.75)+c:a<2.5/2.75?b*(7.5625*
(a-=2.25/2.75)*a+.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+.984375)+c},easeInOutBounce:function(e,a,c,b,d){return a<d/2?.5*h.easing.easeInBounce(e,2*a,0,b,d)+c:.5*h.easing.easeOutBounce(e,2*a-d,0,b,d)+.5*b+c}})})(jQuery);

// Generated by CoffeeScript 1.3.3
(function(){var e,t;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?d=["","random"]:d=this.options.sortBy.split("-"),p=d[0]==="least"?!0:!1;switch(d[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",p);break;case"liked":e.data=this._sortBy(e.data,"likes.count",p);break;case"commented":e.data=this._sortBy(e.data,"comments.count",p);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){a=e.data,this.options.limit!=null&&a.length>this.options.limit&&(a=a.slice(0,this.options.limit+1||9e9)),n=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(a=this._filter(a,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="",l="",v=document.createElement("div");for(m=0,b=a.length;m<b;m++)s=a[m],u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:u,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;v.innerHTML=i,S=[].slice.call(v.childNodes);for(g=0,w=S.length;g<w;g++)h=S[g],n.appendChild(h)}else for(y=0,E=a.length;y<E;y++)s=a[y],f=document.createElement("img"),u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),f.src=u,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(f),n.appendChild(t)):n.appendChild(f);document.getElementById(this.options.target).appendChild(n),r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("instafeed-fetcher")),c="instafeedCache"+this.unique,window[c]=void 0;try{delete window[c]}catch(x){}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],i=function(e){if(t(e))return n.push(e)};for(s=0,o=e.length;s<o;s++)r=e[s],i(r);return n},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.Instafeed=e}).call(this);