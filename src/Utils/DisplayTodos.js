import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

import Todo from "./Todo";

const DisplayTodos = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState({
    completedTask: false,
    notCompletedTask: false,
    highPriorityTask: false,
    mediumPriorityTask: false,
    lowPriorityTask: false,
  });

  const completedTask = () => {
    const completed = data.filter((val) => val.check);
    if (data.length) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    } else {
      return 0;
    }
  };

  // console.log(data);

  const handleSearch = (e) => {
    // console.log(e.target);
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    // console.log(e.target);
    const { name, checked } = e.target;
    setFilter({ ...filter, [name]: checked });
  };
  // console.log(filter);

  useEffect(() => {
    const filteredData = data.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      
      // console.log("Task:", task.title, "Category:", task.catagory[0].catagory); // Log task title and category for debugging
  
      const matchesFilters =
        (!filter.completedTask || task.check) &&
        (!filter.notCompletedTask || !task.check) &&
        (!filter.highPriorityTask || task.catagory[0].catagory === 'High') &&
        (!filter.mediumPriorityTask || task.catagory[0].catagory === 'Medium') &&
        (!filter.lowPriorityTask || task.catagory[0].catagory === 'Low');
  
      // console.log("Matches Filters:", matchesFilters); // Log matchesFilters value for debugging
  
      return matchesSearch && matchesFilters;
    });
  
    setSearchResults(filteredData);
  }, [data, search, filter]);
  

  const handleTasksStatus = () => {
    const parsePercentage = parseFloat(completedTask());

    if (parsePercentage === 0) {
      return "No tasks completed";
    } else if (parsePercentage === 100) {
      return "All tasks completed";
    } else if (parsePercentage >= 50) {
      return "More than half tasks completed";
    } else {
      return "Less than half tasks completed";
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const handleFilterButtonClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      {data.length ? (
        <div>
          <div className="max-md:container border text-white max-w-[700px] mt-10 max-sm:mt-2 m-auto rounded-3xl bg-gradient-to-r from-purple-500 to-purple-700 p-10 max-sm:p-5">
            <h1 className="text-2xl max-sm:text-base font-medium">
              Progress summery
            </h1>
            <h3 className="max-sm:text-xs">
              {`${data.length} ${data.length > 1 ? "Tasks" : "Task"}`}
            </h3>
            <div className="flex flex-col w-[60%] max-sm:w-[100%] mt-7 max-sm:mt-5">
              <div className="flex justify-between items-center">
                <p className="max-sm:text-xs">
                  Progress
                  <span
                    className={`text-sm max-sm:text-xs ${
                      handleTasksStatus() === "No tasks completed"
                        ? "text-red-700"
                        : handleTasksStatus() ===
                          "Less than half tasks completed"
                        ? "text-red-700"
                        : "text-green-500"
                    } font-semibold`}
                  >
                    {` (${handleTasksStatus()})`}
                  </span>
                </p>
                <p className="text-sm">{completedTask()}%</p>
              </div>
              <div className="bg-purple-800 w-full h-2 mt-2 rounded-3xl">
                <div
                  className="h-full rounded-3xl transition-all bg-purple-100"
                  style={{ width: `${completedTask()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 align-middle justify-content-center flex">
            <button
              type="button"
              className="btn btn-light mr-10 text-white"
              data-toggle="collapse"
              data-target="#filters"
              onClick={handleFilterButtonClick}
            >
              <svg
                className="h-8 w-8 text-teal-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search for task..."
                value={search}
                onChange={handleSearch}
                className="w-full h-14 max-sm:h-12 rounded-xl pl-11 placeholder:text-sm outline-none"
              />
              <IoMdSearch className="absolute top-[50%] left-3 -translate-y-[50%] text-purple-600 text-2xl max-sm:text-xl" />
            </div>
          </div>

          {showFilters && (
            <div
              id="filters"
              className="max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 align-middle justify-content-center flex"
            >
              <div className="flex items-center ps-4 border-gray-200 rounded dark:border-gray-700">
                <input
                  id="completedTask"
                  type="checkbox"
                  value={filter}
                  name="completedTask"
                  onChange={handleFilter}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="completedTask"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Completed
                </label>
              </div>
              <div className="flex items-center ps-4 border-gray-200 rounded dark:border-gray-700">
                <input
                  id="notCompletedTask"
                  type="checkbox"
                  value={filter}
                  name="notCompletedTask"
                  onChange={handleFilter}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="notCompletedTask"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Not Completed
                </label>
              </div>
              <div className="flex items-center ps-4 border-gray-200 rounded dark:border-gray-700">
                <input
                  id="highPriorityTask"
                  type="checkbox"
                  value={filter}
                  name="highPriorityTask"
                  onChange={handleFilter}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="highPriorityTask"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  High Priority
                </label>
              </div>
              <div className="flex items-center ps-4  border-gray-200 rounded dark:border-gray-700">
                <input
                  id="mediumPriorityTask"
                  type="checkbox"
                  value={filter}
                  name="mediumPriorityTask"
                  onChange={handleFilter}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="mediumPriorityTask"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Medium Priority
                </label>
              </div>
              <div className="flex items-center ps-4 border-gray-200 rounded dark:border-gray-700">
                <input
                  id="lowPriorityTask"
                  type="checkbox"
                  value={filter}
                  name="lowPriorityTask"
                  onChange={handleFilter}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="lowPriorityTask"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Low Priority
                </label>
              </div>
            </div>
          )}

          <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5">
            {searchResults.map((val, index) => (
              <Todo
                key={index}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                setTaskDetails={setTaskDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="w-full text-center text-2xl max-md:text-2xl max-sm:text-xl text-white font-bold absolute bottom-[50%] left-[50%] -translate-x-[50%]">
          You don't have any tasks
        </h1>
      )}
    </>
  );
};

export default DisplayTodos;
