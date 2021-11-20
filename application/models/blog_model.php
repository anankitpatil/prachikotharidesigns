<?php

class Blog_model extends Model {
	
	public function getAll()
	{
		$result = $this->query('SELECT * FROM blog');
		return $result;
	}
	
	public function getOne($title)
	{
		$title = $this->escapeString($title);
		$result_ = $this->query('SELECT id, title FROM blog');
		foreach ($result_ as $row) {
			$content_ = strtolower(str_replace(" ", "-", $row->title));
			if($content_ == $title) $id = $row->id;
		}
		if(isset($id)) $result = $this->query('SELECT * FROM blog WHERE id="' . $id . '"');
		else $result = 0;
		
		return $result;
	}

}

?>
