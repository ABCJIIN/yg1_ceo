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

// 배너 롤링 함수
function setFlowBanner(bannerWrap) {
    let bannerList = bannerWrap.find('.list');
    let bannerWrapWidth = bannerWrap.width();
    let bannerListWidth = bannerList.outerWidth(true); // 정확한 너비 계산
    const speed = 30;

    // 기존 복제된 배너 삭제
    bannerWrap.find('.clone').remove();

    if (bannerWrapWidth <= 1100) {
        let clone = bannerList.clone().addClass('clone');
        bannerWrap.append(clone);

        // 클론이 추가된 후 리스트 너비 다시 계산
        bannerListWidth = bannerWrap.find('.list').outerWidth(true);

        flowBannerAct();

        function flowBannerAct() {
            if (bannerListWidth < bannerWrapWidth) {
                const listCount = Math.ceil(bannerWrapWidth * 3 / bannerListWidth);
                for (let i = 2; i < listCount; i++) {
                    clone = bannerList.clone().addClass('clone');
                    bannerWrap.append(clone);
                }
            }
            bannerWrap.find('.list').css({
                'animation': `${bannerListWidth / speed}s linear infinite flowRolling`
            });

            // 애니메이션이 끝날 때 위치 재설정
            bannerWrap.find('.list').on('animationiteration', function () {
                $(this).css('transform', 'translateX(0)'); // 리스트 위치 재설정
            });
        }

        // 기존 이벤트 리스너 제거 후 다시 등록 (중복 방지)
        bannerWrap.off('mouseenter mouseleave')
            .on('mouseenter', function () {
                bannerWrap.find('.list').css('animation-play-state', 'paused');
            })
            .on('mouseleave', function () {
                bannerWrap.find('.list').css('animation-play-state', 'running');
            });
    } else {
        // 화면 너비가 1100px 초과 시 모든 클론 삭제 및 애니메이션 제거
        bannerWrap.find('.clone').remove();
        bannerWrap.find('.list').css('animation', 'none');
        bannerWrap.off('mouseenter mouseleave');
    }
}
