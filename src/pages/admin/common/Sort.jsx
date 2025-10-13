const Sort = ({ setPageSize, setCurrentPage, pageSize, totalCount }) => {
  const handlePageSizeChange = (e) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-between items-center gap-1 text-primary">
      Show
      <select
        value={pageSize}
        onChange={handlePageSizeChange}
        className="form-select form-select-sm w-auto"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      entries out of {totalCount} entries
    </div>
  );
};

export default Sort;
