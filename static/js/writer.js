/*  Writer 1.0 */

// New article
(function($){

	// Main writer

	$.fn.writer = function() {
		$(this).click(function(e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 300).css('overflow', 'hidden');
			$('body').prepend('<div class="writer-overlay container-fluid"></div>');
			$('.writer-overlay').append('<i class="fa fa-close"></i>').find('.fa-close').pack();
			$('.writer-overlay').append('<div class="save"></div>');
			$('.writer-overlay').append('<div class="row"><div class="container"></div></div>');
			$('.writer-overlay .container').append(
				'<div class="form-group"><input placeholder="Title" type="text" class="title form-control" id="title" name="title" /></div>' +
				'<div class="form-group image-group"><form><label for="featured"><i class="fa fa-image"></i></label><input type="file" class="featured" id="featured" name="featured" /></form></div>' +
				'<div class="form-group content-group"><p class="content" contenteditable="true"></p></div>' +
				'<div class="form-group image-icons"><i class="fa fa-toggle-left"></i><i class="fa fa-image"></i><i class="fa fa-toggle-right"></i></div>'
			);
			$('.writer-overlay .content').para();
			$('.writer-overlay .image-group form').change(function() {
				var file = $(this).find('input').get(0).files[0];
				var formData = new FormData();
				formData.append('image', file);
				$.ajax({
					data: formData,
					url: 'upload.php',
					type: 'POST',
					cache: false,
				  	contentType: false,
				   	processData: false,
					beforeSend: function() {
						if($('.writer-overlay .image-group .fa-edit').length) {
							$('.writer-overlay .image-group .fa-edit').attr('class', 'fa fa-circle-o-notch fa-spin');
							$('.writer-overlay .image-group label figure').remove();
						} else {
							$('.writer-overlay .image-group .fa-image').attr('class', 'fa fa-circle-o-notch fa-spin');
						}
					},
					success: function(data) {
						$('.writer-overlay .image-group label').append('<figure><img src="../img.php?src=uploads/' + data + '&width=1138&crop-to-fit" /></figure>');
						$('.writer-overlay .image-group label .fa-circle-o-notch').attr('class', 'fa fa-edit');
					},
					error: function(){
					  	alert('An error occured. Please refresh the page and try again.');
					}
				});
			});
			$('.writer-overlay .image-icons i').imag();
			var saver = setInterval(function(){
				if($('.writer-overlay .image-group figure').length && $('.writer-overlay .title').val()) {
					if($('.writer-overlay').attr('id')) var id = '&id=' + $('.writer-overlay').attr('id');
					else id = '';
					$.ajax({
						data: 'title=' + $('.writer-overlay .title').val() + '&content=' + $('.writer-overlay .content-group').html().replace(/&nbsp;/g, ' ').replace(/&amp;/g, '[[]]') + '&featured=' + $('.writer-overlay .image-group figure img').attr('src').substr($('.writer-overlay .image-group label figure img').attr('src').lastIndexOf("/")+1) + id,
						url: 'save.php',
						type: 'POST',
						beforeSend: function() {
							$('.writer-overlay .save').html('Saving...').fadeIn();
						},
						success: function(data) {
							if(data === 'Saved.') { $('.writer-overlay .save').html(data).delay(1000).fadeOut(); }
							else {
								$('.writer-overlay').attr('id', data);
								id = 'id=' + data;
							}
						}
					});
				}
			}, 3000);
			$('.writer-overlay').animate({'opacity': 1}, 300);
		});
	};

	// Editor

	$.fn.editor = function() {
		$(this).click(function(e) {
			e.preventDefault();
			var id = $(this).attr('id');
			$('html, body').animate({ scrollTop: 0 }, 300).css('overflow', 'hidden');
			$('body').prepend('<div class="writer-overlay container-fluid" id="' + id + '"></div>');
			$('.writer-overlay').append('<i class="fa fa-close"></i>').find('.fa-close').pack();
			$('.writer-overlay').append('<div class="save"></div>');
			$('.writer-overlay').append('<div class="row"><div class="container"></div></div>');
			$('.writer-overlay .container').append(
				'<div class="form-group"><input placeholder="Title" type="text" class="title form-control" id="title" name="title" /></div>' +
				'<div class="form-group image-group"><form><label for="featured"><i class="fa fa-edit"></i></label><input type="file" class="featured" id="featured" name="featured" /></form></div>' +
				'<div class="form-group content-group"></div>' +
				'<div class="form-group image-icons"><i class="fa fa-toggle-left"></i><i class="fa fa-image"></i><i class="fa fa-toggle-right"></i></div>'
			);
			$.get('get_blog.php?id='+id, function(response) {
				var article = jQuery.parseJSON(response);
				$('.writer-overlay .container .title').val(article.title);
				$('.writer-overlay .container .image-group label').append('<figure><img src="../img.php?src=uploads/' + article.featured + '&width=1138&crop-to-fit" /></figure>');
				$('.writer-overlay .container .content-group').append(article.content).find('.content').para();
				$('.writer-overlay .content-group figure').imgedit();
			});
			$('.writer-overlay .image-group form').change(function() {
				var file = $(this).find('input').get(0).files[0];
				var formData = new FormData();
				formData.append('image', file);
				$.ajax({
					data: formData,
					url: 'upload.php',
					type: 'POST',
					cache: false,
				  	contentType: false,
				   	processData: false,
					beforeSend: function() {
						if($('.writer-overlay .image-group .fa-edit').length) {
							$('.writer-overlay .image-group .fa-edit').attr('class', 'fa fa-circle-o-notch fa-spin');
							$('.writer-overlay .image-group label figure').remove();
						} else {
							$('.writer-overlay .image-group .fa-image').attr('class', 'fa fa-circle-o-notch fa-spin');
						}
					},
					success: function(data) {
						$('.writer-overlay .image-group label').append('<figure><img src="../img.php?src=uploads/' + data + '&width=1138&crop-to-fit" /></figure>');
						$('.writer-overlay .image-group label .fa-circle-o-notch').attr('class', 'fa fa-edit');
					},
					error: function(){
					  	alert('An error occured. Please refresh the page and try again.');
					}
				});
			});
			$('.writer-overlay .image-icons i').imag();
			var saver = setInterval(function(){
				if($('.writer-overlay .image-group figure').length && $('.writer-overlay .title').val()) {
					var _id = '&id=' + $('.writer-overlay').attr('id');
					$.ajax({
						data: 'title=' + $('.writer-overlay .title').val() + '&content=' + $('.writer-overlay .content-group').html().replace(/&nbsp;/g, ' ').replace(/&amp;/g, '[[]]') + '&featured=' + $('.writer-overlay .image-group figure img').attr('src').substr($('.writer-overlay .image-group label figure img').attr('src').lastIndexOf("/")+1) + _id,
						url: 'save.php',
						type: 'POST',
						beforeSend: function() {
							$('.writer-overlay .save').html('Saving...').fadeIn();
						},
						success: function(data) {
							if(data === 'Saved.') { $('.writer-overlay .save').html(data).delay(1000).fadeOut(); }
							else {
								$('.writer-overlay').attr('id', data);
								id = 'id=' + data;
							}
						}
					});
				}
			}, 3000);
			$('.writer-overlay').animate({'opacity': 1}, 300);
		});
	};

	// Image icons at bottom

	$.fn.imag = function() {
		$(this).click(function() {
			switch(this.className) {
				case 'fa fa-toggle-left':
					$('<input type="file" />').trigger('click').change(function() {
						var file = $(this).get(0).files[0];
						var formData = new FormData();
						formData.append('image', file);
						$.ajax({
							data: formData,
							url: 'upload.php',
							type: 'POST',
							cache: false,
							contentType: false,
							processData: false,
							beforeSend: function() {
								$('.writer-overlay .image-icons').css('opacity', 0).before('<div class="form-group text-center loading"><i class=fa fa-circle-o-notch fa-spin"></i></div>');
							},
							success: function(data) {
								$('.writer-overlay .loading').remove();
								$('.writer-overlay .image-icons').css('opacity', 1);
								if($('.writer-overlay .content-group .content:last').text().length === 0) $('.writer-overlay .content-group .content:last').before('<div class="col-lg-12 nopadding"><div class="col-lg-6 nopadding"><figure><i class="fa fa-remove"></i><i class="fa fa-edit"></i><img src="../img.php?src=uploads/' + data + '&width=554&crop-to-fit" /></figure></div><div class="col-lg-6 nopadding"><p class="content para" contenteditable="true"></p></div></div>').siblings('.col-lg-12').find('.para').attr('class', 'content').para();
								else $('.writer-overlay .content-group').append('<div class="col-lg-12 nopadding"><div class="col-lg-6 nopadding"><figure><i class="fa fa-remove"></i><i class="fa fa-edit"></i><img src="../img.php?src=uploads/' + data + '&width=554&crop-to-fit" /></figure></div><div class="col-lg-6 nopadding"><p class="content para" contenteditable="true"></p></div></div>').find('.para').attr('class', 'content').para();
								$('.writer-overlay .content-group figure').imgedit();
							},
							error: function(){
								alert('An error occured. Please refresh the page and try again.');
							}
						});
					});
					break;
				case 'fa fa-image':
					$('<input type="file" />').trigger('click').change(function() {
						var file = $(this).get(0).files[0];
						var formData = new FormData();
						formData.append('image', file);
						$.ajax({
							data: formData,
							url: 'upload.php',
							type: 'POST',
							cache: false,
							contentType: false,
							processData: false,
							beforeSend: function() {
								$('.writer-overlay .image-icons').css('opacity', 0).before('<div class="form-group text-center loading"><i class=fa fa-circle-o-notch fa-spin"></i></div>');
							},
							success: function(data) {
								$('.writer-overlay .loading').remove();
								$('.writer-overlay .image-icons').css('opacity', 1);
								if($('.writer-overlay .content-group .content:last').text().length === 0) $('.writer-overlay .content-group .content:last').before('<figure><i class="fa fa-remove"></i><i class="fa fa-edit"></i><img src="../img.php?src=uploads/' + data + '&width=1138&crop-to-fit" /></figure>');
								else $('.writer-overlay .content-group').append('<figure><img src="../img.php?src=uploads/' + data + '&width=1138&crop-to-fit" /><i class="fa fa-remove"></i><i class="fa fa-edit"></i></figure><p class="content para" contenteditable="true"></p>').find('.para').attr('class', 'content').para();
								$('.writer-overlay .content-group figure').imgedit();
							},
							error: function(){
								alert('An error occured. Please refresh the page and try again.');
							}
						});
					});
					break;
				case 'fa fa-toggle-right':
					$('<input type="file" />').trigger('click').change(function() {
						var file = $(this).get(0).files[0];
						var formData = new FormData();
						formData.append('image', file);
						$.ajax({
							data: formData,
							url: 'upload.php',
							type: 'POST',
							cache: false,
							contentType: false,
							processData: false,
							beforeSend: function() {
								$('.writer-overlay .image-icons').css('opacity', 0).before('<div class="form-group text-center loading"><i class=fa fa-circle-o-notch fa-spin"></i></div>');
							},
							success: function(data) {
								$('.writer-overlay .loading').remove();
								$('.writer-overlay .image-icons').css('opacity', 1);
								if($('.writer-overlay .content-group .content:last').text().length === 0) $('.writer-overlay .content-group .content:last').before('<div class="col-lg-12 nopadding"><div class="col-lg-6 nopadding"><p class="content para" contenteditable="true"></p></div><div class="col-lg-6 nopadding"><figure><i class="fa fa-remove"></i><i class="fa fa-edit"></i><img src="../img.php?src=uploads/' + data + '&width=554&crop-to-fit" /></figure></div></div>').siblings('.col-lg-12').find('.para').attr('class', 'content').para();
								else $('.writer-overlay .content-group').append('<div class="col-lg-12 nopadding"><div class="col-lg-6 nopadding"><p class="content para" contenteditable="true"></p></div><div class="col-lg-6 nopadding"><figure><i class="fa fa-remove"></i><i class="fa fa-edit"></i><img src="../img.php?src=uploads/' + data + '&width=554&crop-to-fit" /></figure></div></div>').find('.para').attr('class', 'content').para();
								$('.writer-overlay .content-group figure').imgedit();
							},
							error: function(){
								alert('An error occured. Please refresh the page and try again.');
							}
						});
					});
					break;
			};
		});
	};

	// Paragraph functions

	$.fn.para = function() {
		$(this).on('input', function() {
			var tx = $(this).text();
			$(this).html(tx);
		});
		$(this).keydown(function(e) {
			if (e.keyCode === 13) {
				if($(this).parents('.col-lg-6').length) {
					$(this).parents('.col-lg-6').parents('.col-lg-12').after('<p contenteditable="true" class="content para"></p>');
					$(this).parents('.col-lg-6').parents('.col-lg-12').siblings('.para').get(0).focus();
					$(this).parents('.col-lg-6').parents('.col-lg-12').siblings('.para').attr('class', 'content').para();
				} else {
					$(this).after('<p contenteditable="true" class="content para"></p>');
					$(this).siblings('.para').get(0).focus();
					$(this).siblings('.para').attr('class', 'content').para();
				}
				return false;
			}
			if(e.keyCode == 8 || e.keyCode == 46 ) {
				if($(this).text().length === 0 && $(this).siblings('.content').length != 0) {
					$(this).siblings('.content:last').get(0).focus();
					$(this).remove();
				}
			}
		});
	};

	// Image overlay buttons and functions

	$.fn.imgedit = function() {
		$(this).find('.fa-remove').click(function(e) {
			var image = $(this).siblings('img').attr('src');
			e.preventDefault();
			if($(this).parents('.col-lg-12').length) {
				var content = $(this).parents('.col-lg-12').find('.content').text();
				$(this).parents('.col-lg-12').replaceWith('<p contenteditable="true" class="content para">' + content + '</p>');
				$('.content-group .para').attr('class', 'content').para();
			} else {
				$(this).parent('figure').remove();
			}
			$.ajax({
				data: 'image=' + image.substr(image.lastIndexOf("/")+1),
				url: 'delete.php',
				type: 'POST'
			});
		});
		$(this).find('.fa-edit').click(function(e) {
			var image = $(this).siblings('img').attr('src');
			var hook = this;
			e.preventDefault();
			$('<input type="file" />').trigger('click').change(function() {
				var file = $(this).get(0).files[0];
				var formData = new FormData();
				formData.append('image', file);
				$.ajax({
					data: formData,
					url: 'upload.php',
					type: 'POST',
					cache: false,
					contentType: false,
					processData: false,
					success: function(data) {
						$(hook).siblings('img').attr('src', '../img.php?src=uploads/' + data + '&width=554&crop-to-fit');
					},
					error: function(){
						alert('An error occured. Please refresh the page and try again.');
					}
				});
			});
			$.ajax({
				data: 'image=' + image.substr(image.lastIndexOf("/")+1),
				url: 'delete.php',
				type: 'POST'
			});
		});
	};

	// Delete entry

	$.fn.deleter = function() {
		$(this).click(function(e) {
			e.preventDefault();
			var media = $(this).parents('.media');
			$.ajax({
				data: 'id=' + $(this).attr('id'),
				url: 'delete_blog.php',
				type: 'POST',
				success: function() {
					$(media).fadeOut(300);
					$(media).delay(1000).remove();
				}
			});
		});
	};

	// Close overlay

	$.fn.pack = function() {
		$(this).click(function(e) {
			e.preventDefault();
			$('body').animate({'opacity': 0}, 300, function() { location.reload(); });
		});
	};

	// Portfolio add

	$.fn.portfolioAdd = function() {
		$(this).click(function(e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 300).css('overflow', 'hidden');
			$('body').prepend('<div class="writer-overlay container-fluid"></div>');
			$('.writer-overlay').append('<i class="fa fa-close"></i>').find('.fa-close').pack();
			$('.writer-overlay').append('<div class="save"></div>');
			$('.writer-overlay').append('<div class="row"><div class="container"></div></div>');
			$('.writer-overlay .container').append(
				'<div class="form-group"><input placeholder="Title" type="text" class="title form-control" id="title" name="title" /></div>' +
				'<div class="form-group"><input placeholder="Location" type="text" class="location form-control" id="location" name="location" /></div>' +
				'<div class="form-group"><div class="row"><div class="col-lg-6"><select class="form-control tag"><option value="Work">Work</option><option value="Home">Home</option><option value="Play">Play</option></select></div><div class="col-lg-6"><select class="form-control service"><option value="Interior Design">Interior Design</option><option value="Interior Styling">Interior Styling</option><option value="3 Day Consultation">3 Day Consultation</option></select></div></div></div>' +
				'<div class="form-group"><textarea placeholder="Summary about the project..." type="text" class="summary form-control" id="summary" name="summary" /></div>' +
				'<div class="form-group image-group text-center"><i class="fa fa-image"></i></div>'
			).find('textarea').autosize();
			$('.writer-overlay .image-group').portfolioImage();
			var id = '';
			var saver = setInterval(function(){
				if($('.writer-overlay .image-group figure').length && $('.writer-overlay .title').val()) {
					var images = '';
					$('.writer-overlay .image-group').each(function(i, element) {
						if($(element).find('figure img').length) {
							images = images + $(element).find('figure').html().replace("'", '(())').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '[[]]').replace('../img.php?src=', '').replace('[[]]width=1138[[]]crop-to-fit', '');
						}
					});

					$.ajax({
						data: 'title=' + $('.writer-overlay .title').val().replace("'", '(())') + '&location=' + $('.writer-overlay .location').val() + '&content=' + $('.writer-overlay .summary').val().replace('&', 'and') + '&images=' + images + '&tag=' + $('.writer-overlay .tag').val() + '&service=' + $('.writer-overlay .service').val() + id,
						url: 'portfolio_save.php',
						type: 'POST',
						beforeSend: function() {
							$('.writer-overlay .save').html('Saving...').fadeIn();
						},
						success: function(data) {
							if(data === 'Saved.') { $('.writer-overlay .save').html(data).delay(1000).fadeOut(); }
							else {
								id = '&id=' + data;
							}
						}
					});
				}
			}, 3000);
			$('.writer-overlay').animate({'opacity': 1}, 300);
		});
	};

	// Portfolio Edit

	$.fn.portfolioEdit = function() {
		$(this).click(function(e) {
			e.preventDefault();
			var id = $(this).attr('id');
			$('html, body').animate({ scrollTop: 0 }, 300).css('overflow', 'hidden');
			$('body').prepend('<div class="writer-overlay container-fluid" id="' + id + '"></div>');
			$('.writer-overlay').append('<i class="fa fa-close"></i>').find('.fa-close').pack();
			$('.writer-overlay').append('<div class="save"></div>');
			$('.writer-overlay').append('<div class="row"><div class="container"></div></div>');
			$('.writer-overlay .container').append(
				'<div class="form-group"><input placeholder="Title" type="text" class="title form-control" id="title" name="title" /></div>' +
				'<div class="form-group"><input placeholder="Location" type="text" class="location form-control" id="location" name="location" /></div>' +
				'<div class="form-group"><div class="row"><div class="col-lg-6"><select class="form-control tag"><option value="Work">Work</option><option value="Home">Home</option><option value="Play">Play</option></select></div><div class="col-lg-6"><select class="form-control service"><option value="Interior Design">Interior Design</option><option value="Interior Styling">Interior Styling</option><option value="3 Day Consultation">3 Day Consultation</option></select></div></div></div>' +
				'<div class="form-group"><textarea placeholder="Summary about the project..." type="text" class="summary form-control" id="summary" name="summary" /></div>'
			);
			$.get('get_portfolio.php?id='+id, function(response) {
				var article = jQuery.parseJSON(response);
				$('.writer-overlay .container .title').val(article.title);
				$('.writer-overlay .container .location').val(article.location);
				$('.writer-overlay .tag').val(article.tag);
				$('.writer-overlay .service').val(article.service)
				$('.writer-overlay .container .summary').val(article.content).autosize();
				var $images = $('<div></div>').html(article.images);
				$images.find('img').each(function(i, element) {
					if(i === 0) var fa = '<i class="fa fa-edit"></i>';
					else fa = '<i class="fa fa-edit"></i><i class="fa fa-remove"></i>';
					$('.writer-overlay .container').append('<div class="form-group image-group portfolio">' + fa + '<figure><img src="../img.php?src=' + $(element).attr('src') + '&width=1138&crop-to-fit" /></figure></div>').find('.image-group').portfolioImage();
				});
				$('.writer-overlay .container').append('<div class="form-group image-group portfolio"><i class="fa fa-image"></i><i class="fa fa-remove"></i></figure></div>').find('.image-group').portfolioImage();
				$('.writer-overlay .image-group.portfolio').find('.fa-remove').click(function() { $(this).parents('.image-group').remove(); });
			});
			var saver = setInterval(function(){
				if($('.writer-overlay .image-group figure').length && $('.writer-overlay .title').val()) {
					var images = '';
					$('.writer-overlay .image-group').each(function(i, element) {
						if($(element).find('figure img').length) {
							images = images + $(element).find('figure').html().replace(/&nbsp;/g, ' ').replace(/&amp;/g, '[[]]').replace('../img.php?src=', '').replace('[[]]width=1138[[]]crop-to-fit', '');
						}
					});
					var id = '&id=' + $('.writer-overlay').attr('id');

					$.ajax({
						data: 'title=' + $('.writer-overlay .title').val().replace("'", '(())') + '&location=' + $('.writer-overlay .location').val() + '&content=' + $('.writer-overlay .summary').val().replace('&', 'and') + '&images=' + images + '&tag=' + $('.writer-overlay .tag').val() + '&service=' + $('.writer-overlay .service').val() + id,
						url: 'portfolio_save.php',
						type: 'POST',
						beforeSend: function() {
							$('.writer-overlay .save').html('Saving...').fadeIn();
						},
						success: function(data) {
							if(data === 'Saved.') { $('.writer-overlay .save').html(data).delay(1000).fadeOut(); }
							else {
								$('.writer-overlay').attr('id', data);
								id = 'id=' + data;
							}
						}
					});
				}
			}, 3000);
			$('.writer-overlay').animate({'opacity': 1}, 300);
		});
	};

	$.fn.portfolioImage = function() {
		$(this).click(function(e) {
			if($(e.target).is('img')) return;
			$('<input type="file" />').trigger('click').change(function() {
				var file = $(this).get(0).files[0];
				var formData = new FormData();
				formData.append('image', file);
				$.ajax({
					context: e.target,
					data: formData,
					url: 'upload.php',
					type: 'POST',
					cache: false,
					contentType: false,
					processData: false,
					beforeSend: function() {
						if($(this).hasClass('image-group')) var holder = this; else var holder = $(this).parents('.image-group');
						if($(holder).find('.fa-edit').length) {
							$(holder).find('.fa-edit').attr('class', 'fa fa-circle-o-notch fa-spin');
							$(holder).find('figure').remove();
						} else {
							$(holder).find('.fa-image').attr('class', 'fa fa-circle-o-notch fa-spin');
						}
					},
					success: function(data) {
						if($(this).hasClass('image-group')) var holder = this; else var holder = $(this).parents('.image-group');
						$(holder).append('<figure><img src="../img.php?src=uploads/' + data + '&width=1138&crop-to-fit" /></figure>');
						$(holder).find('.fa-circle-o-notch').attr('class', 'fa fa-edit');
						$('.writer-overlay .container').append('<div class="form-group image-group portfolio"><i class="fa fa-image"></i><i class="fa fa-remove"></i></div>').find('.portfolio').portfolioImage();
						$('.writer-overlay .image-group.portfolio').find('.fa-remove').click(function() { $(this).parents('.image-group').remove(); });
					},
					error: function(){
						alert('An error occured. Please refresh the page and try again.');
					}
				});
			});
		});
	};

	// Delete entry

	$.fn.portfolioDel = function() {
		$(this).click(function(e) {
			e.preventDefault();
			var media = $(this).parents('.item');
			$.ajax({
				data: 'id=' + $(this).attr('id'),
				url: 'delete_portfolio.php',
				type: 'POST',
				success: function() {
					$(media).fadeOut(300);
					$(media).delay(1000).remove();
				}
			});
		});
	};

})(jQuery);

