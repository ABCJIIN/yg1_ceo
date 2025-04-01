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
            loop: true,
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            observer: true,
            observeParents: true,
            on: {
                slideChange: function () {
                    updateTabState(this, ".tab-list-wrap:not(.mo) .tab-list li");
                },
            },
        });
    
        window.moSwiper = new Swiper(".ceoSwiper02", {
            effect: "fade",
            loop: true,
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            observer: true,
            observeParents: true,
            on: {
                slideChange: function () {
                    updateTabState(this, ".tab-list-wrap.mo .tab-list li");
                },
            },
        });
    }
    

    function updateTabState(swiper, tabSelector) {
        let realIndex = swiper.realIndex; // Swiper의 실제 인덱스
    
        // ✅ PC와 모바일에 따라 다른 인덱스 배열 사용
        let targetIndexes = $(tabSelector).closest(".tab-list-wrap").hasClass("mo")
            ? [0, 8, 16, 20] // 모바일에서는 이 배열 사용
            : [0, 4, 8, 10]; // PC에서는 이 배열 사용
    
        let matchedIndex = targetIndexes.indexOf(realIndex);
    
        if (matchedIndex !== -1) {
            $(tabSelector).removeClass("on").eq(matchedIndex).addClass("on");
        }
    
        // 모바일 화면일 때만 스크롤 이동
        if ($(tabSelector).closest(".tab-list-wrap").hasClass("mo")) {
            scrollActiveTabIntoView();
        }
    }
    
    function bindTabClick() {
        $(".tab-list-wrap .tab-list li").on("click", function () {
            let tabIndex = $(this).index(); // 클릭한 li의 인덱스 가져오기
    
            // ✅ PC와 모바일에 따라 다른 targetIndexes 사용
            let targetIndexes = $(this).closest(".tab-list-wrap").hasClass("mo")
                ? [0, 8, 16, 20] // 모바일
                : [0, 4, 8, 10]; // PC
    
            let targetSlide = targetIndexes[tabIndex];
    
            if (targetSlide !== undefined) {
                if ($(this).closest(".tab-list-wrap").hasClass("mo")) {
                    moSwiper.slideToLoop(targetSlide);
                } else {
                    pcSwiper.slideToLoop(targetSlide);
                }
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
