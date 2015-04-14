$('document').ready(function() {
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
    "div.attachments a.attachment_preview, ul.details a.swf, ul.details a.image, " +
    "ul.details a.attachment_preview, div.attachments div.thumbnails a")
    .fancybox(options);

  options = $.extend({},
    options,
    {
      'width': '95%', // or whatever
      'height': '95%',
      'onClosed': function() {
        $("#fancybox-inner").empty()
      }
    }
  );

  $("div.attachments a.pdf, ul.details a.pdf").each(function() {
    if(is_chrome()) {
      var inline_link = this.href.replace(/\/attachments\//, "/attachments/download_inline/");
      options.content = embed_chrome_pdf(inline_link)
    }
    else {
      options.content = embed_pdf(this.href)
    }
    $(this).fancybox(options)
  });

  $("div.attachments a.attachment_preview, ul.details a.attachment_preview").each(function() {
    if(is_chrome()) {
      var inline_link = this.href.replace(/\/preview\//, "/preview_inline/");
      options.content = embed_chrome_pdf(inline_link)
    }
    else {
      options.content = embed_pdf(this.href)
    }
    $(this).fancybox(options)
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
