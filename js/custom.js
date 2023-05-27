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
            let root = document.querySelector('#navbar-main');
            var observer = new IntersectionObserver(function (entries) {
              const ratio = entries[0].intersectionRatio;
              console.log(ratio);
              console.log(entries[0].isIntersecting);
              if (ratio < 0.9) {
                let $element = document.querySelector('#navlogo');
                let $sidebar = document.querySelector('#DcmnyLeftNav');
                $element.classList.add('navbar-brand-logo-small');
                $sidebar.classList.add('navbar-full-border');
                entries[0].target.querySelector('.logo').classList.add("animate__animated", "animate__fadeOut");
              } else {
                let $sidebar = document.querySelector('#DcmnyLeftNav');
                let $element = document.querySelector('#navlogo');
                $element.classList.remove('navbar-brand-logo-small');
                $sidebar.classList.remove('navbar-full-border');
                entries[0].target.querySelector('.logo').classList.remove("animate__fadeOut");
                entries[0].target.querySelector('.logo').classList.add("animate__animated", "animate__fadeIn");
              }
            },{
              root: null,
              rootMargin: '-20px 0px',
              threshold: [...Array(10).keys()].map(x => x / 10)
            });
            let $observedElement = document.querySelector("#DcmnyWelcome > .logo-container");
            if ($observedElement) {
              observer.observe($observedElement)
            }
          }
        );


      if ($(context).is('.view') || context == document) {
        /* Masonry Initialize so Ajax views can catch up */
        // init Masonry
        var $grid = $('div.cards-masonry').masonry({
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
