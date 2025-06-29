import React from 'react';
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'basic' | 'classic';
    /** extra container styles */
    style?: any;
};
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
