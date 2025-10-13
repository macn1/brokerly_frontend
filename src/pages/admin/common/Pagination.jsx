import ReactPaginate from "react-paginate";
import GetIcon from "../utils/Icon";

const Pagination = ({ setCurrentPage, data, pageSize }) => {
  const handlePageChange = (selectedPage) => {
    const page = selectedPage.selected + 1;
    setCurrentPage(page);
  };

  return (
    <ReactPaginate
      previousLabel={<GetIcon iconName="MdOutlineKeyboardArrowLeft" size={20} />}
      nextLabel={<GetIcon iconName="MdOutlineKeyboardArrowRight" size={20} />}
      breakLabel={"..."}
      pageCount={Math.ceil(data / pageSize)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      containerClassName="flex justify-center items-center gap-2 mt-4"
      pageClassName="border px-3 py-1 rounded hover:bg-gray-200 text-sm"
      activeClassName="bg-zinc-500 text-white"
      previousClassName="border px-2 py-1 rounded hover:bg-gray-200"
      nextClassName="border px-2 py-1 rounded hover:bg-gray-200"
      breakClassName="px-2 py-1"
    />
  );
};

export default Pagination;
