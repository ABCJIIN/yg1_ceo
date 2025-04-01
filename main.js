$(function () {
    let lastWindowWidth = $(window).width(); // 이전 화면 너비 저장
    let resizeTimer; // debounce 타이머 변수

    function scrollActiveTabIntoView() {
        $(".tab-list-wrap.mo .tab-list li.on").each(function () {
            let $tabList = $(this).closest(".tab-list");
            let tabLeft = $tabList.scrollLeft();
            let tabWidth = $tabList.outerWidth();
            let liLeft = $(this).position().left + tabLeft;
            let liWidth = $(this).outerWidth();

            let scrollTo = liLeft - tabWidth / 2 + liWidth / 2;
            $tabList.animate({ scrollLeft: scrollTo }, 300);
        });
    }

    function initializeSwiper() {
        if (window.pcSwiper) window.pcSwiper.destroy(true, true);
        if (window.moSwiper) window.moSwiper.destroy(true, true);

        window.pcSwiper = new Swiper(".ceoSwiper", {
            effect: "fade",
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            observer: true,
            observeParents: true,
            on: {
                slideChange: function () {
                    updateTabState(this.activeIndex, ".tab-list-wrap:not(.mo) .tab-list li");
                },
            },
        });

        window.moSwiper = new Swiper(".ceoSwiper02", {
            effect: "fade",
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            observer: true,
            observeParents: true,
            on: {
                slideChange: function () {
                    updateTabState(this.activeIndex, ".tab-list-wrap.mo .tab-list li");
                },
            },
        });
    }

    function updateTabState(activeIndex, tabSelector) {
        $(tabSelector).removeClass("on").each(function () {
            const slideIndex = parseInt($(this).data("slide"), 10);
            if (activeIndex >= slideIndex) {
                $(this).addClass("on").siblings().removeClass("on");
            }
        });

        if ($(tabSelector).closest(".tab-list-wrap").hasClass("mo")) {
            scrollActiveTabIntoView();
        }
    }

    function bindTabClick() {
        $(".tab-list-wrap .tab-list li").on("click", function () {
            const targetSlide = parseInt($(this).data("slide"), 10);

            if ($(this).closest(".tab-list-wrap").hasClass("mo")) {
                moSwiper.slideTo(targetSlide);
            } else {
                pcSwiper.slideTo(targetSlide);
            }
        });
    }

    $(document).ready(function () {
        initializeSwiper();
        bindTabClick();

        // ✅ `resize` 이벤트에 debounce 적용
        $(window).on("resize", function () {
            clearTimeout(resizeTimer); // 기존 타이머 제거
            resizeTimer = setTimeout(function () {
                let currentWidth = $(window).width();
                
                // ✅ 이전 너비와 비교하여 변경된 경우에만 Swiper 초기화
                if (currentWidth !== lastWindowWidth) {
                    lastWindowWidth = currentWidth; // 현재 너비 저장
                    initializeSwiper();
                    
                    if (window.pcSwiper) {
                        updateTabState(pcSwiper.activeIndex, ".tab-list-wrap:not(.mo) .tab-list li");
                    }
                    if (window.moSwiper) {
                        updateTabState(moSwiper.activeIndex, ".tab-list-wrap.mo .tab-list li");
                    }
                }
            }, 300); // 300ms 동안 추가 resize 이벤트가 없으면 실행
        });
    });
});