/*!
	Autosize 1.18.17
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e){var t,o={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',a=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],n=e(i).data("autosize",!0)[0];n.style.lineHeight="99px","99px"===e(n).css("lineHeight")&&a.push("lineHeight"),n.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),n.parentNode!==document.body&&e(document.body).append(n),this.each(function(){function o(){var t,o=window.getComputedStyle?window.getComputedStyle(u,null):null;o?(t=parseFloat(o.width),("border-box"===o.boxSizing||"border-box"===o.webkitBoxSizing||"border-box"===o.mozBoxSizing)&&e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){t-=parseFloat(o[i])})):t=p.width(),n.style.width=Math.max(t,0)+"px"}function s(){var s={};if(t=u,n.className=i.className,n.id=i.id,d=parseFloat(p.css("maxHeight")),e.each(a,function(e,t){s[t]=p.css(t)}),e(n).css(s).attr("wrap",p.attr("wrap")),o(),window.chrome){var r=u.style.width;u.style.width="0px";{u.offsetWidth}u.style.width=r}}function r(){var e,a;t!==u?s():o(),n.value=!u.value&&i.placeholder?p.attr("placeholder")||"":u.value,n.value+=i.append||"",n.style.overflowY=u.style.overflowY,a=parseFloat(u.style.height)||0,n.scrollTop=0,n.scrollTop=9e4,e=n.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=z,Math.abs(a-e)>.01&&(u.style.height=e+"px",n.className=n.className,w&&i.callback.call(u,u),p.trigger("autosize.resized"))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==b&&(b=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),z=0,w=e.isFunction(i.callback),f={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},b=p.width(),g=p.css("resize");p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(z=p.outerHeight()-p.height()),c=Math.max(parseFloat(p.css("minHeight"))-z||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===g?p.css("resize","none"):"both"===g&&p.css("resize","horizontal"),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(f).removeData("autosize")}),r())})):this}}(jQuery||$);
