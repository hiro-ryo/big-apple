window.onload = function(){
	// firebaseコンフィグ
	var config = {
		apiKey: "AIzaSyBqtqrnzRPl8swfPwvlwlC7CfkAL5J6-zA",
		authDomain: "big-apple-f214e.firebaseapp.com",
		databaseURL: "https://big-apple-f214e.firebaseio.com",
		projectId: "big-apple-f214e",
		storageBucket: "big-apple-f214e.appspot.com",
		messagingSenderId: "182384246777"
	};
	
	
	document.getElementById("get_btn").onclick = function() {
		firebase.initializeApp(config);
		
		// firestoreインスタンスの生成
		var db = firebase.firestore();
		
		
		// タイムスタンプの設定を記述
		var setting = { timestampsInSnapshots:true };
		db.settings(setting);
		
		// イベント全件取得
		db.collection("events").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				document.getElementById("canvas").innerHTML = 
					doc.get('event_date'); + " / ";
				document.getElementById("canvas").innerHTML +=
					doc.get('event_name'); + " <br /> ";
				document.getElementById("canvas").innerHTML += "<hr />";
			});
		});
	};
	
	// 書き換えボタンクリック時
	document.getElementById("write_btn").onclick = function() {
		addEvent("events", "忘年会", "2018/12/3", "2018/11/20");
	};

};


function addEvent(doc,name,date,now){
	db.collection(doc).add({
		event_name: name,
		event_date: date,
		update_date: now,
	});
}