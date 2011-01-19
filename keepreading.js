/**
 * Keep Reading Plugin
 * A small jQuery plugin which informs users of content available upon scrolling
 *
 * @author Joshua Kennedy
 * @website https://github.com/jkennedy1980/Keep-Reading
 * @version 0.0.1
 *
 *
 * Copyright (c) 2011 Joshua Kennedy, http://deadmeta4.com
 * Licensed under the MIT license
 */
( function( $ ){

	  $.fn.keepReading = function( options ){

		var $tag,
			tagWidth,
	  		settings = {
				'id'			: 'keepReadingTag',
				'tagText'		: '&#9662; More',
				'padding'		: 4,  // px
				'appearDelay' 		: 20, // ms
				'displayThreshold'	: 20  // %
		};
		
	    if( options ) $.extend( settings, options );

	    return this.each( function(){
			setTimeout( showTag, settings.appearDelay );
	    });

	    function showTag(){
			var docH = $(document).height(),
				winH = $(window).height(),
				scrTop = $(document).scrollTop(),
	    		hidH = docH - scrTop - $(window).height();

			if( ( ( hidH / docH ) * 100 ) > settings.displayThreshold ) insertTag();
	    	
	    	function insertTag( callback ){
	    		$tag = $( "<div id='" + settings.id + "'><a>" + settings.tagText + "</a></div>" );
				$('body').append( $tag );
				tagWidth = $tag.width() + ( settings.padding * 2 );
				$tag.css( { right : -tagWidth, padding : settings.padding } );
				$(window).scroll( handleScroll );
				$tag.find('a').click( function(){
					$('html, body').animate( { scrollTop : scrTop + winH }, removeTag );
				});
				$tag.animate( { right: 0 } );
	    	}

	    	function handleScroll(){
				if( $(document).scrollTop() <= 0 ) return; // user has not scrolled
				removeTag();
	    	}
	    	
		function removeTag(){
			if( !$tag ) return;
			$tag.animate( { right: -tagWidth }, function(){
				$(window).unbind( 'scroll', handleScroll );
				$tag.remove();
			});
		}

	    }

	  };
	  
})( jQuery );

