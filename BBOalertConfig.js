function addConfigBox(label, cfg) {
    console.log(cfg.name);
    var configSelector = document.getElementById('bboalert-menu-config');
    if (configSelector == null) return;
    var opt = new Option(label);
    var s = localStorage.getItem('BBOalertConfig ' + label);
    if (s != null) {
        testobj1 = cfg;
        testobj2 = JSON.parse(s);
        $.extend(cfg, JSON.parse(s));
        testobj3 = cfg;
    }
    opt.cfgObj = cfg;
    opt.cfgLabel = label;
    configSelector.add(opt);
    $("#bboalert-menu-config").show();
    return cfg;
}

function clearConfigMenu() {
    var configSelector = document.getElementById('bboalert-menu-config');
    for (var i = configSelector.options.length - 1; i > 0; i--) {
        configSelector.options[i].remove();
    }
//    $("#bboalert-config-panel").hide();
    $("#bboalert-menu-config").hide();
}

function setConfigBox(title, cfg) {
    if ((typeof cfg).toLowerCase() != 'object') return;
    var k = Object.keys(cfg);
    var v = Object.values(cfg);
    h = '<div id="dialog"><table>';
    for (let i = 0; i < v.length; i++) {
        t = '';
        if ((typeof (v[i])) == "boolean") {
            t = '"checkbox"';
            if (v[i] == true) t = t + ' checked';   
        }
        if ((typeof (v[i])) == "number") {
            t = '"number" value=' +  v[i];
        }
        if ((typeof (v[i])) == "string") {
            t = '"text" value="' + v[i] + '"';
        }
        if (t != '') h = h + '<tr><td>' + k[i].replace(/_/g, ' ') + ' :</td><td><input type=' + t + '></input></td></tr>';
    }
    h = h + '</table><button>Cancel</button><button>OK</button>';
    var d = document.createElement('DIV');
    d.innerHTML = h;
    var b = d.querySelectorAll("button");
    b[0].onclick = function () {
        $(d).dialog("destroy");
    };
    b[1].onclick = function () {
        var j = d.querySelectorAll('input');
        for (let i = 0; i < v.length; i++) {
            if ((typeof (v[i])) == "boolean") {
                eval('cfg.'+k[i]+'='+j[i].checked);
            }
            if ((typeof (v[i])) == "number") {
                eval('cfg.'+k[i]+'='+j[i].value);
            }
            if ((typeof (v[i])) == "string") {
                eval('cfg.'+k[i]+'="'+j[i].value+'"');
            }
        }
        localStorage.setItem('BBOalertConfig ' + title, JSON.stringify(cfg));
        $(d).dialog("destroy");
    };
    $(d).dialog();
    $(d).dialog({
        title: title
    });
    $(d).dialog({
        width: "auto"
    });
}

function redrawTable() {
}
