(function(){dust.register("header",body_0);function body_0(chk,ctx){return chk.write("<div id='header' class=\"header\"><nav><ul class=\"nav nav-pills pull-right\"><li role=\"presentation\" class=\"active\"><a href=\"#\" class=\"links\" data-template=\"home\">Home</a></li>").notexists(ctx.getPath(false, ["req","authenticated"]),ctx,{"else":body_1,"block":body_2},{}).write("</ul></nav></div>");}function body_1(chk,ctx){return chk.write("<li role=\"presentation\"><a href='#' class=\"links\" data-template=\"account\">Account</a></li><li role=\"presentation\"><a href=\"#\" class=\"links\" id=\"logout\">Logout</a></li>");}function body_2(chk,ctx){return chk.write("<li role=\"presentation\"><a href=\"#\" class=\"links\" data-template=\"signup\">Sign Up</a></li><li role=\"presentation\"><a href=\"#\" class=\"links\" data-template=\"login\">Login</a></li>");}return body_0;})();