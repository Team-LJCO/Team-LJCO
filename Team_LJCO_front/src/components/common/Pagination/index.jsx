
function Pagination({page, totalPages, onChange}) {
    const totalPageCount = 10;
    const pages = [];


    const groupIndex = Math.floor((page - 1) / totalPageCount);
    const startPage = groupIndex * totalPageCount + 1;
    const endPage = Math.min(startPage +  totalPageCount -1 ,totalPages);

        for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    const onClickFirstPageButton = () => {


        if(page === 1) {
            alert("첫페이지입니다");
            return;
        }
        onChange(startPage - 1);
    };
        const onClickLastPageButton = () => {
        if(page === totalPages) {
            alert("마지막 페이지입니다");
            return;
        }
        onChange(endPage + 1);
    };
    return (
        <div>
            <button onClick={onClickFirstPageButton} disabled={startPage == totalPages}>
                이전
            </button>
            {pages.map((p) => (
                <button
                key={p}
                onClick={() => onChange(p)}
                disabled={p === page}
                >
                    {p}
                </button>
            ))
                
            }
            <button onClick={onClickLastPageButton} disabled={endPage == totalPages}>
                다음
            </button>
        </div>
    );

}
export default Pagination;
