ons.ready(function() {
  // Firebaseの初期化
  var config = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID"
  };
  firebase.initializeApp(config);
  
  // Vueの処理 
	var vm = new Vue({
	  el: '#app',
	  // 初期データの設定
	  data: {
	  	photo: null,
	  	photo_url: null
	  },
	  
	  // テンプレート
	  template: `
	  <v-ons-page>
	    <v-ons-toolbar>
	      <div class="center"> Firebaseストレージ </div>
	    </v-ons-toolbar>
	    <section style="margin: 10px;">
	    	<ons-input type="file" name="photo" @change="fileChange" accept="image/*" />
	    	<ons-button @click="upload">アップロード</ons-button>
	    	<div v-if="photo_url">
	    		<div class="center">
		    		<img :src="photo_url" width="80%" />
		    	</div>
	    	</div>
	    </section>
	  </v-ons-page>`,
	  // イベント処理
	  methods: {
	  	// ファイルを指定した時の処理
	  	fileChange: function(e) {
	  		this.photo = e.target.files[0];
	  	},
	  	// 画像アップロード処理
	  	upload: function() {
	  		var me = this;
	  		// ストレージオブジェクト作成
	  		var storageRef = firebase.storage().ref();
	  		// ファイルのパスを設定
	  		var mountainsRef = storageRef.child(`images/${this.photo.name}`);
	  		// ファイルを適用してファイルアップロード開始
	  		var uploadTask = mountainsRef.put(this.photo);
	  		// ステータスを監視
	  		uploadTask.on('state_changed', function(snapshot){
	  		}, function(err) {
	  			console.log(err);
	  		}, function() {
	  			// アップロード完了したら画像のURLを取得
	  			me.photo_url = uploadTask.snapshot.downloadURL;
	  		})
	  	}
	  }
	});
});
