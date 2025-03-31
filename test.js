$(function () {
    function scrollActiveTabIntoView() {
        $(".tab-list-wrap.mo .tab-list li.on").each(function () {
            let $tabList = $(this).closest(".tab-list");
            let tabLeft = $tabList.scrollLeft(); // 현재 스크롤 위치
            let tabWidth = $tabList.outerWidth(); // 탭 전체 너비
            let liLeft = $(this).position().left + tabLeft; // 현재 li 위치
            let liWidth = $(this).outerWidth(); // li 너비
    
            // 스크롤 위치 조정 (현재 on 클래스가 있는 li가 화면 중앙에 오도록)
            let scrollTo = liLeft - tabWidth / 2 + liWidth / 2;
    
            $tabList.animate({ scrollLeft: scrollTo }, 300); // 부드러운 이동 효과
        });
    }
    
    function initializeSwiper() {
        // 기존 Swiper 인스턴스 제거 후 다시 생성 (반응형 대응)
        if (window.pcSwiper) {
            window.pcSwiper.destroy(true, true);
        }
        if (window.moSwiper) {
            window.moSwiper.destroy(true, true);
        }

        // PC Swiper
        window.pcSwiper = new Swiper(".ceoSwiper", {
            effect: "fade",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            observer: true,
            observeParents: true,
            on: {
                slideChange: function () {
                    updateTabState(this.activeIndex, ".tab-list-wrap:not(.mo) .tab-list li");
                },
            },
        });

        // 모바일 Swiper
        window.moSwiper = new Swiper(".ceoSwiper02", {
            effect: "fade",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
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

        // 모바일 화면일 때만 스크롤 이동
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

    // 초기화 실행
    $(document).ready(function () {
        initializeSwiper();
        bindTabClick();

        // 창 크기 변경 시 Swiper 다시 초기화 (PC <-> 모바일 전환 대응)
        $(window).on("resize", function () {
            initializeSwiper();

            // 현재 활성화된 슬라이드 인덱스를 기반으로 탭 상태 업데이트
            if (window.pcSwiper) {
                updateTabState(pcSwiper.activeIndex, ".tab-list-wrap:not(.mo) .tab-list li");
            }
            if (window.moSwiper) {
                updateTabState(moSwiper.activeIndex, ".tab-list-wrap.mo .tab-list li");
            }
            
        });
    });
});
