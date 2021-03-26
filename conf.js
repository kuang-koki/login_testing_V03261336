exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs:['spec.js'],
	onPrepare: function() {
  //browser.manage().window().setSize(1920, 1080);
  browser.driver.manage().window().maximize();
}
};