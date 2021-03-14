import React from 'react'
import { PaginationItem } from 'semantic-ui-react';

 const Pagination = ({reposPerPage, totalRepos, Paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalRepos/reposPerPage); i++)
    {
       pageNumbers.push(i);
    }
    return (
        <nav aria-label="Page navigation example">
        <ul className ="pagination">
            {pageNumbers.map(number => (
                <li key={number} className="page-item"><a onClick={() => Paginate(number)} className="page-link" href="#">{number}</a></li>
            ))}          
        </ul>
      </nav>
    )
}

export default Pagination;

