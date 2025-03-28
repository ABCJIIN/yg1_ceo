$(function () {
  // 탭 초기화 함수
  function initializeTabs(tabMenuSelector) {
      $(tabMenuSelector).each(function () {
          const $tabMenu = $(this);
          const $tabList = $tabMenu.find(".tab-list > li");
          const $tabCont = $tabMenu.find(".tab-cont > div");

          $tabList.on("click", function () {
              const tabIndex = $tabList.index(this);

              $tabList.removeClass("on");
              $tabCont.removeClass("on");

              $(this).addClass("on");
              $tabCont.eq(tabIndex).addClass("on");

              setFlowBanner($tabCont.eq(tabIndex).find('.flow-banner'));
          });
      });
  }

  // 배너 초기화 및 화면 리사이즈 시 배너 처리
  function handleBannerOnResize() {
      setFlowBanner($('.tab-cont > div.on').find('.flow-banner'));
  }

  $(document).ready(function () {
      initializeTabs(".tab-menu");
      handleBannerOnResize(); // 초기 로드 시 배너 처리

      // 화면 리사이즈 이벤트 핸들러
      $(window).on('resize', handleBannerOnResize);
  });

  // Swiper 초기화 (각 Swiper 인스턴스를 개별적으로 생성)
  $('.ceoSwiper, .ceoSwiper02, .ceoSwiper03, .ceoSwiper04').each(function () {
      new Swiper(this, {
          // autoHeight : true,
          pagination: {
              el: $(this).find(".swiper-pagination")[0], // 해당 Swiper 내부의 pagination 찾기
              type: "fraction",
          },
          navigation: {
              nextEl: $(this).find(".swiper-button-next")[0],
              prevEl: $(this).find(".swiper-button-prev")[0],
          },
          observer: true,
          observeParents: true,
      });
  });
});
