var slider = document.getElementById("volume");
var output = document.getElementById("value");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  console.log(slider.value)
}
