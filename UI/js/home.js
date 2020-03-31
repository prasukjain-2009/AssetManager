$(document).ready(async () => {
  tags = []
  Promise.all([getAllAssets(), getTags(), getCategories()])

  $("#btn-submit").click((e) => {
    let data = {
      category: $("#selectCategory").val(),
      tag: $("#selectTag").val(),
    }
    if (!data.category) delete data.category
    if (!data.tag) delete data.tag
    getAllAssets(data)
  })


  $("#btnReset").click(e => {
    $("#selectCategory").val('');
    $("#selectTag").val('');
    getAllAssets()
  })
})




function getAllAssets(params = {}) {
  return new Promise(async (resp, reject) => {
    let requestData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      let res = await fetch('/api/asset?' + $.param(params), requestData)

      if (res.status === 200) {
        var assets = await res.json()
        var totalIncome = assets.data.total_income
        assets = assets.data.assets;

        var tbodyStr = ""
        for (let index = 0; index < assets.length; index++) {
          const element = assets[index];
          var tags = element.tag
          var tagstring = ""
          for (let j = 0; j < tags.length; j++) {
            const e = tags[j];
            tagstring += `<span class="tag" onclick = "tagSelected('${e.trim()}')">${e}</span>`
          }
          let itemstr = `
            <tr>
              <th >${element.name}</th>
              <td>$${element.income}</td>
              <td>${element.category}</td>
              <td>${tagstring}</td>
            </tr>`
          tbodyStr += itemstr
        }
        tbodyStr += `

        <tr class="TDTotalIncome">
          <td colspan=3 class="text-right font-weight-bold pr-5">Total Income</td>
          <td>$${totalIncome}.00</td>
        </tr>`
        $('#assetbody').html(tbodyStr)
        resp()
      } else return reject()
    } catch (err) {
      console.error(err)
      reject()
    }
  })
}

function getTags() {
  return new Promise(async (resp, reject) => {
    let requestData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      let res = await fetch('/api/tags', requestData)
      if (res.status === 200) {
        var tags = await res.json()
        let tagHTML = ""
        tags = tags.data
        for (let index = 0; index < tags.length; index++) {
          const elem = tags[index];
          let tagOPTION = `<option value="${elem}">${elem}</option>`
          tagHTML += tagOPTION
        }
        tagHTML += `<option value="" selected hidden>Select One</option>`
        $("#selectTag").html(tagHTML)
      }
    } catch (err) {
      console.error(err)
      reject()
    }
  })
}

function getCategories() {
  return new Promise(async (resp, reject) => {
    let requestData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      let res = await fetch('/api/categories', requestData)
      if (res.status === 200) {
        var categories = await res.json()
        let categoryHTML = ""
        categories = categories.data
        for (let index = 0; index < categories.length; index++) {
          const elem = categories[index];
          let tagOPTION = `<option value="${elem}">${elem}</option>`
          categoryHTML += tagOPTION
        }
        categoryHTML += `<option value="" selected hidden>Select One</option>`
        $("#selectCategory").html(categoryHTML)
      }
    } catch (err) {
      console.error(err)
      reject()
    }
  })
}

function tagSelected(e) {
  $("#selectTag").val(e)
  console.log($("#selectTag"));

  getAllAssets({
    tag: e
  })
}