

//import $ from "./../../node_modules/jquery/src/jquery.js";
import Popper from "./../../node_modules/popper.js/dist/umd/popper.min.js";

import Util from "./../../node_modules/bootstrap/js/src/util.js";
import Tooltip from "./../../node_modules/bootstrap/js/src/tooltip.js";
import Collapse from "./../../node_modules/bootstrap/js/src/collapse.js";



document.write("<p>Это entry.js 2</p>");
document.write("<p>Ещё одна строка из entry-файла.</p>");
console.log(Popper);

$("#jirka").tooltip();



$(".toto").html("sexy");
$(".hidd").hide();
$(".toto").click(function() {
    $(".hidd").show();
    var popper = new Popper($(".toto"), $(".hidd"), {
        placement: "right"
    });
});