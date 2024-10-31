# http-monitor-client 
```
Project url: https://http-monitor-client.vercel.app/
```
## Project setup
```
npm install

** Please see other instructions below on how to run on local
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Architecture overview

1. Component Structure
- AppHeader.vue and ResponseTable.vue are primary components.
- ResponseTable.vue is designed to display data in a table format. It uses various sub-components like cells and headers to format and display nested data.
2. State Management with Vuex
- The application uses Vuex for state management, as indicated by useStore and the import from vuex.
- In ResponseTable.vue, store.getters is used to access data (isLoading, error, and allResponses), allowing for reactive data updates in the component.
3. Computed Properties and Methods
- Computed Properties:
    -loading, error, and responses are derived from the Vuex store to track loading state, error messages, and response data.
- Methods:
  - convertHeaders converts object entries into key-value pairs for easier table rendering.
  - formatValue formats values for display, converting objects to JSON strings for readability.
  - formatHeaderName prettifies header names by replacing specific characters and formatting them for readability.
4. Polling Functionality
  - The startPolling function sets up an interval to fetch responses from the server every second. This is started on onMounted and cleared on onUnmounted.
  - This polling likely updates the Vuex store, allowing the table to reflect real-time data changes.
5. Table Layout and Data Binding
  - The template section defines a table to display data headers and values. The fields array determines table headers and columns.
  - Data is fetched from the Vuex store, processed, and then displayed through <b-table>, likely using Bootstrap or a similar component library.
6. Libraries and Dependencies
  - Bootstrap-Vue or a similar UI framework is implied by the <b-table> component, providing responsive and styled table layouts.
  - JSON Formatting: JSON.stringify is used to display objects in a readable format.
7. Directory Structure
  - The components, store, and views folders suggest a typical Vue project structure.
  - The components folder houses UI components.
  - store is used for Vuex modules, while views might contain main pages or higher-level components.

### Choice of technologies and reasoning

<p> 1. Reactive Data Binding: Vue's reactivity ensures real-time data updates in the UI, essential for monitoring applications. </p>
<p> 2. Component-Based Architecture: Vue organizes code into modular, reusable components, making the app more maintainable and scalable. </p>
<p> 3. Vuex for State Management: Vuex allows centralized management of app state, simplifying data sharing and reducing redundancy. </p>
<p> 4. Easy Integration with Libraries: Vue works well with UI libraries like Bootstrap-Vue, enabling a polished, responsive design with minimal custom styling. </p>
<p> 5. Lifecycle Hooks: Vue’s lifecycle hooks (like onMounted) are perfect for managing the app's real-time data polling efficiently.</p>


### Assumptions Made

<p> 1. Real-Time Data is Essential: The app needs to poll the server frequently (every second) for updated responses, so real-time data display is prioritized. </p>
<p> 2. Data Structure Consistency: The data retrieved from the server has a consistent structure, making it suitable for direct mapping to table fields and headers.  </p>
<p> 3. Vuex State Management: The app benefits from centralized state management, meaning data will likely be shared across multiple components or views in the future. </p>
<p> 4. UI Library Compatibility: The app assumes compatibility with a UI framework like Bootstrap-Vue, providing built-in components like tables and containers for quicker UI development. </p>

### Future Improvements

<p> 1. Optimize Polling Mechanism: Replace frequent polling with WebSockets to reduce server load and ensure real-time updates with minimal latency. </p>
<p> 2. Advanced Data Filtering and Sorting: Add client-side filters and sorting options to make it easier for users to navigate large datasets.3. </p>
<p> 3. Caching and Offline Support: Implement caching to reduce redundant data requests and consider offline support for viewing recent data if the connection is lost. </p>
<p> 4. Pagination for Large Datasets: If response data grows, add pagination or infinite scrolling to improve UI performance and maintain responsiveness. </p>
<p> 5. Role-Based Access Control: Integrate authentication and authorization, allowing different users to have varied access levels to the app's features. </p>


### Core Component Identification
<p> 1. ResponseTable.vue: Central component that displays the main data and handles formatting, headers, and nested data rendering. High-priority for testing, as it directly impacts the user experience and data display accuracy. </p>
<p> 2. Vuex Store: Manages global state, including loading, error, and response data. Core logic for handling data fetching and state updates should be covered in tests to ensure data consistency.  </p>
<p> 3. Polling Mechanism: Part of the ResponseTable.vue lifecycle, initiating regular data fetches. Critical to test for stability, efficiency, and impact on the app’s performance.  </p>
<p> 4. Utility Functions (formatValue, formatHeaderName): Functions used to format data and headers for display. Essential to test to ensure data is presented correctly to users, regardless of format or data type.  </p>

### Testing
```
npm run test
```
<p> 1. Tests ResponseTable.vue which contains all the functionalities including polling and response history. </p>


### How to run project on your local
```bash
#run
$ git clone https://github.com/rigellago2013/http-monitor-client.git
$ npm install
$ npm run serve #should run on http:localhost:8080
```
