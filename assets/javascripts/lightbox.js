jQuery(function($) {
    var options = {
        padding: 0,
        openEffect: 'elastic',
        closeEffect: 'elastic',
        prevEffect: 'fade',
        prevSpeed: 'fast',
        nextEffect: 'fade',
        nextSpeed: 'fast',
        arrows: false,
        closeClick: true,
        mouseWheel :true
    };
    
  $("div.attachments div.thumbnails a").attr("rel", "attachments");

  $("div.attachments a.lightbox, div.attachments a.swf, div.attachments a.image, " +
    "ul.details a.swf, ul.details a.image, div.attachments div.thumbnails a")
    .fancybox(options);

  options = $.extend({},
      options, 
      {
      width: '100%', // or whatever
      height: '100%',
      autoSize: false,
      type: 'html',
      onClosed: function() {
        $("#fancybox-inner").empty()
        }
      }
  );
    
  $("div.attachments a.pdf, ul.details a.pdf, div.attachments a.attachment_preview, ul.details a.attachment_preview").each(function() {
    if(is_chrome()) {
      var inline_link = $(this).attr('class') == 'pdf' ?
        this.href.replace(/\/attachments\//, "/attachments/download_inline/") :
        this.href.replace(/\/preview\//, "/preview_inline/");
      options.content = embed_chrome_pdf(inline_link)
    }
    else {
      options.content = embed_pdf(this.href)
    }
    $(this).fancybox($.extend({}, options))
  });
    	
  function is_chrome() {
    return navigator.userAgent.indexOf("Chrome") >= -1
  }
  
  function embed_chrome_pdf(document_url) {
    return '<embed src="' + document_url + '" type="application/pdf" class="chrome"/>'
  }

  function embed_pdf(document_url) {
    return '<embed src="' + document_url + '#nameddest=self&page=1&view=FitH, 0&zoom=80,0,0" type="application/pdf" height="100%" width="100%" />'
  }

});
