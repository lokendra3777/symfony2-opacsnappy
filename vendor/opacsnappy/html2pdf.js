var config = {
					TIMEOUT: 10000 /* 4 seconds timout for loading images */
		}

var page = require('webpage').create();//new WebPage();
var system = require("system");
// change the paper size to letter, add some borders
// add a footer callback showing page numbers


page.paperSize = {
  format: "A4",
  orientation: "portrait",
  margin: {left:"0cm", right:"0cm", top:"0cm", bottom:"0cm"},
  footer: {
    height: "0.9cm",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<div style='text-align:center;'><small>" + pageNum +
        " / " + numPages + "</small></div>";
    })
  }
};
page.zoomFactor = 1;

page.settings = {  localToRemoteUrlAccessEnabled: true, loadImages: true, javascriptEnabled: true };
// assume the file is local, so we don't handle status errors
page.open(system.args[1], function (status) {
  // export to target (can be PNG, JPG or PDF!)
  
	
	page.evaluate(function () {
		var links = document.getElementsByTagName('link');
		for (var i = 0, len = links.length; i < len; ++i) {
			var link = links[i];
			if (link.rel == 'stylesheet') {
				//if (link.media == 'screen') { link.media = ''; }
				//if (link.media == 'print') { link.media = 'ignore'; }
				
				//if (link.media == 'screen') { link.media = ''; }
				//if (link.media == 'print') { link.media = 'ignore'; }
			}
		}
	});
  console.log(status)
  // we have a 3 second timeframe..
			var			timer = window.setTimeout(function () {
						page.render(system.args[2]);
						phantom.exit();
							//clearInterval(interval);
							//exitCallback('ERROR: While rendering, there\'s is a timeout reached');
						}, config.TIMEOUT);
						
						
  
  
});