(function(window,jQuery){
    "use strict";
    var Htmls = {
        ovl: '<div class="J_WinpopMask winpop-mask" id="J_winpopMask"></div>'+
             '<div class="J_WinpopBox winpop-box" id="J_winpopbox">'+
                  '<div class="J_WinpopMain winpop-main"></div>'+
                  '<div class="J_WinpopBtns winpop-btns"></div>'+
             '</div>',
        alert: '<input type="button" class="J_AltBtn pop-btn alert-button" value="确定"/>',
        confirm: '<input type="button" class="J_CfmFalse pop-btn confirm-false" value="取消"/>'+
                 '<input type="button" class="J_CfmTrue pop-btn confirm-true" value="确定"/>',
        prompt: '<input type="button" class="J_promptFalse pop-btn" value="取消"/>'+
                '<input type="button" class="J_promptTrue pop-btn" value="确定"/>',
        promptText: '<input type="text" class="promptText" value=""/>'

    };

    function Winpop(){
        var config = {};
        this.get = function(n){
            return config[n];
        }
        this.set = function(n,v){
            config[n] = v;
        }
        this.init();
    }

    Winpop.prototype = {
        init: function(){
            this.createDom();
            this.bindEvent();
        },
        createDom: function(){
            var body = $("body"),
                ovl = $("#J_winpopbox"),
                mask = $("#J_winpopMask");            
            if(!ovl.length){
                body.append(Htmls.ovl);
            }
            ovl = $("#J_winpopbox");
            mask = $("#J_winpopMask");
            this.set("ovl",ovl);
            this.set("mask",mask);
        },
        bindEvent: function(){
            var _this = this,
                ovl = _this.get("ovl"),
                mask = _this.get("mask");
            ovl.on("click",".J_AltBtn",function(e){
                _this.hide();
            });
            ovl.on("click",".J_CfmTrue",function(e){
                _this.cfmClick(_this,true);
            });
            ovl.on("click",".J_CfmFalse", function(e) {
                _this.cfmClick(_this,false);
            });
            ovl.on("click",".J_promptTrue",function(e){
                window.prompt.texts = ovl.find(".promptText").val();
                _this.promptClick(_this,true);
            });
            ovl.on("click",".J_promptFalse", function(e) {
                _this.promptClick(_this,false);
            });
            mask.on("click", function(e) {
                _this.hide();
            });
        },
        cfmClick: function(_this,str){
            var cf = _this.get("confirmBack");
                _this.hide();
                cf && cf(str);
        },
        promptClick: function(_this,str){
            var pp = _this.get("promptBack");
                _this.hide();
                pp && pp(str);
        },
        varpb: function(str){
            var str = typeof str === 'string' ? str : str.toString();
            return str;
        },
        alert: function(str,btnstr){
            var ovl = this.get("ovl");
            ovl.find(".J_WinpopMain").html(this.varpb(str));
            if( typeof btnstr == "undefined" ){
                ovl.find(".J_WinpopBtns").html(Htmls.alert);
            }else{
                ovl.find(".J_WinpopBtns").html(btnstr);
            }
            this.show();
        },
        confirm: function(str,callback){
            var ovl = this.get("ovl");
            ovl.find(".J_WinpopMain").html(this.varpb(str));
            ovl.find(".J_WinpopBtns").html(Htmls.confirm);
            this.set("confirmBack", (callback || function(){} ));
            this.show();
        },
        prompt: function(str,callback){
            var ovl = this.get("ovl");
            ovl.find(".J_WinpopMain").html(Htmls.promptText);
            ovl.find(".promptText").before(this.varpb(str));
            ovl.find(".J_WinpopBtns").html(Htmls.prompt);
            this.set("promptBack", (callback || function(){} ));
            this.show();
        },
        show: function(){
            this.get("ovl").show();
            this.get("mask").show();
        },
        hide: function(){
            var ovl = this.get("ovl");
            ovl.find(".J_WinpopMain, .J_WinpopBtns").html("");
            ovl.hide();
            this.get("mask").hide();
        },
        destroy: function(){
            this.get("ovl").remove();
            this.get("mask").remove();
            delete window.alert;
            delete window.confirm;
        }
    };

    var objs = new Winpop();
    window.alert = function(str){
        objs.alert.call(objs,str);
    };
    window.confirm = function(str,cb){
        objs.confirm.call(objs,str,cb);
    };
    window.prompt = function(str,cb){
        objs.prompt.call(objs,str,cb);
    };
 
})(window,jQuery);