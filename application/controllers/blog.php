<?php

class Blog extends Controller {
	
	function index()
	{
		$template = $this->loadView('blog');
		$blog = $this->loadModel('blog_model');
		$result = $blog->getAll();
		
		$template->set('title', 'Blog');
		$template->set('result', $result);
		$template->render();
	}
	
	function article($title)
	{
		$blog = $this->loadModel('blog_model');
		$result = $blog->getOne($title);
		if($result == 0) {
			$template = $this->redirect('');
		} else {
			$template = $this->loadView('article');
			$template->set('result', $result);
			$template->render();
		}
	}
	
}

?>