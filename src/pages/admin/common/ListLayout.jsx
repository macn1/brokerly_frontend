import React from "react";
import Pagination from "./Pagination";
import GetIcon from "../utils/Icon";
import FilterComponent from "./FilterComponent";
import Sort from "./Sort";
import Dashitems from "./Dashitems";
const ListLayout = ({
  title,
  filterFields = [],
  onFilterChange,
  tableHeaders,
  tableData,
  actionButtons,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  onAddNewButton,
  totalCount,
  isVisitor
}) => {
  return (
    <div className="w-full px-5 mx-auto py-3">
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-3 mx-5">
{/*        
          {!isVisitor && filterFields.length > 0 && (
            <div className="flex-1  ">
              <FilterComponent filterFields={filterFields} onChange={onFilterChange} />
            </div>
          )} */}

          <div className=" w-full flex justify-end">
            <button
              className="px-3 text-sm  h-8 bg-zinc-700 text-white rounded hover:bg-secondary-700"
              onClick={onAddNewButton}
            >
              + Add New
            </button>
          </div>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-2 text-lightdark">Sl No.</th>
              {tableHeaders.map((header, index) => (
                <th key={index} className="p-2">
                  <p className="flex items-center gap-1 text-lightdark">
                    <span>{header.label}</span>
                    <span>
                      <GetIcon iconName="MdOutlineKeyboardArrowDown"  size={16}/>
                    </span>
                  </p>
                </th>
              ))}
              {actionButtons?.length > 0 && (
                <th className="p-2 text-lightdark">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, index) => (
              <tr key={index} className="border-t text-xs text-gray-700  ">
                <td className="p-3">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                {tableHeaders.map((header, index) => (
                  <td key={index} className="p-3">
                    {header.formatter
                      ? header.formatter(row[header.key], row)
                      : row[header.key]}
                  </td>
                ))}
                {actionButtons?.length > 0 && (
                  <td className="p-3 flex items-center space-x-3 ">
                    {actionButtons.map((action, idx) => (
                      <GetIcon
                        key={idx}
                        iconName={action.icon}
                        size={14}
                        design="text-iconintable mt-1"
                        action={() => action.onClick(row)}

                      />
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="">
          <div
            className="flex mt-1 px-3"
            style={{ justifyContent: "space-between" }}
          >
            {pageSize != 0 ? <Sort
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              totalCount={totalCount}
              pageSize={pageSize}
            /> : ''}
            {pageSize != 0 ? <Pagination
              setCurrentPage={setCurrentPage}
              data={totalCount}
              pageSize={pageSize}
            /> : ''}

          </div>
        </div>
        {/* <Pagination
          setCurrentPage={setCurrentPage}
          data={totalCount}
          pageSize={pageSize}
        /> */}
      </div>
    </div>
  );
};

export default ListLayout;
