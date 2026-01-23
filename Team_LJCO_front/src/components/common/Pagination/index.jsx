
function Pagination({page, totalPages, onChange}) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const onClickFirstPageButton = () => {
        if(page === 1) {
            alert("첫페이지입니다");
            return;
        }
        onChange(page - 1);
    };
        const onClickLastPageButton = () => {
        if(page === totalPages) {
            alert("마지막 페이지입니다");
            return;
        }
        onChange(page + 1);
    };
    return (
        <div>
            <button onClick={onClickFirstPageButton}>
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
            <button onClick={onClickLastPageButton}>
                다음
            </button>
        </div>
    );

}
export default Pagination;
