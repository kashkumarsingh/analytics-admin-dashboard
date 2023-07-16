import "jquery-slimscroll";

jQuery(function () {
  "use strict";
  // Sidebar
  var page_sidebar_init = function () {
    // Slimscroll
    $(".page-sidebar__navigation")
      .slimScroll({
        height: "100%",
      })
      .mouseenter();
  };
  page_sidebar_init();
  $("#notificationsBox").slimscroll({
    height: "260px",
    size: "2px",
    position: "right",
    color: "#A5A7AB",
    alwaysVisible: false,
    distance: "0px",
    railVisible: false,
    wheelStep: 15,
  });

  const navItems = $(".page-sidebar__navigation .page-sidebar_accordion-item");

  navItems.on("click", function () {
    // Remove 'active' class from all nav items
    navItems.removeClass("active");

    // Add 'active' class to the clicked nav item
    $(this).addClass("active");
  });
});
