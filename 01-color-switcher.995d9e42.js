!function(){var t=document.body,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),a=0;function c(t){e.disabled=t,n.disabled=!t}e.addEventListener("click",(function(){a=setInterval((function(){t.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),2e3),c(!0)})),n.addEventListener("click",(function(){clearInterval(a),c(!1)})),c(!1)}();
//# sourceMappingURL=01-color-switcher.995d9e42.js.map
