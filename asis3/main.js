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

            });
        });
    }

    $(document).ready(function () {
        initializeTabs(".tab-menu");
    });

    // Swiper 초기화 (각 Swiper 인스턴스를 개별적으로 생성)
    $('.ceoSwiper, .ceoSwiper02, .ceoSwiper03, .ceoSwiper04, .ceoSwiper05, .ceoSwiper06, .ceoSwiper07, .ceoSwiper08').each(function () {
        new Swiper(this, {
            effect: "fade",
            navigation: {
                nextEl: $(this).find(".swiper-button-next")[0],
                prevEl: $(this).find(".swiper-button-prev")[0],
            },
            observer: true,
            observeParents: true,
        });
    });
    // swiper.update();
});
