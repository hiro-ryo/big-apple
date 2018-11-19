window.onload = function(){
	requestFile(null, 'GET', './data/event.xml', true)
	
	
	// 書き換えボタンクリック時
	document.getElementById("write_btn").onclick = function() {
		location.href = "./redirect.php"
		/*
		console.log("クリック");
		
		var element = document.createElement("xml");
		element.innerHTML = 
			'<container>\n' +
			'	<element0 attribute="value0">テキストＡ</element0>\n' +
			'	<element1 attribute="value1">テキストＢ</element1>\n' +
			'</container>';

		// ------------------------------------------------------------
		// XMLSerializer オブジェクトを作成する
		// ------------------------------------------------------------
		var xml_serializer = new XMLSerializer();

		// ------------------------------------------------------------
		//「DOM ノード」から「XML 文字列」を生成する
		// ------------------------------------------------------------
		var text_xml = xml_serializer.serializeToString(element);
		
		// 出力テスト
		console.log(text_xml);
		
		writeTextFile("./data/event.xml",text_xml)
		*/
	};

};

function writeTextFile(afilename, output){
	var source = [ output ];

	// ------------------------------------------------------------
	// FilePropertyBag オブジェクトを用意
	// ------------------------------------------------------------
	var file_property_bag = {
	
		// コンテンツタイプを設定
		type: "text/xml",

		// 最終更新日時を設定（単位：ミリ秒）
		lastModified: 0
	};

	var txtFile =new File(source, "./data/event.xml", file_property_bag);
}


function creHR() {
	return new window.XMLHttpRequest();
}

function requestFile(data, method, fname, async) {
	//XMLHttpRequestオブジェクトを生成
	var HttpObject = creHR();
	//openメソッドでXMLファイルを開く
	HttpObject.open(method, fname, async);
	
	//無名functionによるイベント処理
	HttpObject.onreadystatechange = function() {
		if (HttpObject.readyState == 4) {
			//コールバック
			CB(HttpObject);
		}
	}
	
	//データの送信
	HttpObject.send(data);
}

	
//コールバック
function CB(HttpObj) {
	var resHTTP = HttpObj.responseXML.documentElement;
	eventList = resHTTP.getElementsByTagName('event');
	
	eventDate = resHTTP.getElementsByTagName('event_date');
	eventName = resHTTP.getElementsByTagName('event_name');
	
	document.getElementById("canvas").innerHTML = 
		eventList.length + "個のデータがあります<br /><br />";
	
	//ノードの数だけループ
	for(i = 0; i < eventList.length; i++) {
		document.getElementById("canvas").innerHTML +=
			eventDate[i].childNodes[0].nodeValue + " / ";
		document.getElementById("canvas").innerHTML +=
			eventName[i].childNodes[0].nodeValue + "<br /> ";
		document.getElementById("canvas").innerHTML += "<hr />";
	}
	
}

