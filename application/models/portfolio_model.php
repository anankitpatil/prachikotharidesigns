<?php

class Portfolio_model extends Model {
	
	public function getAll()
	{
		$result = $this->query('SELECT * FROM portfolio ORDER BY date DESC');
		return $result;
	}
	
	public function getOne($title)
	{
		$title = $this->escapeString($title);
		$result_ = $this->query('SELECT id, title FROM portfolio');
		foreach ($result_ as $row) {
			$content_ = strtolower(str_replace(" ", "-", $row->title));
			if($content_ == $title) $id = $row->id;
		}
		if(isset($id)) $result = $this->query('SELECT * FROM portfolio WHERE id="' . $id . '"');
		else $result = 0;
		
		return $result;
	}

}

?>
