$(function(){

    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPage = 1; // 현재 보여지는 첫 번째 페이지 번호
    
    function showPages(pageNumber) {
      // 모든 페이지 숨기기
      pages.forEach(page => page.style.display = 'none');
    
      // 현재 페이지와 다음 페이지 보여주기
      if (pageNumber >= 1 && pageNumber <= pages.length) {
        pages[pageNumber - 1].style.display = 'flex'; // 현재 페이지
      }
      if (pageNumber + 1 <= pages.length) {
        pages[pageNumber].style.display = 'flex'; // 다음 페이지
      }
    }
    
    prevBtn.addEventListener('click', () => {
      currentPage = Math.max(currentPage - 2, 1); // 2 페이지씩 이전
      showPages(currentPage);
    });
    
    nextBtn.addEventListener('click', () => {
      currentPage = Math.min(currentPage + 2, pages.length - 1); // 2 페이지씩 다음
      showPages(currentPage);
    });
    
    showPages(currentPage); // 초기 페이지 설정 (1, 2 페이지)
    
});