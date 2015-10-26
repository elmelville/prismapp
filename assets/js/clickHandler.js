(function () {

  var links = document.getElementsByClassName("links"),
  templateDiv = document.getElementById("template"),
  headerDiv = document.getElementById('header'),
  nav = document.querySelector('nav > ul'),
  clicked = false, viewCount = { home: 2, signup: 1 };

  function renderTemplate(target,template,json){
    json = json || {'no-data':true};
    dust.render(template,json,function(err,out){
      if(err) console.log('Error:',err);
      else{
        target.innerHTML = out;
        for(var i = 0; i < links.length; i++){
          links[i].addEventListener('click', clickHandler, false);
        }
      }
    });
  }
/*
  function getAccountInfo(){
    $.get(
        '/account',
        {username: username, password:password}
    ).done(function(){
      renderTemplate(templateDiv,'home');
    }).fail(function(res){
        alert("Error: " + res.getResponseHeader("error"));
    });
  }
  */

  function clickHandler(e) {
    var target = e.target,
    templateName = this.getAttribute("data-template");
    if(clicked) {
      clicked.removeAttribute('class');
    }
    else {
      nav.querySelector('.active').removeAttribute('class');
    }
    target.parentElement.setAttribute('class','active');
    clicked = target.parentElement;
    renderTemplate(templateDiv, templateName);

    $("#signupButton").on('click',function(){
        var username = $("#signupName").val();
        var email = $('#signupEmail').val();
        var password = $("#signupPassword").val();
        var confirmPassword = $("#signupConfirmPassword").val();
        if (password.length > 7){
          if (username && password) {
              if (password === confirmPassword) {
                  $.post(
                      '/auth/local/register',
                      {email: email, username: username, password:password}
                  ).done(function(){
                    renderTemplate(templateDiv,'home');
                  }).fail(function(res){
                      alert("Error: " + res.getResponseHeader("error"));
                  });
              } else {
                  alert("Passwords don't match");
              }   
          } else {
              alert("A username and password is required");
          }
        }else{
          alert("Your password must be over 8 characters in length");
        }
    }); 
    $("#loginButton").on('click',function(){
        var username = $("#loginName").val();
        var password = $("#loginPassword").val();
        if (username && password) {
          $.post(
              '/auth/local/login',
              {username: username, password:password}
          ).done(function(req){
            console.log(req);
            renderTemplate(templateDiv,'home',{req: req});
            renderTemplate(headerDiv,'header',{req: req});
            console.log(req.session);
          }).fail(function(res){
              alert("Error: " + res.getResponseHeader("error"));
          });  
        } else {
          alert("A username and password is required");
        }
    });
  };

  for(var i = 0; i < links.length; i++){
    links[i].addEventListener('click', clickHandler, false);
  }

})();
