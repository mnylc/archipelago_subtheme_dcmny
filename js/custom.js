/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.archipelago_subtheme_rpi = {
    attach: function (context, settings) {
      $('#page-wrapper').once('attache_observer')
        .each(function (index, value) {
            var observer = new IntersectionObserver(function (entries) {
              if (!entries[0].isIntersecting) {
                console.log('Pumpkin in the field');
                let $element = document.querySelector('#navlogo');
                let $sidebar = document.querySelector('#DcmnyLeftNav');
                $element.classList.add('navbar-brand-logo-small');
                $sidebar.classList.add('navbar-full-border');
              } else {
                console.log('Pumpkin out of the field');
                let $sidebar = document.querySelector('#DcmnyLeftNav');
                let $element = document.querySelector('#navlogo');
                $element.classList.remove('navbar-brand-logo-small');
                $sidebar.classList.remove('navbar-full-border');
              }
            },{
              root: null,
              //rootMargin: '-50px 0px',
              threshold: 1
            });
            let $observedElement = document.querySelector("#DcmnyWelcome");
            if ($observedElement) {
              observer.observe($observedElement)
            }
          }
        );


      if ($(context).is('.view') || context == document) {
        /* Masonry Initialize so Ajax views can catch up */
        // init Masonry
        var $grid = $('.view-display-id-grid > div.view-content > div.container-fluid > div.cards-masonry').masonry({
          //percentPosition: true,
          itemSelector: '.card-masonry-wrapper',
        });
        // layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {
          $grid.masonry('layout');
        });

        document.addEventListener('click', function (event) {
          // If the clicked element doesn't have the right selector, bail
          if (!event.target.matches('#DcmnyLeftNavToggler')) return;
          setTimeout(()=> {
              // Give the CSS transitions time to finish
              $grid.masonry('layout');
            }
            ,1000);
        }, false);


        $("#main-breadcrumbs").find('.views-display-link').remove();
        $(context).once('view-header-dcmny').find('.view-header .views-display-link').each(function () {
          $(this).detach().appendTo("#main-breadcrumbs");
        });
      }
    }
  }
})(jQuery, Drupal);