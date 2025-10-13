import React from "react";

const FilterComponent = ({ filterFields, onChange }) => {
  return (
    <div className="flex flex-wrap justify-start mx-10 items-start gap-3 w-full">
      {filterFields.map((field) => {
        const fieldWidthClass = field.width || "w-48"; 

       const commonClasses = `border px-2 py-1 text-sm rounded ${fieldWidthClass} focus:outline-none focus:ring-0 focus:border-gray-300`;


        if (field.type === "select") {
          return (
            <select
            style={{fontSize:'12px',color:'#949495'}}
              key={field.name}
              className={commonClasses}
              onChange={(e) => onChange(field.name, e.target.value)}    
              defaultValue=""
            >
              <option  value="" disabled>
                {field.label}
              </option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        }

        return (
          <input
            key={field.name}
            type={field.type || "text"}
            placeholder={field.label}
            className={commonClasses}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        );
      })}
    </div>
  );
};

export default FilterComponent;
