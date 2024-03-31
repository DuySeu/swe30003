function openTab(evt, id) {
  $(".tm-tab-content").hide();
  $("#" + id).show();
  $(evt.currentTarget).addClass("active");
}

function initPage() {
  let pageId = location.hash;

  if (pageId) {
    highlightMenu($(`.tm-page-link[href^="${pageId}"]`));
    showPage($(pageId));
  } else {
    pageId = $(".tm-page-link.active").attr("href");
    showPage($(pageId));
  }
}

function highlightMenu(menuItem) {
  $(".tm-page-link").removeClass("active");
  menuItem.addClass("active");
}

function showPage(page) {
  $(".tm-page-content").hide();
  page.show();
}

$(document).ready(function () {
  /***************** Pages *****************/

  initPage();

  $(".tm-page-link").click(function (event) {
    if (window.innerWidth > 991) {
      event.preventDefault();
    }

    highlightMenu($(event.currentTarget));
    showPage($(event.currentTarget.hash));
  });
  searchMenu();
});
function searchMenu() {
  const searchInput = document.querySelector('.tm-menu-title[type="text"]');
  searchInput.addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const menuItems = document.querySelectorAll('.tm-list-item');
    menuItems.forEach(item => {
      const itemName = item.querySelector('.tm-list-item-name').textContent.toLowerCase();
      if (itemName.includes(searchText)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}
