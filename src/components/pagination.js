import './pagination.css'

const Pagination = ({ questionsPerPage, totalQuestions, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="container">
            <div className="pagination">
                {pageNumbers.map(number => (
                    <span key={number}>
                        <div onClick={() => {
                            paginate(number)
                            // const valueState = []
                            // valueState.push()
                            }} className="page-span">
                            {number}
                        </div>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Pagination