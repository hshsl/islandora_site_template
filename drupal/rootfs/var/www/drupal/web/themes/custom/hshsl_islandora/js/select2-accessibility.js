
(function ($, Drupal) {
  Drupal.behaviors.select2Accessibility = {
    attach: function (context) {

      // Watch for Select2 search inputs as they are created.
      if (context !== document) {
        return;
      }

      var observer = new MutationObserver(function (mutations) {
        $('.select2-search__field').each(function () {
          var $search = $(this);

          if (!$search.attr('aria-label')) {
            var placeholder = $search.attr('placeholder');

            if (placeholder) {
              $search.attr('aria-label', placeholder);
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

    }
  };
})(jQuery, Drupal);
