let Imagedata = []

const request = async () => {

  const response = await fetch('https://api.github.com/repos/dhanishgajjar/vscode-icons/contents/svg')
  rawData = await response.json()

  rawData.forEach(element => {
    var userAction = async () => {
      if(element.name != 'ratatouille-remi.svg' && element.anem != 'matrix.svg') {
        var response = await fetch(`https://api.github.com/repos/dhanishgajjar/vscode-icons/contents/svg/${element.name}`);
        var myJson = await response.json(); //extract JSON from the http response
        Imagedata.push({json: myJson, name: element.name.toUpperCase().replace(/-/g, ' ').replace('.SVG','').replace('-', ' ').replace('_', ' ')})
      }
    }

    userAction()
  })

  setTimeout(()=>upload(Imagedata), 3000)
  
}

function upload(Imagedata) {
  for(var i = 0; i < Imagedata.length; i++) {
    if(Imagedata[i].json != undefined && Imagedata[i].name != 'MATRIX') {
      var html = `<div class="card"><img src="data:image/svg+xml;base64,${Imagedata[i].json.content}"/> <h3>${Imagedata[i].name}</h3></div>`
      document.getElementById('displayer').innerHTML += html;
    }
  };
  eventer()
}

function eventer() {
  var classname = document.getElementsByClassName("card");

  var myFunction = function() {
    console.log(this)
  };

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myFunction, false);
  }
}

request()