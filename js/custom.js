/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal, once) {

  'use strict';

  Drupal.behaviors.archipelago_subtheme_rpi = {
    attach: function (context, settings) {
      const elementsToAttach = once('attach_iab', '#page-wrapper', context);
      elementsToAttach.forEach(function (index, value) {
          let root = document.querySelector('#navbar-main');
          var observer = new IntersectionObserver(function (entries) {
            const ratio = entries[0].intersectionRatio;
            if (ratio < 0.8) {
              let $element = document.querySelector('#navlogo');
              let $sidebar = document.querySelector('#DcmnyLeftNav');
              $element.classList.add('navbar-brand-logo-small');
              $sidebar.classList.add('navbar-full-border');
              if (entries[0].target.querySelector('.logo').classList.contains("animate__fadeIn")) {
                entries[0].target.querySelector('.logo').classList.add("animate__animated", "animate__fadeOut");
              }
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
            rootMargin: '-10px 0px',
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
        const bartoggler = once('attach_navbar_massonry','#DcmnyLeftNavToggler', document);
        bartoggler.forEach(function (element) {
          element.addEventListener('click', (e) => {
            setTimeout(() => {
                // Give the CSS transitions time to finish
                const masonry_element = $('div.cards-masonry');
                if (masonry_element) {
                  const masonry_object = masonry_element.data('masonry')
                  if (masonry_object && masonry_object.hasOwnProperty('layout')) {
                    masonry_object.layout()
                  }
                }
              }
              , 500);
          });
        });

        const toolbar = once('attach_toolbar_massonry','#toolbar-administration .toolbar-item', document);
        toolbar.forEach(function (element) {
        element.addEventListener('click', (e) => {
          setTimeout(() => {
              // Give the CSS transitions time to finish
            const masonry_element = $('div.cards-masonry');
              if (masonry_element) {
                const masonry_object = masonry_element.data('masonry')
                if (masonry_object && masonry_object.hasOwnProperty('layout')) {
                  masonry_object.layout()
                }
              }
            }
            , 500);
          });
        });

        $("#main-breadcrumbs").find('.views-display-link').remove();
        const elementsToAttachViewHeader = once('attach_viewheader', '.view-header .views-display-link', context);
        elementsToAttachViewHeader.forEach(function (view_link) {
          let main_breadcrump = document.querySelector("#main-breadcrumbs");
          if (main_breadcrump) {
            view_link.parentNode.removeChild(view_link);
            main_breadcrump.appendChild(view_link);
          }
        });
      }
    }
  }
})(jQuery, Drupal, once);
