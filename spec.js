
//Login Testing
describe('CGM_CLICKDOC_application_Testing', function(){


	it('login_testing', function(){

	//1. open target page and check if you jump the correct page 	
		browser.ignoreSynchronization = true;
		browser.get('https://demo.clickdoc.de/');
		browser.driver.sleep(1000);		
		var betätigen_btn = element(by.xpath('//modal-container/div/div/app-consent-gdpr-accept-step/div/div[3]/button[@class="btn btn-primary agree-consent agree-consent--all"]'));
		betätigen_btn.click();
		browser.driver.sleep(2000);	
		expect(browser.getTitle()).toEqual('CLICKDOC - Arzttermine online buchen & Gesundheits-Apps');
		expect(browser.getCurrentUrl()).toEqual('https://demo.clickdoc.de/cd-de/');
	
	//2. click profile button and check if all elements are right
		
		//find the login button
		var log_button = element(by.xpath('//html/body/app-root/div[2]/div/app-header/div/div[2]/div/div[2]/ul/li[5]/a'));
		
		//click the login button
		browser.actions().mouseMove(log_button).doubleClick().perform();
		
		//wait for login page loading
		browser.driver.sleep(5000);

		//check if the login page load successful
		var login_window = element(by.tagName('app-iframe-dialog'));   
		
		//get the elements of current page
		var login_page = element(by.xpath('//iframe[@id="iframeDialog"]')).getWebElement();
		var close_Icon =  element(by.xpath('//app-iframe-dialog/div/div/div/span'));
		
		//jump to the frame page
		browser.switchTo().frame(login_page);
		
		
		//get the elements of frame page
		var Mail_Inputfield = element(by.id('mat-input-1')); 
		var Password_Inputfield = element(by.id('mat-input-2'));                            
		var Forgot_Password_Button = element(by.xpath('//form/div[1]/div/div/div[1]/a[@data-web-test="login_forgot_password"]'));                      
		var Login_Button = element(by.xpath('//form/div[1]/div/div/div[2]/button[@data-web-test="login_primary_btn"]'));
		var Register_Button = element(by.xpath('//form/div[1]/div/div/div[2]/button[@data-web-test="login_register_btn"]'));                                  
		                                    
		
		
		//check if the elements of frame page are displayed
		expect(Mail_Inputfield.isPresent()).toBe(true);
		expect(Password_Inputfield.isPresent()).toBe(true);
    	expect(Forgot_Password_Button.isPresent()).toBe(true);
		expect(Login_Button.isPresent()).toBe(true);
		expect(Register_Button.isPresent()).toBe(true);
		
		//jump to the current page, check frame and close Icon
		browser.switchTo().defaultContent(); 
		expect(close_Icon.isPresent()).toBe(true);
		expect(login_window.isPresent()).toBe(true);

		//jump to the frame page again and operate
		browser.switchTo().frame(login_page);

	//3. login without Email and password
		Login_Button.click();

		var error_for_Email_missing = element(by.id('mat-error-0')).getText();
		var error_for_password_missing = element(by.id('mat-error-1')).getText();
		
		//Login is rejected,Mail- and Passwordinputfield are marked red as invalid and tipp display
		expect(Mail_Inputfield.getCssValue('caret-color')).toBe('rgb(244, 67, 54)');
		expect(Password_Inputfield.getCssValue('caret-color')).toBe('rgb(244, 67, 54)');
		expect(error_for_Email_missing).toEqual('Bitte geben Sie Ihre E-Mail-Adresse ein.');
		expect(error_for_password_missing).toEqual('Bitte geben Sie Ihr Passwort ein.');

	//4. Enter an valid e-mail into the mail-inputfield
		var correct_Email = 'dirk.nonn@cgm.com#1111';
		Mail_Inputfield.sendKeys(correct_Email);
		//Inputfield for mail-adress is no longer marked as invalid
		expect(error_for_Email_missing.isPresent()).toBe(false);
		
		//define a wrong password
		var wrong_pass = Math.random().toString(36).slice(-6);
	//5. input wrong password and login
		Password_Inputfield.sendKeys(wrong_pass);
		expect(error_for_password_missing.isPresent()).toBe(false);

		Login_Button.click();
		browser.driver.sleep(2000);	
		var error_container = element(by.xpath('//app-login/form/div[1]/div/div/app-error-message/div[@class="error-container"]/div[1]/p'));
		//Login is blocked and information text informs about the missmatching inputs
		expect(error_container.isPresent()).toBe(true);
		expect(error_container.getText()).toEqual('Bitte überprüfen Sie Ihre Eingaben und probieren Sie es erneut. Haben Sie noch keine CGM LIFE ID?');
		
	//6. Enter an invalid e-mail into the mail-inputfield and click login-button
		var invalid_Email = 'testmail.com';
		Mail_Inputfield.clear();
		Mail_Inputfield.sendKeys(invalid_Email);
		Login_Button.click();
		browser.driver.sleep(2000);	
		//Login is blocked and information text informs about the missmatching inputs
		expect(error_container.isPresent()).toBe(true);
		expect(error_container.getText()).toEqual('Bitte überprüfen Sie Ihre Eingaben und probieren Sie es erneut. Haben Sie noch keine CGM LIFE ID?');

	//7. Enter valid e-mail and password, then click the login-button
		var correct_pass = 'recruitingTest1!';
		Mail_Inputfield.clear();
		Password_Inputfield.clear();
		Mail_Inputfield.sendKeys(correct_Email);
		Password_Inputfield.sendKeys(correct_pass);
		Login_Button.click();
		browser.driver.sleep(8000);	
		//Login is performed, login frame is colosed, Profile-Button is replaced by user-icon
		var user_icon = element(by.xpath('//html/body/app-root/div[2]/div/app-header/div/div[2]/div/div[2]/ul/li[6]/a/app-avatar/div/img'));

		expect(login_window.isPresent()).toBe(false);
		expect(user_icon.isPresent()).toBe(true);

	//8. Click on Profile-Button 

		user_icon.click();
		browser.driver.sleep(1000);

		//Menu should be opened, with following options:1. My Profile 2. Logout

		var My_Profile = element(by.xpath('//a[@href="/cd-de/my-profile"]/div/span[@class="menu-text ng-tns-c117-0"]'));
		var Logout = element(by.xpath('//a[@angularticsaction="Open log-out iframe"]/div/span[@class="menu-text ng-tns-c117-0"]'));

		expect(My_Profile.isPresent()).toBe(true);
		expect(My_Profile.getText()).toEqual('Mein Profil');
		expect(Logout.isPresent()).toBe(true);
		expect(Logout.getText()).toEqual('Logout');

	//9. Select and click „Logout“

		Logout.click();
		browser.driver.sleep(1000);
		//jump to the Frontpage and logout

		expect(browser.getTitle()).toEqual('CLICKDOC - Arzttermine online buchen & Gesundheits-Apps');
		expect(browser.getCurrentUrl()).toEqual('https://demo.clickdoc.de/cd-de/');
		expect(user_icon.isPresent()).toBe(false);
	
	});


});