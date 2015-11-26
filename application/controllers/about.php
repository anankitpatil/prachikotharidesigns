<?php

class About extends Controller {
	
	function index()
	{
		$template = $this->loadView('about');
		$template->set('title', 'About');
		$template->set('active_a', 'active');
		$template->render();
	}
	
}

?>