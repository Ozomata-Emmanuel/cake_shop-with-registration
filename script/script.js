$(document).ready(function () {
  $("#register-form").submit(function (e) {
    e.preventDefault();

    
    const username = $("#username").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirm-password").val();
    const regEx = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

    const username_err = $("#username_err");
    const email_err = $("#email_err");
    const password_err = $("#password_err");
    const confirmPassword_err = $("#confirm-password_err");
    const submit_err = $("#submit_err");
    
    username_err.text()
    email_err.text()
    password_err.text()
    confirmPassword_err.text()
    submit_err.text()
    
    isValid = true
    
    if(!username){
      username_err.text('Username is repuired');
      isValid = false
    }else if(username.length < 2){
      username_err.text('Invalid username');
      isValid = false
    }else{
      username_err.text('');
      isValid = true
    }

    if(!email){
      email_err.text('Email adress is repuired');
      isValid = false
    }else if(!regEx.test(email)){
      email_err.text('invalid email format')
      isValid = false
    }else{
      email_err.text('');
      isValid = true
    }

    if(!password){
      password_err.text('Password is repuired');
      isValid = false
    }else{
      password_err.text('');
      isValid = true
    }

    if(password != '' && confirmPassword === '' && username != '' && email != ''){
      $('#submit_err').text('Password confirmation is needed');
      isValid = false
    }else{
      $('#submit_err').text('')
      isValid = true
    }

    if (password != '' && password.length < 6) {
      // alert("password is to short");
      $('#submit_err').text('password is to short')
      isValid = false
      return
    } else if (password != '' && confirmPassword !='' && password !== confirmPassword) {
      $('#submit_err').text('Passwords do not match');
      isValid = false
      return
    }else{
      isValid = true
    }
    
    if(isValid = true && username !== '' && email !== '' && password !== '' && confirmPassword !== ''){
      submit_err.text('Registration successful')
      location.href = "login.html";
    }else{
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((user) => user.email === email)) {
      $('#submit_er').text('Email is already registered');
      return;
    }
    
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // alert('Registration successful! Please log in.');
    $("#register-form")[0].reset();
    location.href = "login.html";

  });

  $("#login-form").submit(function (e) {
    e.preventDefault();

    const email = $("#login-email").val().trim();
    const password = $("#login-password").val();
    const nonExisting = $("#nonExisting");
    const loginEmailErr = $("#login_email_err");
    const loginPasswordErr = $("#login_password_err");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find( (user) => user.email === email && user.password === password);

    const regEx = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

    

    if(!email){
      loginEmailErr.text('Email adress is repuired');
    }else if(!regEx.test(email)){
      loginEmailErr.text('invalid email format')
    }else if (email !== ''){
      loginEmailErr.text('');
      nonExisting.text('')
    }

    if(password === ''){
      loginPasswordErr.text('Password is repuired');
      nonExisting.text('')
      return
    }else if(password !== ''){
      loginPasswordErr.text('');
      nonExisting.text('')
    }

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      location.href = "main.html";
    }else if (users.email !== email || users.password !== password && email !=='' && password !=='') {
      nonExisting.text("Invalid email or password");
    }else if (users.email !== email || users.password !== password  && password !==''  && email !=='') {
      nonExisting.text("Invalid email or password");
    } else if(email !== users.email && users.password !== password){
      $("#nonExisting").text("This account does not exist");
    }
  });

  if (location.pathname.endsWith("main.html")) {
    // const welcomeText
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      $("#welcome_text")("username");
    } else {
      alert("No user is logged in!");
      location.href = "login.html";
    }
  }

  // Handle Logout
  window.logout = function () {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
  };
});
