<?php

class Main extends Controller {
	
	function index()
	{
		$portfolio = $this->loadModel('portfolio_model');
		$result = $portfolio->getAll();
		
		$blog = $this->loadModel('blog_model');
		$resultb = $blog->getAll();
		
		$template = $this->loadView('home');
		$template->set('title', 'Home');
		$template->set('result', $result);
		$template->set('resultb', $resultb);
		$template->render();
	}
	

	
}

?>