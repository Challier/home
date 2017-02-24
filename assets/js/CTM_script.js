/*$(document).one('ready', function() {
  
  $( ".algorithm" ).trigger( "click" );
  $( ".data_sciences" ).trigger( "click" );
  $( ".general" ).trigger( "click" );
  $( ".music" ).trigger( "click" );

  $( ".algorithm" ).trigger( "click" );
  $( ".data_sciences" ).trigger( "click" );
  $( ".general" ).trigger( "click" );
  $( ".music" ).trigger( "click" );

  $("#fake").remove()

});*/

$(document).ready(function() {

/*$('.article').mouseenter(function() {
  $(this).children('.up').height(0);
  $(this).children('.down').height('90%');
});

$('.article').mouseleave(function() {
  $(this).children('.down').height('25%');
  $(this).children('.up').height('75%');
}); */

// external js: isotope.pkgd.js
// init Isotope
var $tiles = $('.tiles').isotope({});
// store filter for each group
var filters = ['.codingpro','.general','.data_sciences','.algorithm'];

/*$('.filter-button-group').one( 'click', 'div', function() {
  $('.tiles').fadeIn();
});*/

// change is-checked class on buttons
$('.filter-button-group').on( 'click', 'div', function() {
  $(this).toggleClass('on');
  var isChecked = $(this).hasClass('on');
  var filter = $(this).attr('data-filter');

if ($(this).hasClass('all')) {
    if (!$( ".algorithm" ).hasClass("on")) {
      $( ".algorithm" ).trigger( "click" );
    }
    else {
    }
    if (!$( ".data_sciences" ).hasClass("on")) 
      {$( ".data_sciences" ).trigger( "click" );
    }
    else {
    }
    if (!$( ".general" ).hasClass('on')) {
      $( ".general" ).trigger( "click" );
    }
    else {
    }
    if (!$( ".codingpro" ).hasClass('on')) {
      $( ".codingpro" ).trigger( "click" );
    }
    else {
    }
  }

if ($(this).hasClass('all_none')) {
  if ($( ".algorithm" ).hasClass('on')) {
    $( ".algorithm" ).trigger( "click" );
  }
  else {
  }
  if ($( ".data_sciences" ).hasClass('on')) {
    $( ".data_sciences" ).trigger( "click" );
  }
  else {
    }
  if ($( ".general" ).hasClass('on')) {
    $( ".general" ).trigger( "click" );
  }
  else {
    }
  if ($( ".codingpro" ).hasClass('on')) {
    $( ".codingpro" ).trigger( "click" );
  }
  else {
  }
}

  if ( isChecked ) {
    addFilter( filter );
  } else {
    removeFilter( filter );
  }
  // filter isotope
  // group filters together, inclusive
  $tiles.isotope({ filter: filters.join(',') });
});
  
function addFilter( filter ) {
  if ( filters.indexOf( filter ) == -1 ) {
    filters.push( filter );
  }
}

function removeFilter( filter ) {
  var index = filters.indexOf( filter);
  if ( index != -1 ) {
    filters.splice( index, 1 );
  }
}


});
