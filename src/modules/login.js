$(() => {
	$('body')
	.on('keyup', '#modalLogin input', function() {
		login.doLogin(false);
	})
	.on('click', '#btnLogin', function() {
		login.doLogin(true);
	})
});


module.exports = {

	doLogin : (submit) => {
		let isSuccess = null;

		let frm = $("#modalLogin");
		let field = {
			LoginID: $(frm).find("input[name=LoginID]"),
			Password: $(frm).find("input[name=Password]")
		}

		$(frm).find(".has-success").removeClass("has-success");
		$(frm).find(".has-error").removeClass("has-error");
		$(frm).find(".glyphicon-ok").removeClass("glyphicon-ok");
		$(frm).find(".glyphicon-remove").removeClass("glyphicon-remove");
		if(!submit) return true;

		if(field.LoginID.val().indexOf("@")>-1) {
			if(common.getEmail(field.LoginID.val())) {
				field.LoginID.val(common.getEmail(field.LoginID.val()));
				common.chkValue(field.LoginID,true);
			}
			else {
				common.chkValue(field.LoginID,false);
				if(!isSuccess) isSuccess = field.LoginID;
			}
		}
		else {
			if(common.getLoginID(field.LoginID.val())) {
				field.LoginID.val(common.getLoginID(field.LoginID.val()));
				common.chkValue(field.LoginID,true);
			}
			else {
				common.chkValue(field.LoginID,false);
				if(!isSuccess) isSuccess = field.LoginID;
			}
		}
		if(field.Password.val().length<4) {
			common.chkValue(field.Password,false);
			if(!isSuccess) isSuccess = field.Password;
		}
		else {
			common.chkValue(field.Password,true);
		}        

		if(!isSuccess) {
			// SUBMIT CODE HERE
		}
		else {
			if(isSuccess.attr('title')!='') common.toast('error',isSuccess.attr('title'));
			$("body").stop().animate({ scrollTop: isSuccess.offset().top-150 }, 300, function() {isSuccess.focus();} );
		}
		return;        
	}

};