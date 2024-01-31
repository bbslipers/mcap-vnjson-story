export default function (){

  const $tpl = $('<textarea class="vnjson__clipboard" style="position: absolute; left:-99999px;top:0;"></textarea>')
  this.$store.$screen.append($tpl);
  let flag = false;
  this.on('clipboard', data=>{
      flag = true;
      // получаем файл
      let dataFile = this.getDataByName(data);
      if(dataFile){
          $tpl.val(dataFile.body)
      }
      else{
          $tpl.val(data);
      }
      
  })
  $('.dialog-box').on("click", function() {
      if(flag){
        copyToClipboard(document.querySelector('.vnjson__clipboard'));
        flag = false;
      }
  });
}


function copyToClipboard(elem) {

    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {

        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    var succeed;
    try {
        succeed = document.execCommand("copy");

    } catch(e) {
        succeed = false;
    }

    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        target.textContent = "";
    }

    return succeed;
}