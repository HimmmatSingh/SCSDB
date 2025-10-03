import axios from "axios";

const Axios = axios.create({

  
    baseURL: "https://api.themoviedb.org/3/",

 headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTkzMzdjYTg4ZDRjMTcyN2I2NWEzZWFiZmYyNThjYiIsIm5iZiI6MTc1NzI2NTg1NC4zNjcsInN1YiI6IjY4YmRiZmJlMGU5MTJhMzhlNjA2OWVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RKesrRnIVIjjz0luCebVWRXRsZe-_eE81yjP_N-dQkg'
  },


});

export default Axios;



