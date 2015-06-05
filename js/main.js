
$( document ).ready(function() {
    var myButton = document.getElementById("clickButton");
    var myText = document.getElementById("helloText");
    
    myButton.addEventListener('click', doSomething, false)
    
    function doSomething() {
    	myText.textContent = "hello, world!";
    }
});

/** Store
    localStorage.setItem("lastname", "Smith");
    // Retrieve
    document.getElementById("result").innerHTML = localStorage.getItem("lastname");**/