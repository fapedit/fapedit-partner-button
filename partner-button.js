/*! fapedit-web/partner-button.js v1.0 | (c) 2018 FAPEDIT op. | Released under the MIT license */
(function(f,a,e) {
  
  var id='FapeditPartnerButton';
  e=f[id];
  
  var verbose_prefix='fapedit-web/partner-button.js';
  
  // startup
  var preload_obj=f[e];
  if (!(preload_obj instanceof Function && preload_obj.hasOwnProperty('p') && preload_obj.p instanceof Array && preload_obj.hasOwnProperty('v') && preload_obj.hasOwnProperty('r') && typeof(preload_obj.r)=='string')) {
    throw new Error(verbose_prefix+': [ERROR] something went wrong with the include script fragment');
    return;
  }
  var verbose=preload_obj.v===true;
  var partner_id=preload_obj.r;
  
  // greet console -- hello, dear console. ^^
  if (verbose) { console.log(verbose_prefix+' v1.0 loaded'); }
  
  // style consts
  var captionMap=['viewProps','createFrom','addTo','brandingF','branding'];
  var styleMap=['white_gray','white_green','green','gray'];
  
  var height=75;
  var widthMap={'viewProps':683,'createFrom':473,'addTo':823,'brandingF':height,'branding':179};
  
  var borderWidth=4;
  
  // feature detection (from Modernizr v3.5)
  var filters_supported=(function(te) {
    te=a.createElement('a');
    te.style.cssText='-webkit-filter:blur(2px);filter:blur(2px);';
    return !!te.style.length && ((document.documentMode===undefined || document.documentMode>9));
  })();
  var canvas_supported=(function(te) {
    te=a.createElement('canvas');
    return !!(te.getContext && te.getContext('2d'));
  })();
  
  if (!filters_supported) {
    if (canvas_supported) {
      if (verbose) { console.log(verbose_prefix+': [NOTICE] CSS filters are unsupported (browser is probably MSIE v9-11)'); }
    } else {
      if (verbose) { console.log(verbose_prefix+': [WARNING] CSS filters and Canvas API are unsupported, falling back to static buttonface and FORCE white_green style'); }
    }
  }
  
  // this is it.
  var captionImgMap=new Array();
  var $=(function() {
    
    // include css
    (function(c) {
      
      var white=0xffffff;
      var green=0x4b8466;
      var gray=0x6d6f6e
      
      // canvas functions
      var canvas=(function() {
        
        var canvas_elem=a.createElement('canvas');
        var ctx;
        
        var fillRGB=(function(rgb) {
          var canvas_data=ctx.getImageData(0,0,canvas_elem.width,canvas_elem.height);
          for (var y=0; y<canvas_data.height; y++){
            for(var x=0; x<canvas_data.width; x++){
              var i=(y*canvas_elem.width+x)*4;
              for (var channel=2*8; channel>=0; channel-=8) {
                canvas_data.data[i++]=(rgb & (0xff << channel)) >>> channel;
              }
             }
           }
          ctx.putImageData(canvas_data,0,0);
        });
        
        return {
          
          load: (function(caption_idx) {
            var img=captionImgMap[caption_idx];
            canvas_elem.width=img.width;
            canvas_elem.height=img.height;
            ctx=canvas_elem.getContext('2d');
            ctx.clearRect(0,0,img.width,img.height);
            ctx.drawImage(img,0,0);
          }),
          
          getDataUrl: (function() {
            return canvas_elem.toDataURL();
          }),
          
          grayscale: (function() {
            fillRGB(gray);
          }),
          overbrighten: (function() {
            fillRGB(white);
          }),
          
        };
        
      })();
      
      c=a.createElement('style');
      c.innerHTML=
        'button[id^="'+id+'"]'+'{'+
          'padding:0 !important;'+'margin:1em 0;'+'box-sizing:content-box !important;'+
          'border-style:solid !important;'+(filters_supported || !canvas_supported ? 'border-color:#'+green.toString(16)+' !important;' : '')+
          'position:relative;'+'overflow:hidden !important;'+
          'background-color:'+(filters_supported || canvas_supported ? 'transparent !important;'+'background-size:100% 200% !important;'+'background-position:center top !important;'+'transition:background-position .117s ease-out !important;' : '#'+white.toString(16)+' !important;')+
          'cursor:pointer !important;'+
        '}'+
        'button[id^="'+id+'"]:after'+(!filters_supported && canvas_supported ? ','+'button[id^="'+id+'"]:before' : '')+'{'+
          'content:"" !important;'+'position:absolute !important;'+
          'left:0 !important;'+'width:100% !important;'+
          'top:0 !important;'+'height:100% !important;'+
          'background-color:transparent !important;'+'background-position:center center !important;'+'background-size:contain !important;'+'image-rendering:pixelated !important;'+'-ms-interpolation-mode:nearest-neighbor !important;'+'background-repeat:no-repeat !important;'+
          (filters_supported ? 'transition:filter .117s linear,-webkit-filter .117s linear !important;' : canvas_supported ? 'transition:opacity .117s linear !important;' : '')+
        '}'+
        (filters_supported || canvas_supported ?
          'button[id^="'+id+'"].with_border'+(!filters_supported && canvas_supported ? ':not(.grayscale)' : '')+'{'+
            'background-image:linear-gradient(to top,#'+green.toString(16)+' 50%,#'+white.toString(16)+' 50%) !important;'+
          '}'+
          'button[id^="'+id+'"]:not(.with_border)'+(!filters_supported && canvas_supported ? ':not(.grayscale)' : '')+'{'+
            'background-image:linear-gradient(to bottom,#'+green.toString(16)+' 50%,#'+white.toString(16)+' 50%) !important;'+
          '}'+
          'button[id^="'+id+'"]:hover'+'{'+
            'background-position:center bottom !important;'+
          '}'
        : '')+
        (!filters_supported && canvas_supported ?
          'button[id^="'+id+'"]:not(.grayscale)'+'{'+
            'border-color:#'+green.toString(16)+' !important;'+
          '}'+
          'button[id^="'+id+'"].grayscale'+'{'+
            'border-color:#'+gray.toString(16)+' !important;'+
          '}'+
          'button[id^="'+id+'"].with_border.grayscale'+'{'+
            'background-image:linear-gradient(to top,#'+gray.toString(16)+' 50%,#'+white.toString(16)+' 50%) !important;'+
          '}'+
          'button[id^="'+id+'"]:not(.with_border).grayscale'+'{'+
            'background-image:linear-gradient(to bottom,#'+gray.toString(16)+' 50%,#'+white.toString(16)+' 50%) !important;'+
          '}'
        : '')+
        (function() {
          var caption_css='';
          for (var caption_idx in captionMap) {
            if (filters_supported || !canvas_supported) {
              caption_css+=
                'button[id^="'+id+'"].'+captionMap[caption_idx]+':after'+'{'+
                  'background-image:url('+"'"+(canvas_supported ? canvas.getDataUrl(canvas.load(caption_idx)) : captionImgMap[caption_idx].src)+"'"+') !important;'+
                '}';
            } else {
              canvas.load(caption_idx)
              caption_css+=
                'button[id^="'+id+'"].'+captionMap[caption_idx]+':not(.overbrighten):not(.grayscale):after'+','+
                'button[id^="'+id+'"].'+captionMap[caption_idx]+'.overbrighten:not(.grayscale):before'+'{'+
                  'background-image:url('+"'"+canvas.getDataUrl()+"'"+') !important;'+
                '}'+
                'button[id^="'+id+'"].'+captionMap[caption_idx]+'.overbrighten:after'+','+
                'button[id^="'+id+'"].'+captionMap[caption_idx]+':not(.overbrighten):before'+'{'+
                  'background-image:url('+"'"+canvas.getDataUrl(canvas.overbrighten())+"'"+') !important;'+
                '}'+
                'button[id^="'+id+'"].'+captionMap[caption_idx]+':not(.overbrighten).grayscale:after'+','+
                'button[id^="'+id+'"].'+captionMap[caption_idx]+'.overbrighten.grayscale:before'+'{'+
                  'background-image:url('+"'"+canvas.getDataUrl(canvas.grayscale())+"'"+') !important;'+
                '}';
            }
          }
          return caption_css;
        })()+
        (function() {
          var effect_css='';
          if (filters_supported) {
            effect_css+=
              'button[id^="'+id+'"].grayscale'+'{'+
                '-webkit-filter:grayscale(0.96) !important;'+'filter:grayscale(0.96) !important;'+
              '}'+
              'button[id^="'+id+'"].overbrighten:after'+','+
              'button[id^="'+id+'"]:not(.overbrighten):hover:after'+'{'+
                '-webkit-filter:brightness(3.11) !important;'+'filter:brightness(3.11) !important;'+
              '}'+
              'button[id^="'+id+'"].overbrighten:hover:after'+','+
              'button[id^="'+id+'"]:not(.overbrighten):after'+'{'+
                '-webkit-filter:brightness(1) !important;'+'filter:brightness(1) !important;'+
              '}';
          } else if (canvas_supported) {
            effect_css+=
              'button[id^="'+id+'"]:after'+','+
              'button[id^="'+id+'"]:hover:before'+'{'+
                'opacity:1 !important;'+
              '}'+
              'button[id^="'+id+'"]:before'+','+
              'button[id^="'+id+'"]:hover:after'+'{'+
                'opacity:0 !important;'+
              '}';
          }
          return effect_css;
        })();
      
      a.getElementsByTagName('head')[0].appendChild(c);
    })();
    
    // HTMLElement genFapeditPartnerButton(Object obj)
    var key=0;
    f[e]=(function(obj) {
      
      // parse arguments
      
      var query,caption,style,rounded,scale;
      
      obj=obj || {};
      if (obj.hasOwnProperty('query')) {
        query=obj.query;
      }
      if (query && (typeof(query)!='string' || !/q=[a-z]+/.test(query) || !/s=[a-z]+/.test(query))) {
        throw new Error(verbose_prefix+': [ERROR] argument "query" '+query+' {'+typeof(query)+'} is not a string or is invalid');
      }
      
      if (obj.hasOwnProperty('caption')) {
        caption=obj.caption;
      }
      if (captionMap.indexOf(caption)<0) {
        if (verbose) { console.log(verbose_prefix+': [WARNING] argument "caption" '+caption+' {'+typeof(caption)+'} is unknown, falling back to default'); }
        caption=query ? 'viewProps' : 'brandingF';
      }
      var branding=/branding/.test(caption);
      
      if (branding==(query ? true : false)) {
        if (branding) {
          throw new Error(verbose_prefix+': [ERROR] argument "query" '+query+' {'+typeof(query)+'} is in conflict with argument "caption" '+caption+' {'+typeof(caption)+'}');
        } else {
          throw new Error(verbose_prefix+': [ERROR] required argument "query" is not present in argument map');
        }
      }
      
      if (obj.hasOwnProperty('style')) {
        style=obj.style;
      }
      rounded=(function(rounded_regex_match) {
        var r=rounded_regex_match!==null;
        if (r) {
          style=style.substr(0,style.length-rounded_regex_match[0].length);
        }
        return r;
      })(/_rounded$/.exec(style));
      
      if (styleMap.indexOf(style)<0) {
        if (verbose) { console.log(verbose_prefix+': [WARNING] argument "style" '+style+' {'+typeof(style)+'} is unknown, falling back to default'); }
        style='green';
      }
      
      if (obj.hasOwnProperty('fit_width') || obj.hasOwnProperty('fit_height')) {
        var fw,fh;
        if (obj.hasOwnProperty('fit_width')) {
          if (!isFinite(obj.fit_width) || obj.fit_width<=0) {
            throw new Error(verbose_prefix+': [ERROR] argument "fit_width" '+fit_width+' {'+typeof(fit_width)+'} is not a number or less than or equal to 0');
          } else {
            fw=obj.fit_width/(widthMap[caption]+2*borderWidth);
          }
        } else {
          fw=Infinity;
        }
        if (obj.hasOwnProperty('fit_height')) {
          if (!isFinite(obj.fit_height) || obj.fit_height<=0) {
            throw new Error(verbose_prefix+': [ERROR] argument "fit_height" '+fit_height+' {'+typeof(fit_height)+'} is not a number or less than or equal to 0');
          } else {
            fh=obj.fit_height/(height+2*borderWidth);
          }
        } else {
          fh=Infinity;
        }
        scale=Math.min(fw,fh);
        if (verbose) { console.log(verbose_prefix+': [NOTICE] set argument "scale" to '+scale+' {'+typeof(scale)+'} according to present fit arguments'); }
      } else {
        if (!obj.hasOwnProperty('scale') || (typeof(obj.scale)=='string' && obj.scale=='normal')) {
          scale=branding ? .48 : .386;
        } else if (obj.hasOwnProperty('scale')) {
          if (typeof(obj.scale)=='string') {
            if (obj.scale=='small') {
              scale=branding ? .4 : .3;
            } else if (obj.scale=='large') {
              scale=branding ? .67 : .52;
            } else {
              throw new Error(verbose_prefix+': [ERROR] argument "scale" '+scale+' {'+typeof(scale)+'} is unknown as string');
            }
          } else {
            scale=obj.scale;
          }
        }
      }
      
      if (!isFinite(scale) || scale<=0) {
        throw new Error(verbose_prefix+': [ERROR] argument "scale" '+scale+' {'+typeof(scale)+'} is not a number or less than or equal to 0');
      }
      if (branding) {
        if (scale<0.4) {
          if (verbose) { console.log(verbose_prefix+': [WARNING] argument "scale" '+scale+' {'+typeof(scale)+'} is less than 0.4; this causes unrecognizable branding'); }
        }
      } else {
        if (scale<0.3) {
          if (verbose) { console.log(verbose_prefix+': [WARNING] argument "scale" '+scale+' {'+typeof(scale)+'} is less than 0.3, this causes unreadable text'); }
        }
      }
      if (scale>1) {
        if (verbose) { console.log(verbose_prefix+': [WARNING] argument "scale" '+scale+' {'+typeof(scale)+'} is greater than 1; this causes pixelation of magnified raster texture'); }
      }
      
      // create button
      
      var elem=this instanceof HTMLElement ? this : a.createElement('button');
      if (elem.style.visibility!='visible') {
        elem.style.visibility='visible';
      }
      elem.id=id+(key++);
      
      var classes=[caption];
      if (/white/.test(style)) {
        classes.push('with_border');
      } else {
        classes.push('overbrighten');
      }
      if (/gray/.test(style)) {
        classes.push('grayscale');
      }
      
      elem.className+=classes.join(' ');
      
      elem.style.cssText=
        'border-width:'+Math.round(borderWidth*scale)+'px !important;'+
        'width:'+Math.round(widthMap[caption]*scale)+'px !important;'+
        'height:'+Math.round(height*scale)+'px !important;'+
        (rounded ? 'border-radius:'+borderWidth*(4/3)*scale+'px !important;' : '');
      
      if (branding) {
        elem.title='FAPEDIT Asszisztens';
      }
      
      var click_hnd=(function() {
        location.assign('http://live.fapedit.hu/server/partner-button_redirect.php'+'?'+'p='+encodeURIComponent(partner_id)+'&'+'utm_campaign=partner-button'+'&'+'utm_medium='+(branding ? 'enter-app' : 'product-click')+(query ? '&'+query : ''));
      });
      elem.addEventListener('click',click_hnd,false); 
      
      // returning
      
      return elem;
      
    });
    
    // parse earlier calls
    for (var preload_p_idx in preload_obj.p) {
      var call_env=preload_obj.p[preload_p_idx];
      if (call_env.e.parentNode) {
        call_env.e.parentNode.replaceChild(f[e].apply(call_env.e,call_env.a),call_env.e);
      } else {
        if (verbose) { console.log(verbose_prefix+': [WARNING] return element of earlier func call is not in DOM, skipping',call_env.a); }
      }
    }
    preload_obj=undefined;
    
  });
  
  // load image resources
  (function(imgsload_hnd) {
    
    var load_count=0;
    var imgload_hnd=(function() {
      if (++load_count==captionMap.length && imgsload_hnd) {
        if (verbose) { console.log(verbose_prefix+': [NOTICE] loading image resources finished'); }
        imgsload_hnd.apply(this,arguments);
      }
    });
    
    for (var caption_idx in captionMap) {
      var img=new Image();
      img.crossOrigin='anonymous';
      img.src='http://static.fapedit.hu/js/partner-button/'+captionMap[caption_idx]+'.png';
      img.addEventListener('load',imgload_hnd,false); 
      captionImgMap.push(img);
    }
    
  })($);
  
})(window,document);