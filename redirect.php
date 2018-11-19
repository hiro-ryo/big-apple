<?php
	// ステータスコードを出力
	http_response_code( 301 ) ;

	// リダイレクト
	header( "Location: ./next.html" ) ;
	exit ;