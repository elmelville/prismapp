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
        setLinks();
      }
    });
  }
  function setLinks(){
    $('.links').on('click',function(){
      templateName = this.getAttribute("data-template");
      $.post('auth/local/authorise').done(function(req){
        if(!req.noUser){
          renderTemplate(templateDiv, templateName, {req:req});
          renderTemplate(headerDiv,'header',{req: req});
        }else{
          renderTemplate(templateDiv, templateName);
        }
      }).fail(function(res){
        alert("Error: " + res.getResponseHeader("error"));
      });
    });
    $('#logout').on('click',function(){
      $.get('logout').done(function(){renderTemplate(templateDiv, 'home');});
    });
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
          renderTemplate(templateDiv,'account',{req: req});
          renderTemplate(headerDiv,'header',{req: req});
        }).fail(function(res){
            console.log(res);
            alert("Error: " + res.getResponseHeader("error"));
        });  
      } else {
        alert("A username and password is required");
      }
    });

    $('#buy-submit').on('click', function(){
      var buyAmount = $('#buy-input').val();
      if (buyAmount > 0){
        $.post(
          '/auth/local/buy',
          {buyAmount: buyAmount}
        ).done(function(res){
          console.log(res);
          alert(res.buyMessage);
        });
      }else{
        alert('You must enter a purchase amount');
      }
    });
  }

  function ajaxHandler(type,target,params,done,fail){
    if(type === 'post'){
      $.post(
        target,
        params
      ).done( function(req){
        done(req);
      }).fail(function(res){
        fail(res);
      });
    }else if( type === 'get'){
      $.get(
        target,
        params
      ).done( function(req){
        done(req);
      }).fail(function(res){
        fail(res);
      });
    }else{
      alert('Invalid REST');
    }
  }

  setLinks();
  $.post('auth/local/authorise').done(function(req){
    if(!req.noUser){
      renderTemplate(templateDiv, 'home', {req:req});
      renderTemplate(headerDiv,'header',{req: req});
    }else{
      renderTemplate(templateDiv, 'home');
    }
  }).fail(function(res){
    alert("Error: " + res.getResponseHeader("error"));
  });
})();
