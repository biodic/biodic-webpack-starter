module.exports = {

	// Email validation check
	getEmail : (email) => {
		email = email.replace(/ /gi,"").toLowerCase();
		var regExp = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (regExp.test(email)) {
			return email;
		}
		else {
			return false;
		}
	},

	// LoginID validation check : 5~32bytes
	getLoginID : (ID) => {
		ID = ID.replace(/ /gi,"").toLowerCase();
		var regExp = /^[a-z]+[a-z0-9]{4,32}$/g;
		if (regExp.test(ID)) {
			return ID;
		}
		else {
			return false;
		}
	},


	// Input field check (bootstrap)
	chkValue : (obj,isSuccess,doFocus) => {
		if(isSuccess) {
			$(obj).closest(".has-feedback").addClass("has-success");
			$(obj).closest(".has-feedback").find(".form-control-feedback").addClass("glyphicon-ok");
		}
		else {
			$(obj).closest(".has-feedback").addClass("has-error");
			$(obj).closest(".has-feedback").find(".form-control-feedback").addClass("glyphicon-remove");
			
			if(doFocus) $("body").stop().animate({ scrollTop: $(obj).offset().top-100 }, 300, function() {$(obj).focus();} );
		}
	},


	// Toast Popup (toastr)
	toast : (category,msg,title,callback) => {
		if(typeof(category)=='undefined' || category=='' || msg=='') return;
		if(typeof(title)=="undefined" || !title || title=="") title = category.charAt(0).toUpperCase() + category.slice(1) + '!';
		let option = {
			timeOut: 2000, 
			progressBar: false, 
			positionClass: "toast-top-full-width", 
			preventDuplicates: true,
			onHidden: function() {}
		}
		if(callback) option.onHidden = function() { callback();  };
			
		if(category=='error') Toastr.error(msg, title, option);
		else if(category=='info') Toastr.info(msg, title, option);
		else if(category=='warning') Toastr.warning(msg, title, option);
		else Toastr.success(msg, title, option);
	}
};