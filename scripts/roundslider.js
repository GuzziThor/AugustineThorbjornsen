//Augustine Thorbjornsen s290428
//roundslider events
$("#type").roundSlider({
    value: 35,
});
// initial values set to 35 and 60
$("#shape").roundSlider({
    value: 60,
    sliderType: "min-range"
});
function sliderTypeChanged(e) {
$("#type").roundSlider({ sliderType: e.value });
}
function sliderShapeChanged(e) {
var options = { circleShape: e.value };
if (e.value == "pie") options["startAngle"] = 0;
else if (e.value == "custom-quarter" || e.value == "custom-half") options["startAngle"] = 45;
$("#shape").roundSlider(options);
}
