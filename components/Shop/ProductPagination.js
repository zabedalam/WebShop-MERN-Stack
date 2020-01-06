function ProductPagination({ page, totalPages }) {
  
    const currentPage = Number(page);
  
    // console.log(currentPage, totalPages);
    
    const prevLink = `/shop?page=${currentPage - 1}`; 
    const nextLink = `/shop?page=${currentPage + 1}`; 
  
    const prevPage = currentPage === 1 ? null : <li><a href={prevLink}>Prev</a></li>;
    const nextPage = currentPage !== totalPages ? <li><a href={nextLink}>Next</a></li> : null;
    
    const prevBtn = currentPage !== 1 ? <li><a href={prevLink}>{currentPage - 1}</a></li> : null;
    const nextBtn = currentPage !== totalPages ? <li><a href={nextLink}>{ currentPage + 1 }</a></li> : null;
  
    return(
      <section className="section-pagination">
        <ul className="pagination">
            { prevPage }
            { prevBtn }
            <li><a href="#">{currentPage}</a></li>
            { nextBtn }
            { nextPage }
        </ul>
      </section>
    );
  }
  
  export default ProductPagination;
  