var deleteTag ;

$(document).ready(() => {
  
  console.log("ready");
  var tags = []

  $("#clear").click()

  $("#form").submit((e) => {
    e.preventDefault()
    let data = {
      name: $("#assetName").val(),
      category: $("#assetCategory").val(),
      income: $("#assetIncome").val(),
      area: $("#assetArea").val(),
      tag: tags
    }
    console.log(data);

    let requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('/api/asset', requestData).then(res => {
      if (res.status != 200)
        return alert("API REQUEST FAILED")
      alert("Success")
      window.open('/', "_self")
    }).catch(err => alert(err))

  })

  $("#form").keydown(function (e) {
    
    if (e.keyCode == 13) {
      if(e.target.id!='tagInput')
      return;

      e.preventDefault();
      let inputValue=$('#tagInput').val().trim()
      if(inputValue == '' || tags.includes(inputValue))
      return;
      
      var tagsHtml= $('#tags').html()
      tags.push(inputValue)
      tagsHtml+= `<span class="tag" onclick="deleteTag('${inputValue}')">${inputValue}<i class="fa fa-times"></i></span>`;
      $('#tags').html(tagsHtml)
      $('#tagInput').val('')
      $('#tagInput').focus()
    }
  });
  // bootstrap-tagsinput.js file - add in local

  deleteTag = (tag)=>{
    console.log(tag);
    tags= tags.filter(e=>e!=tag)
    tagString = `<span class="tag" onclick="deleteTag('${tag}')">${tag}<i class="fa fa-times"></i></span>`
    var tagsHtml= $('#tags').html()
    tagsHtml = tagsHtml.replace(tagString,'')
      $('#tags').html(tagsHtml)
      console.log(tags);
    

  }
})

