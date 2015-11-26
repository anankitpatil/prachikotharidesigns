<?php

class Services extends Controller {
	
	function index()
	{
		$portfolio = $this->loadModel('portfolio_model');
		$result = $portfolio->getAll();
		
		$template = $this->loadView('services');
		$template->set('title', 'Services');
		$template->set('result', $result);
		$template->render();
	}
	
}

?>