Ques:- How long did you spend on the coding test? 
Ans:- As a Full Stack Developer, my dedication to this intern assignment was marked by a meticulous approach to project development. I invested approximately 12 hours in crafting the task management application, meticulously adhering to the outlined specifications while ensuring the highest standards of code quality and functionality.

Ques:- What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
Ans:- Among the various new features introduced in, React, that I have seamlessly integrated into my project, one standout addition is the useEffect hook. This hook revolutionizes the way side effects are managed within functional components, providing a succinct and elegant solution to handle component lifecycle events and asynchronous operations.

![  useEffect(() => {
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
  }, [data, search, filter]);](image.png)

Ques:- How would you track down a performance issue in production? Have you ever had to do this?
Ans:- Furthermore, my theoretical knowledge and practical expertise extend to addressing performance concerns in production environments. Although I have not yet encountered such challenges firsthand, I am well-versed in the methodologies required to track down and rectify performance bottlenecks. In the event of a performance issue, I would meticulously employ monitoring tools such as New Relic or Datadog to scrutinize response times and resource utilization. This would be complemented by an in-depth analysis utilizing browser developer tools like Chrome DevTools, allowing me to identify and optimize critical code paths.

Ques:- If you had more time, what additional features or improvements would you consider adding to the task management application?
Ans:- Looking forward, should additional time be granted for further refinement, I envision augmenting the task management application with features tailored to enhance user experience and productivity. These include seamless user authentication mechanisms to safeguard data integrity, integrated notification systems for timely task reminders, and potential integration with established productivity platforms such as Google Calendar or Trello. Moreover, the inclusion of data visualization elements, such as dynamic charts or graphs, would furnish users with insightful analytics, facilitating informed decision-making and optimizing task management workflows.