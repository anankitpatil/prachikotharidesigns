<?php

class Portfolio extends Controller {
	
	function index()
	{
		$template = $this->loadView('portfolio');
		$portfolio = $this->loadModel('portfolio_model');
		$result = $portfolio->getAll();
		
		$template->set('title', 'Portfolio');
		$template->set('result', $result);
		$template->render();
	}
	
	function article($title)
	{
		$blog = $this->loadModel('portfolio_model');
		$result = $blog->getOne($title);
		if($result == 0) {
			$template = $this->redirect('');
		} else {
			$template = $this->loadView('project');
			$template->set('result', $result);
			$template->render();
		}
	}
	
}

?>